import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { allProjects } from '../data/projects';

const categories = ['All', 'Lights & Luminous', 'Steels', 'Hardware Components', 'Interior Design'];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <header className="bg-slate-50 py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Excellence in Every <span className="text-blue-600">Detail</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            A curated showcase of landmark projects that define our legacy in specialized construction and engineering across the Middle East.
          </p>
        </motion.div>
        
        {/* Subtle decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50"></div>
      </header>

      {/* Project Filter */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-6">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-center space-x-3 min-w-max">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 text-sm font-bold rounded-2xl transition-all duration-300 border-2 ${
                  activeCategory === category 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200 scale-105' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900'
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            layout
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl shadow-slate-200/50"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Image Layer */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Content Layer */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-black mb-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-slate-300 text-sm font-medium">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                      </div>
                    </div>
                    
                    <div className="h-0 group-hover:h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <button className="flex items-center text-white font-black text-sm group/btn">
                        View Details
                        <div className="ml-3 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-slate-950 transition-all duration-300">
                          <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070')] bg-fixed bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to start your project?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Let's collaborate to bring your vision to life with our precision engineering and technical expertise.
          </p>
          <button 
            onClick={() => window.location.href='/contact'}
            className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] text-lg transition-all duration-300 shadow-2xl shadow-blue-500/20 hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;