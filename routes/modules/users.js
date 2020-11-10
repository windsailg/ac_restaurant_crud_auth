const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const userModel = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.render('login', { warning_msg: '請確認必填欄位的資訊是否填寫' })
  }
  req.flash('success_msg', '已成功登入')
  next()
}, passport.authenticate('local', {
  successFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '信箱及密碼為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  userModel.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已被註冊！' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => userModel.create({
        name,
        email,
        password: hash
      }))
      .then(() => {
        req.flash('success_msg', '您已成功註冊')
        return res.redirect('/users/login')
      })
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
