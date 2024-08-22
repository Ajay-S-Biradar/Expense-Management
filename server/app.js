const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./db/connectdb")
const cookieParser = require("cookie-parser")

const userRoutes = require('./routes/user')
const incomeRoutes = require('./routes/income')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()

PORT = process.env.PORT

connectDB()

app.use('/api/user',userRoutes)
app.use('/api/income',incomeRoutes)

app.use('/',(req,res)=>{
    res.send("Working...")
})

app.listen(PORT,()=>{
    console.log("Running...")
})