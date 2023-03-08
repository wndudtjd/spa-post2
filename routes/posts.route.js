const express = require('express')
const router = express.Router()
const Post = require('../schemas/post')
const authMiddleware = require('../middlewares/auth-middleware')

// 게시글 작성 API
router.post('/posts', authMiddleware, async (req, res) => {
  const { title, content } = req.body
  const user = res.locals.user

  await Post.create({
    nickname: user.nickname,
    title,
    content,
    createdAt: new Date(),
  })

  res.status(201).json({ message: '게시글이 작성에 성공하였습니다.' })
})

// 게시글 조회 API
router.get('/posts', async (req, res) => {
  const posts = await Post.find({}, { _id: false }).sort('-createdAt')

  return res.status(200).json({
    success: true,
    posts,
  })
})

// 게시글 상세 조회 API
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  const post = await Post.findById({ _id: postId }, { _id: false })

  return res.status(200).json({
    success: true,
    post,
  })
})

// 게시글 수정 API
router.put('/posts/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params
  const { title, content } = req.body
  const user = res.locals.user

  const updateData = await Post.find({ _id: postId })

  try {
    // 데이터 형식이 올바르지 않음
    if (!updateData) {
      res.status(412).json({
        success: true,
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      })
      return
    }

    // 제목 미입력
    if (!title) {
      res.status(412).json({
        success: true,
        errorMessage: '게시글 제목의 형식이 일치한지 않습니다.',
      })
      return
    }

    // 내용 미입력
    if (!content) {
      res.status(412).json({
        errorMessage: '게시글 내용의 형식이 일치한지 않습니다.',
      })
      return
    }

    // 로그인한 회원의 닉네임과 해당 게시글 작성한 닉네임이 다른 경우
    if (updateData.nickname !== user.nickname) {
      res.status(403).json({
        errorMessage: '게시글 수정의 권한이 존재하지 않습니다.',
      })
      return
    }

    // 수정할 게시글의 제목, 내용, 업데이트 날짜 수정
    await Post.updateOne({ _id: postId }, { $set: { title, content, updatedAt: new Date() } })

    // 게시글 수정
    if (updateData) {
      res.status(200).json({
        message: '게시글을 수정하였습니다.',
      })
      return
    } else {
      res.status(401).json({
        errorMessage: '게시글이 정상적으로 수정되지 않았습니다.',
      })
      return
    }
  } catch (err) {
    console.error(err)

    res.status(400).json({
      errorMessage: '게시글 수정에 실패했습니다.',
    })
  }
})

// 게시글 삭제 API
router.delete('/posts/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params
  const user = req.locals.user

  const deleteData = await Post.FindOne({ _id: postId })

  try {
    // 게시글이 존재하지 않는 경우
    if (!deleteData) {
      res.status(404).json({
        errorMessage: '게시글이 존재하지 않습니다.',
      })
      return
    }
    // 로그인한 회원의 닉네임과 해당 게시글 작성한 닉네임이 다른 경우
    if (deleteData.nickname !== user.nickname) {
      res.status(403).json({
        errorMessage: '게시글 삭제의 권한이 존재하지 않습니다.',
      })
      return
    }
    // 삭제할 게시글 조회
    await Posts.deleteOne({ _id: postId })
    // 게시글 삭제
    if (deleteData) {
      res.status(200).json({ message: '게시글을 삭제하였습니다.' })
      return
    } else {
      res.status(401).json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' })
      return
    }
  } catch (err) {
    res.status(400).json({
      errorMessage: '게시글 삭제에 실패했습니다.',
    })
    return
  }
})

module.exports = router
