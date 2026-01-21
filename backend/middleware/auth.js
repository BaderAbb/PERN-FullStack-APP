import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;

    // 1. Verificamos si hay un token en el header 'Authorization'
    // El formato estándar es: "Bearer <token>"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtenemos el token (quitamos la palabra "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificamos el token con la firma secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Buscamos al usuario en la BD usando el ID del token
            // Nota: decoded.id viene de cuando hicimos jwt.sign({ id }...)
            req.user = await findUserById(decoded.id);

            // Si no se encuentra el usuario (ej: fue borrado de la BD), fallamos
            if (!req.user) {
                return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
            }

            // 4. Continuamos al siguiente paso (el controlador)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};