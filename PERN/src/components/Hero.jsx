import React from 'react';

const Hero = () => {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80'
          alt='Hero background'
          className='w-full h-full object-cover'
        />
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/50'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center'>
        {/* Badge/Tag */}
        <div className='mb-6 animate-fade-in-down'>
          <span className='inline-block bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 text-orange-400 px-4 py-2 rounded-full text-sm font-medium'>
            🚗 Red Social de Autos
          </span>
        </div>

        {/* Main Heading */}
        <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in-up leading-tight'>
          Bienvenido a{' '}
          <span className='bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'>
            CarS
          </span>
        </h1>

        {/* Subtitle */}
        <p className='text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl animate-fade-in-up animation-delay-200'>
          Comparte tu pasión por los coches con el mundo. Conecta con entusiastas, muestra tu colección y descubre vehículos increíbles.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400'>
          <button className='group relative bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105'>
            <span className='relative z-10'>Comenzar Ahora</span>
            <div className='absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </button>
          
          <button className='backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105'>
            Explorar Autos
          </button>
        </div>

        {/* Stats/Features */}
        <div className='mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full animate-fade-in-up animation-delay-600'>
          <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
            <div className='text-4xl font-bold text-orange-500 mb-2'>10K+</div>
            <div className='text-gray-300 text-sm'>Usuarios Activos</div>
          </div>
          
          <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
            <div className='text-4xl font-bold text-orange-500 mb-2'>50K+</div>
            <div className='text-gray-300 text-sm'>Autos Compartidos</div>
          </div>
          
          <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
            <div className='text-4xl font-bold text-orange-500 mb-2'>200+</div>
            <div className='text-gray-300 text-sm'>Países</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <svg 
            className='w-6 h-6 text-white/70' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path 
              strokeLinecap='round' 
              strokeLinejoin='round' 
              strokeWidth={2} 
              d='M19 14l-7 7m0 0l-7-7m7 7V3' 
            />
          </svg>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Hero;