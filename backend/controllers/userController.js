// server/controllers/userController.js
import { genSalt, hash } from 'bcryptjs';
import { findByEmail, create } from '../models/userModel';

// @desc    Registrar nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validar que lleguen los datos
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Por favor incluye todos los campos');
    }

    // 2. Verificar si el usuario ya existe
    const userExists = await findByEmail(email);
    if (userExists) {
      res.status(400);
      throw new Error('El usuario ya existe');
    }

    // 3. Hashear contraseña
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // 4. Crear usuario en DB
    const newUser = await create(username, email, hashedPassword);

    // 5. Responder (Aquí luego añadiremos el Token JWT)
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.user_id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    // Pasamos el error al middleware errorHandler que creamos antes
    next(error); 
  }
};

export default {
  registerUser,
};