import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TurboRepo Backend!')
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
