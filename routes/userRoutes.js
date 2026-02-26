import express from "express"
import { createUser, getUsers, getUsersById } from '../controllers/userController.js'

const route=express.Router()

route.post('/',createUser)
route.get('/',getUsers)
route.get('/:id',getUsersById)
export default route