import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => console.log('WELCOME API SPOTIFY'))


app.listen(port, () => console.log(`[SERVER] is running on http://localhost:${port}`))