import express from "express"
import { createUser, getUsers } from '../controllers/userController.js'


const route=express.Router()

route.post('/',createUser)
route.get('/',getUsers)
export default route