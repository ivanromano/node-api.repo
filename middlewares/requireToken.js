import jwt from "jsonwebtoken"

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        console.log(token);

        // el beer nos impide usar el token, vamos a sacarlo del objeto token
        token = token.split(" ")[1]

        // hace que solo se puedan enviar tokens. en consola monstraria un objeto con uid, vamos a sacarlo
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        console.log(uid);

        next()
    } catch (error) {
        console.log(error.message);
        // para el frontend
        const ErroresPorConsola = {
            ["invalid signature"]: "el token no es valido",
            ["jwt expired"]: "este token expiro",
            ["invalid token"]: "token no valido",
            ["No bearer"]: "usa formato bearer",
        }
        return res.status(401).json({error: ErroresPorConsola[error.message]})
    }
}
