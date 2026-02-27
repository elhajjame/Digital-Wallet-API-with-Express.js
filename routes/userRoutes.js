import express from "express"
import { createUser, getAllUsers, getUsersById } from '../controllers/userController.js'

const route = express.Router()

route.post('/', createUser)
route.get('/', getAllUsers)
route.get('/:id', getUsersById)
export default route