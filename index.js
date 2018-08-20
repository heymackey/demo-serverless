const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const USERS_TABLE = process.env.USERS_TABLE
const dynamodb = new AWS.DynamoDB.DocumentClient()

app.use(bodyParser.json({ strict: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/users/:userId', (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    }
  }

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'could not get user' })
    }
    if (result.Item) {
      const { userId, name } = result.Item
      res.json({ userId, name })
    } else {
      res.status(404).json({ error: 'User not found'})
    }
  })
})

app.post('/users', (req, res) => {
  const { userId, name } = req.body
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' })
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' })
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name,
    },
  }
  dynamodb.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not create user' })
    }
    res.json({ userId, name })
  })
})

module.exports.handler = serverless(app)
