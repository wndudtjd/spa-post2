const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3020

const globalRouter = require('./routes')

const connect = require('./schemas')
connect()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', [globalRouter])

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!')
})
