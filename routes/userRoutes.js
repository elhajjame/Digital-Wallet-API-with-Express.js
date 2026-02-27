import express from "express"
import { createUser, deleteUser, getAllUsers, getUsersById, updateUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/', createUser)
route.get('/', getAllUsers)
route.get('/:id', getUsersById)
route.put('/:id', updateUser)
route.delete('/:id', deleteUser)
export default route