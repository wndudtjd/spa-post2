const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    // 사용자 닉네임
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    // 사용자 PW
    password: {
      type: String,
      required: true,
    },
    // salt
    // salt: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    versionKey: false,
  }
)

// 가상의 컬럼 추가
userSchema.virtual('userId').get(function () {
  return this._id.toHexString()
})

// user 정보를 JSON으로 바꿀 때 위의 virtual 값이 설정되도록 설정한다.
userSchema.set('toJSON', {
  virtuals: true,
})

module.exports = mongoose.model('User', userSchema)
