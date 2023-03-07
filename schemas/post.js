const mongoose = require('mongoose')
const { post } = require('../routes')

const postSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { versionKey: false }
)

// 가상의 컬럼 추가
postSchema.virtual('postId').get(function () {
  return this._id
})

// post 정보를 JSON으로 바꿀 때 위의 vertual 값이 설정되도록 한다.
postSchema.set('toJSON', {
  virtuals: true,
})

module.exports = mongoose.model('Posts', postSchema)
