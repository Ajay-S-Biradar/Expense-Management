const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./db/connectdb")
const cookieParser = require("cookie-parser")

const userRoutes = require('./routes/user')
const incomeRoutes = require('./routes/income')
const expenseRoutes = require('./routes/expense')
const dashboardRoutes = require('./routes/dashboard')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

dotenv.config()

PORT = process.env.PORT

connectDB()

app.use('/api/user',userRoutes)
app.use('/api/expense',expenseRoutes)
app.use('/api/income',incomeRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use('/',(_,res)=>{
    res.send("Working...")
})

app.listen(PORT,()=>{
    console.log("Running...")
})