const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/spa_post2').catch((err) => console.log(err))
}

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err)
})

mongoose.set('strictQuery', false)

module.exports = connect
