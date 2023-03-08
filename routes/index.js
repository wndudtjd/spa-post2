const express = require('express')
const postsRouter = require('./posts.route')
const commetsRouter = require('./comments.route')
const signupRouter = require('./signup.route')
const loginRouter = require('./login.route')

const router = express.Router()

router.use('/auth', [signupRouter, loginRouter])
router.use('/', [postsRouter, commetsRouter])

module.exports = router
