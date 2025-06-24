import { describeImg } from './describe.js'
import express from 'express'
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const url = (req.query.url);
  const decoded = decodeURIComponent(url)
  console.log(decoded);
  const result = await describeImg(decoded);
  console.log(result);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




