const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const notify = require('./notify.js')


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/sendNumber', async (req, res) => {
    const number = req.body.data
    await notify.run(number)
    console.log('Received number:', number )
    res.status(200).send('Data received successfully')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


