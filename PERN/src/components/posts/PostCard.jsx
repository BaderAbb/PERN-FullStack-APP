import React from 'react';

const PostCard = ({ post }) => {
  // Formatear fecha para que no salga "2023-01-01T00:00:00.000Z"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
      {/* 1. HEADER: Autor y Avatar */}
      <div className="flex items-center px-6 py-4">
        <img
          className="h-10 w-10 rounded-full object-cover border border-gray-200"
          src={post.author_avatar_url || 'https://picsum.photos/200'} // Fallback si no tiene avatar
          alt={post.author_username}
        />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">
            {post.username}
          </h3>
          <p className="text-xs text-gray-500">
            {formatDate(post.created_at)}
          </p>
        </div>
      </div>

      {/* 2. CONTENIDO: Título y Texto */}
      <div className="px-6 pb-2">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h2>
        <p className="text-sm text-indigo-600 font-medium mb-2">
          {post.car_make} {post.car_model} ({post.car_year})
        </p>
        <p className="text-gray-700 text-sm mb-4">
          {post.description}
        </p>
      </div>

      {/* 3. IMAGEN DEL COCHE (Si existe) */}
      {post.post_image_url && (
        <div className="w-full bg-gray-100">
          <img
            src={post.post_image_url}
            alt={`${post.car_make} ${post.car_model}`}
            className="w-full h-auto object-cover max-h-[500px]"
            loading="lazy"
          />
        </div>
      )}

      {/* 4. FOOTER: Acciones (Likes, Comentarios - Próximamente) */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex space-x-4 text-gray-500 text-sm">
          <button className="flex items-center hover:text-red-500 transition-colors">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Me gusta
          </button>
          <button className="flex items-center hover:text-blue-500 transition-colors">
             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
             Comentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;