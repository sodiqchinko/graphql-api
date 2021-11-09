import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: process.env.TOKENEXPIRESIN,
        });
    } catch (error) {
        return {error: error.message};
    }
};

const decodeToken = (token) => {
    try {
        console.log(process.env.JWTSECRET)
        return jwt.verify(token, process.env.JWTSECRET);
    } catch (error) {
        return {error: error.message};
    }
};

export default {
    decodeToken,
    generateToken,
};
