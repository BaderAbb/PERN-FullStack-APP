import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const AvatarSelector = () => {
  const { user, updateUserAvatar } = useAuth(); // <--- Usamos la función del contexto
  const [uploading, setUploading] = useState(false);

  // URL por defecto si no hay imagen (puedes usar una de internet o un placeholder local)
  const defaultAvatar = "https://via.placeholder.com/150";
  
  // La URL viene del backend gracias a tu corrección del modelo (DTO)
  // Si user.profile_picture_url es null, usamos defaultAvatar
  const avatarUrl = user?.profile_picture_url || defaultAvatar;

  const handleFileChange = async (e) => {
    // 1. Obtener el archivo seleccionado
    const file = e.target.files[0];
    if (!file) return;

    // Validar que sea una imagen (opcional pero recomendado: type === 'image/jpeg' o png)
    if (!file.type.startsWith('image/')) {
        alert("Por favor, selecciona una imagen válida");
        return;
    }

    setUploading(true);
    try {
        // Llamar a la función del contexto para subir el archivo
        await updateUserAvatar(file);
        
        console.log("Imagen actualizada con éxito");
    } catch (error) {
        console.error("Error subiendo imagen", error);
        alert("Fallo al subir la imagen");
    } finally {
        setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group w-32 h-32">
        {/* IMAGEN DE PERFIL */}
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
        />

        {/* SPINNER DE CARGA (Solo visible si uploading es true) */}
        {uploading && (
           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
           </div>
        )}

        {/* INPUT INVISIBLE + LABEL CLICKABLE */}
        {/* El truco: La label cubre toda la imagen y dispara el input oculto */}
        <label 
          htmlFor="avatar-upload" 
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 rounded-full cursor-pointer transition-all duration-200"
        >
          <span className="text-white opacity-0 group-hover:opacity-100 font-medium text-sm">
            Cambiar
          </span>
          {/* El input real está oculto pero funcional */}
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
      
      <p className="text-gray-500 text-sm">Click en la imagen para editar</p>
    </div>
  );
};

export default AvatarSelector;