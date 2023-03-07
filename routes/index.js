const express = require('express')
const postsRouter = require('./posts.route')
const signupRouter = require('./signup.route')
const loginRouter = require('./login.route')

const router = express.Router()

router.use('/auth', [signupRouter, loginRouter])
router.use('/', [postsRouter])

module.exports = router
