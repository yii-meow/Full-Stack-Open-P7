const testingRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
    await Bloglist.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter