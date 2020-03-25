const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
 
const router = express.Router()
 
router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ 'email': email })
        if (user == null) {
            const new_user = new User(req.body)
            await new_user.save()
            const token = await new_user.generateAuthToken()
            res.status(201).send({ 'status': 'ok', new_user, token })
        } else {
            res.status(200).send({ 'status': 'error', 'message': 'Registration Failed - Duplicate Email Address' })
        }
    } catch (error) {
        res.status(200).send({ 'status': 'error', 'meesage': 'Registration Failed', error })
    }
})
 
router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            res.status(200).send({ 'status': 'error', 'message': 'Login failed' })
        }
        const token = await user.generateAuthToken()
        res.status(200).send({ 'status': 'ok', user, token })
    } catch (error) {
        res.status(200).send({ 'status': 'error', 'message': 'Login failed' })
    }
 
})
 
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.status(200).send({'status': 'ok', user: req.user})
})
 
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({ 'status': 'ok' })
    } catch (error) {
        res.status(200).send({ 'status': 'error', 'message': 'Logout failed' })
    }
})
 
router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).send({'status': 'ok'})
    } catch (error) {
        res.status(200).send({ 'status': 'error', 'message': 'Logout failed' })
    }
})
 
module.exports = router
