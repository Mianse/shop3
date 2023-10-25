import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import CategoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
//cnfigure env
dotenv.config()

//database config
connectDB();
//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category', CategoryRoute)
app.use('/api/v1/product',productRoute)

//rest api

const PORT = process.env.pORT || 5000
app.listen(PORT,()=> console.log(`server running on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white))