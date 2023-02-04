// la hice hace como 2 meses pero la version original la tengo en un repositorio privado. esto es porque en render lo subi con un repo privado y por si las dudas, no queria cambiarlo a publico
// tuve la ayuda de varios videos en youtube, aprendi que jwt + cookie es mejor que jwt + localstorage


import express from "express";
import 'dotenv/config'
import "./database/connect.js"
import routerRenombrado from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN5]

app.use(cors({
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback ('error de cors :c ' + origin + ' no autorizado')
    },
    credentials: true
}))

app.use(cookieParser());
app.use(express.json())
// todas las rutas que vengan de routerRenombrado, tendran esa base /api/v1
app.use("/api/v1/auth", routerRenombrado)

// va a mandar el puerto especial, sino, el 5025
const PORT = process.env.PORT || 5025
app.listen(PORT, () => console.log('🚀🚀🚀   http://localhost:' + PORT))

