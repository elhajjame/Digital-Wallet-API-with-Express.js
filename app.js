import express from 'express'
import userRoute from './routes/userRoutes.js'
const app=express()
app.use(express.json())
app.use('/users',userRoute)
export default app