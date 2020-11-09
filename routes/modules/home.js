const express = require('express')
const router = express.Router()

const restaurantModel = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantModel.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurant => {
      const categoryArr = []
      const areaArr = []
      restaurant.forEach(item => {
        categoryArr.push(item.category)
        areaArr.push(item.area)
      })
      const categories = categoryArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })
      const areas = areaArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })
      return res.render('index', { restaurant, categories, areas })
    })
    .catch(error => console.error(error))
})

module.exports = router
