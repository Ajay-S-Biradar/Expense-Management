const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./db/connectdb")
const cookieParser = require("cookie-parser")

const userRoutes = require('./routes/user')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()

PORT = process.env.PORT

connectDB()

app.use('/api',userRoutes)

app.use('/',(req,res)=>{
    res.send("Working...")
})

app.listen(PORT,()=>{
    console.log("Running...")
})