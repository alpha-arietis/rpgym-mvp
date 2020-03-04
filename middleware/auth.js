//const config = require('config')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

// middleware functions take in REQ, RES and NEXT parameters
// once this middleware is done we always call NEXt to move on to next middleware

// purpose of this function: take token sent from frontend (React/Insomnia) 
function auth(req, res, next) {
    const token = req.header('x-auth-token')
    // Check for Token (in header)
    if (!token) return res.status(401).json({ msg: 'No token - authorisation denied' }) // 401 status = unauthorized
    
    try { // if TRY block fails, we don't need to call NEXT()
        // Verify Token
        const decoded = jwt.verify(token, secret)
        // Add User from Payload
        req.user = decoded
        next()
    } catch (e) { // if there is an error (bad request) do this:
        res.status(400).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth