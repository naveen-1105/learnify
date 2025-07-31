import express from 'express'
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo } from '../controllers/user.controller.js'
import {authorizeRoles, isAuthenticated} from "../middleware/auth.js"
const userRouter = express.Router()

userRouter.post('/registration', registrationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout',isAuthenticated, logoutUser)
userRouter.get('/refreshToken',updateAccessToken)
userRouter.get('/me',isAuthenticated,getUserInfo)
userRouter.post('/socialAuth',socialAuth)
userRouter.put('/update-user-info',isAuthenticated, updateUserInfo)
userRouter.put('/update-user-password',isAuthenticated, updatePassword)
userRouter.put('/update-user-profile',isAuthenticated, updateProfilePicture)

export default userRouter 