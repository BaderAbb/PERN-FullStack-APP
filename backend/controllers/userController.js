import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
  createUser,
  createUserWithBio,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  findAllUsers,
  updateUserAvatar,
  updateBio
} from '../models/userModel.js' // Importamos la capa de datos anterior
import { createImage, deleteImage, getImageById } from '../models/imageModel.js'
import fs from 'fs/promises'

// Generar JWT Token (función auxiliar)
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // 1. Validar que no falten datos
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Por favor rellena todos los campos' })
    }

    // 2. Verificar si el usuario ya existe
    const userExists = await findUserByEmail(email)
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // 3. Hashear la contraseña (bcrypt)
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // 4. Crear usuario en la BD usando el Modelo
    const newUser = await createUser({
      username,
      email,
      passwordHash
    })

    // 5. Responder con éxito y el token
    res.status(201).json({
      user: {
        id: newUser.user_id,
        username: newUser.username,
        email: newUser.email
      },
      token: generateToken(newUser.user_id)
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Error en el servidor al registrar usuario' })
  }
}

// @desc    Autenticar usuario y obtener token
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // 1. Buscar usuario por email
    const user = await findUserByEmail(email)

    // 2. Comprobar password
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      res.json({
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile_picture: user.profile_picture_id, // Esto lo manejaremos luego con las imágenes
          profile_picture_url: user.profile_picture_url
        },
        token: generateToken(user.user_id)
      })
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' })
  }
}

// @desc    Obtener datos del usuario actual (Perfil)
// @route   GET /api/users/me
export const getMe = async (req, res) => {
  // req.user vendrá del middleware de autenticación (que haremos luego)
  try {
    const user = await findUserById(req.user.user_id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil' })
  }
}

// @desc    Obtener todos los usuarios
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
}

// @desc    Subir avatar
// @route   POST /api/users/upload
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' })
    }
    const image = await createImage({
      filename: req.file.filename,
      original_filename: req.file.originalname,
      file_path: req.file.path,
      content_type: req.file.mimetype,
      file_size: req.file.size,
      uploaded_by: req.user.user_id
    })

    const user = await findUserById(req.user.user_id)
    if (user.profile_picture_id) {
      // Recuperamos los datos de la imagen ANTES de borrar nada
      const oldImage = await getImageById(user.profile_picture_id)

      // Es buena práctica verificar si oldImage existe por si acaso la integridad de datos falló
      if (oldImage) {
        // Intentamos borrar el archivo físico
        try {
          await fs.unlink(oldImage.file_path)
          console.log(`Archivo borrado debido a que se subio un nuevo avatar: ${oldImage.file_path}`)
        } catch (error) {
          // Si el archivo no existe en disco (ej: alguien lo borró a mano),
          // no queremos que explote la app, solo lo logueamos y seguimos.
          console.error('Error borrando archivo físico antiguo:', error.message)
        }

        // Ahora que ya no tenemos el archivo, borramos el registro de la BD
        await deleteImage(user.profile_picture_id)
      }
    }

    const updatedUser = await updateUserAvatar(req.user.user_id, image.image_id)
    updatedUser.profile_picture_url = `http://localhost:5000/uploads/${image.filename}`

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al subir avatar' })
  }
}

// @desc    Actualizar bio
// @route   PUT /api/users/update-bio
export const updateUserBio = async (req, res) => {
  try {
    const { bio } = req.body
    const user = await findUserById(req.user.user_id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    const updatedUser = await updateBio(req.user.user_id, bio)
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar bio' })
  }
}
