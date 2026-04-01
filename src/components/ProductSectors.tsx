import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Lightbulb, Layers, Palette, Settings, ArrowRight } from 'lucide-react';

const sectors = [
  {
    id: 'lights',
    title: 'Lights',
    icon: <Lightbulb className="w-6 h-6" />,
    image: '/images/lights.jpg',
    color: 'bg-blue-900/90'
  },
  {
    id: 'steels',
    title: 'Steels',
    icon: <Layers className="w-6 h-6" />,
    image: '/images/steels.jpg',
    color: 'bg-green-600/90'
  },
  {
    id: 'interior',
    title: 'Interior Design',
    icon: <Palette className="w-6 h-6" />,
    image: '/images/interior.jpg',
    color: 'bg-blue-900/90'
  },
  {
    id: 'hardware',
    title: 'Hardware Components',
    icon: <Settings className="w-6 h-6" />,
    image: '/images/hardware.jpg',
    color: 'bg-blue-900/90'
  }
];

const SectorCard = ({ sector }: { sector: typeof sectors[0] }) => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onClick={() => navigate(`/sectors/${sector.id}`)}
      onMouseMove={handleMouseMove}
      className="group relative flex h-[450px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-gray-200 bg-gray-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer"
    >
      {/* React Bits Style Glow Effect overlay that tracks mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Background Image layer with subtle cinematic zoom */}
      <div 
         className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
         style={{ backgroundImage: `url(${sector.image})` }}
      />
      
      {/* Dark gradient fallback so text is always readable even if image fails */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-80" />
      
      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col justify-end h-full p-8">
         <div className="mb-4 bg-white/10 backdrop-blur-md self-start p-3.5 rounded-2xl border border-white/20 shadow-lg text-white transform group-hover:-translate-y-2 transition-transform duration-500">
           {sector.icon}
         </div>
         
         <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight group-hover:text-blue-200 transition-colors duration-300">
           {sector.title}
         </h3>
         
         <div className="flex items-center mt-2 overflow-hidden">
           <p className="text-sm font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
             Explore division
           </p>
           <div className="ml-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-white group-hover:text-black shadow-md">
             <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
           </div>
         </div>
      </div>
    </div>
  );
};

const ProductSectors = () => {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Sleek Minimalist Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-blue-600"></div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-none">
              Specialized <br className="hidden md:block"/> Business Sectors
            </h2>
          </div>
          <p className="text-gray-500 md:max-w-md text-lg leading-relaxed border-l-2 border-gray-200 pl-4">
            Delivering excellence and precision across four core construction and design divisions to shape the region's skyline.
          </p>
        </div>

        {/* Separated Professional Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sectors.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSectors;
