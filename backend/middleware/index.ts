import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export const secretKey = "helloworld"



const authentication = (req: Request, res: Response, next: NextFunction) => {

    const authHeaders = req.headers.authorization;
    if (authHeaders) {

        const token = authHeaders.split(' ')[1]

        if (token) {
            jwt.verify(token, secretKey, (err, payload) => {

                if (err) {
                    return res.sendStatus(401)
                }
                if (!payload) {
                    return res.sendStatus(403)
                }
                if (typeof payload === "string") {
                    return res.sendStatus(403)
                }
                req.headers['userId'] = payload.id

                next()
            })
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }

}
export default authentication;