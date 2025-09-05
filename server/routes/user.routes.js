import express from 'express'
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo } from '../controllers/user.controller.js'
import {authorizeRoles, isAuthenticated} from "../middleware/auth.js"
const userRouter = express.Router()

userRouter.post('/registration', registrationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout',updateAccessToken,isAuthenticated, logoutUser)
userRouter.get('/refreshToken',updateAccessToken,updateAccessToken)
userRouter.get('/me',updateAccessToken,isAuthenticated,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',updateAccessToken,isAuthenticated, updateUserInfo)
userRouter.put('/update-user-password',updateAccessToken,isAuthenticated, updatePassword)
userRouter.put('/update-user-profile',updateAccessToken,isAuthenticated, updateProfilePicture)

export default userRouter 