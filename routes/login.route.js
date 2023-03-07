const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../schemas/user')

router.get('/login', async (req, res) => {
  const { nickname, password } = req.body // json.body : 닉네임, 비번 받기

  const user = await User.findOne({
    // User에서 nickname 같은거 찾기
    nickname,
  })

  if (!user || password !== user.password) {
    // user 없거나 비번 다르면
    res.status(400).send({
      errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
    })
    return
  }

  const token = jwt.sign({ userId: user.userId }, 'my-secret-key')

  res.cookie('authorization', `Bearer ${token}`) // jwt를 cookie로 할당
  res.status(200).json({
    // jwt를 body로 할당
    token,
    success: true,
    message: '로그인에 성공했습니다.',
  })
})

module.exports = router
