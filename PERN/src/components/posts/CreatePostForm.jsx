import { useState, useEffect } from 'react'
import usePosts from '../../hooks/usePosts' // Tu custom hook

const CreatePostForm = () => {
  const { createPost } = usePosts()

  // Estado local para los campos de texto
  const [formData, setFormData] = useState({
    title: '',
    car_make: '',
    car_model: '',
    car_year: '',
    description: ''
  })

  // Estado separado para el archivo y la previsualización
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Maneja los inputs de texto
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Maneja la selección de imagen (¡Lógica Crítica!)
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Creamos la URL temporal para mostrarla
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Limpiar la URL temporal al desmontar el componente
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Preparamos el objeto para enviar al Contexto -> Servicio
      // Nota: Pasamos el archivo como propiedad 'post_image'
      const postData = {
        ...formData,
        post_image: imageFile
      }

      await createPost(postData)

      // 2. Limpieza (Reset total) tras éxito
      setFormData({
        title: '',
        car_make: '',
        car_model: '',
        car_year: '',
        description: ''
      })
      setImageFile(null)
      setPreviewUrl(null)
    } catch (error) {
      console.error('Error creando post:', error)
      // Aquí podrías poner un estado de error para mostrar una alerta
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white shadow rounded-lg p-6 mb-8'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>
        Presume de Coche 🏎️
      </h3>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {/* Título */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Título
            </label>
            <input
              type='text'
              name='title'
              required
              value={formData.title}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ej: Mi nuevo proyecto de restauración'
            />
          </div>

          {/* Marca */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Marca
            </label>
            <input
              type='text'
              name='car_make'
              required
              value={formData.car_make}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ej: Toyota'
            />
          </div>

          {/* Modelo */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Modelo
            </label>
            <input
              type='text'
              name='car_model'
              required
              value={formData.car_model}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ej: Supra MK4'
            />
          </div>

          {/* Año */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Año
            </label>
            <input
              type='number'
              name='car_year'
              required
              value={formData.car_year}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ej: 2022'
            />
          </div>

          {/* Descripción */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Descripción
            </label>
            <textarea
              name='description'
              required
              value={formData.description}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ej: Mi nuevo proyecto de restauración'
            />
          </div>

          {/* ZONA DE CARGA DE IMAGEN */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Foto del Coche
            </label>

            <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative hover:bg-gray-50 transition-colors'>
              {/* Si hay preview, mostramos la imagen. Si no, mostramos el icono de subir */}
              {previewUrl ? (
                <div className='relative'>
                  <img
                    src={previewUrl}
                    alt='Preview'
                    className='h-64 object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setPreviewUrl(null)
                      setImageFile(null)
                    }}
                    className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className='space-y-1 text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                  >
                    <path
                      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <div className='flex text-sm text-gray-600 justify-center'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'
                    >
                      <span>Sube un archivo</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        onChange={handleImageChange}
                        accept='image/*'
                      />
                    </label>
                  </div>
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mt-5 text-right'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isSubmitting
                ? 'bg-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePostForm
