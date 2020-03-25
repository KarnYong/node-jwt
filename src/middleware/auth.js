const jwt = require('jsonwebtoken')
const User = require('../models/User')
 
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
 
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(200).send({'status': 'error', 'message': 'Not Authorized to Access'})
    }
 
}
module.exports = auth
