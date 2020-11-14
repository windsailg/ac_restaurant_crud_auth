const express = require('express')
const router = express.Router()

const restaurantModel = require('../../models/restaurant')

// search
router.get('/', (req, res) => {
  const userId = req.user._id
  const queryArr = req.query
  if (!queryArr.sortRule) queryArr.sortRule = 'asc'
  if (queryArr.clear) queryArr.keyword = ''
  const word = queryArr.keyword.toLowerCase().trim()

  console.log(queryArr)
  console.log(word)
  restaurantModel.find({ userId })
    .lean()
    .sort({ name: queryArr.sortRule })
    .then(restaurant => {
      // filter list
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

      // filter result
      const searchedRestaurant = []
      restaurant.forEach(item => {
        if (item.name.toLowerCase().includes(word) || item.category.toLowerCase().includes(word)) {
          searchedRestaurant.push(item)
        }
      })

      const filteredRestaurant = []
      if (queryArr.filterCategory) {
        searchedRestaurant.forEach(item => {
          if (item.category.includes(queryArr.filterCategory)) {
            filteredRestaurant.push(item)
          }
        })
        searchedRestaurant.length = 0
        filteredRestaurant.forEach(ele => {
          searchedRestaurant.push(ele)
        })
      } else if (queryArr.filterArea) {
        searchedRestaurant.forEach(item => {
          if (item.area.includes(queryArr.filterArea)) {
            filteredRestaurant.push(item)
          }
        })
        searchedRestaurant.length = 0
        filteredRestaurant.forEach(ele => {
          searchedRestaurant.push(ele)
        })
      }

      return res.render('index', {
        restaurant: searchedRestaurant,
        keywords: word,
        categories,
        areas,
        queryArr
      })
    })
    .catch(error => console.error(error))
})

// new
router.get('/new', (req, res) => {
  return res.render('new')
})

// post new
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, nameEN, category, rating, area, location, googleMap, phone, description, image } = req.body
  return restaurantModel.create({
    name: name,
    name_en: nameEN,
    category: category,
    rating: rating,
    area: area,
    location: location,
    google_map: googleMap,
    phone: phone,
    description: description,
    image: image,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return restaurantModel.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// edit
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return restaurantModel.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// post edit
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const { name, nameEN, category, rating, area, location, googleMap, phone, description, image } = req.body
  return restaurantModel.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = nameEN
      restaurant.category = category
      restaurant.rating = rating
      restaurant.area = area
      restaurant.location = location
      restaurant.google_map = googleMap
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => {
      return res.redirect(`/restaurant/${_id}`)
    })
    .catch(error => console.error(error))
})

// delete
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return restaurantModel.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
