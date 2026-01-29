import {
  createPost,
  getAllPostsFromUser,
  getAllPosts
} from '../models/postModel.js'
import { createImage } from '../models/imageModel.js'; // Reutilizamos tu modelo existente

// BASE URL para las imágenes (puedes sacarla de process.env)
const BASE_URL = 'http://localhost:5000/uploads/';

// @desc    Crear un nuevo post (Coche + Foto)
// @route   POST /api/posts
export const createNewPost = async (req, res) => {
  try {
    const { car_make, car_model, car_year, title, description } = req.body;
    let image_id = null; 

    // 1. GESTIÓN DE LA IMAGEN (Si el usuario subió una)
    if (req.file) {
      // Reutilizamos tu lógica de guardar imagen
      const newImage = await createImage({
        filename: req.file.filename,
        original_filename: req.file.originalname,
        file_path: req.file.path,
        content_type: req.file.mimetype,
        file_size: req.file.size,
        uploaded_by: req.user.user_id
      });
      image_id = newImage.image_id;
    }

    // 2. CREACIÓN DEL POST (Vinculamos la imagen si existe)
    const newPost = await createPost({
      user_id: req.user.user_id,
      car_make,
      car_model,
      car_year,
      title,
      description,
      image_id // Puede ser UUID o null
    });

    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la publicación' });
  }
};

// @desc    Obtener mis posts
// @route   GET /api/posts/my-posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await getAllPostsFromUser(req.user.user_id);

    const myPosts = posts.map(post => ({
      ...post,
      // URL de la foto del coche
      post_image_url: post.post_image_file 
        ? BASE_URL + post.post_image_file 
        : null,
      // URL del avatar del autor
      author_avatar_url: post.author_avatar_file 
        ? BASE_URL + post.author_avatar_file 
        : null
    }));

    res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener mis posts' });
  }
};

// @desc    Obtener el Feed completo
// @route   GET /api/posts
export const getFeed = async (req, res) => {
  try {
    const posts = await getAllPosts();

    // 3. TRANSFORMACIÓN DE DATOS (Hydration)
    // Convertimos los filenames crudos en URLs usables para el Frontend
    const feed = posts.map(post => ({
      ...post,
      // URL de la foto del coche
      post_image_url: post.post_image_file 
        ? BASE_URL + post.post_image_file 
        : null,
      // URL del avatar del autor
      author_avatar_url: post.author_avatar_file 
        ? BASE_URL + post.author_avatar_file 
        : null
    }));

    res.status(200).json(feed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar el feed' });
  }
};
