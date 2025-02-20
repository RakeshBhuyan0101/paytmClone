import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDb } from './utils/db.js'
import userRouter from './routes/userRouter.js'
import accountRouter from './routes/accountRouter.js'

dotenv.config({})

const app = express()
const corsOption = {
    origin : "http://localhost:5173",
    credentials : true
}
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

app.use('/api/v1/user', userRouter )
app.use('/api/v1/account', accountRouter )

app.get("/" , (req , res) => {
    res.send({
        message : "hi therre"
    })
})

app.listen(process.env.PORT , () =>  {
    connectDb()
    console.log(`app is running on port ${process.env.PORT}`)
})


