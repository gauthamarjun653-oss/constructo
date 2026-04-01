import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectsGlobe from '../components/ProjectsGlobe';

import { allProjects } from '../data/projects';

const categories = ['All', 'Lights & Luminous', 'Steels', 'Hardware Components', 'Interior Design'];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <header className="bg-gray-100 py-16 text-center">
        <motion.h1 
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Projects
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A portfolio of landmark projects that have shaped the region's skyline and infrastructure.
        </motion.p>
      </header>

      {/* 3D Projects Globe Section */}
      <section className="py-12 bg-[#0f172a] border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGlobe />
        </div>
      </section>

      {/* Project Filter */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-2 md:space-x-4">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map(project => (
              <motion.div 
                key={project.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-500 font-semibold">{project.category}</p>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
