require('dotenv').config()

export const config = {
    secret: String(process.env.SECRET_JWT),
    expireIn: 3600 * 60
}