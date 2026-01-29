import api from './api'

const createPost = async postData => {
  const formData = new FormData()
  formData.append('car_make', postData.car_make)
  formData.append('car_model', postData.car_model)
  formData.append('car_year', postData.car_year)
  formData.append('title', postData.title)
  formData.append('description', postData.description)
  formData.append('post_image', postData.post_image)
  const response = await api.post('/posts', formData)
  return response.data
}

const getMyPosts = async () => {
  const response = await api.get('/posts/me')
  return response.data
}

const getFeed = async () => {
  const response = await api.get('/posts')
  return response.data
}

export const postService = {
  createPost,
  getMyPosts,
  getFeed
}

export default postService
