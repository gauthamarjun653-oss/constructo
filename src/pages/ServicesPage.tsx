import { motion } from 'framer-motion';
import { Lightbulb, Layers, Palette, Settings } from 'lucide-react';

const services = [
  {
    icon: <Lightbulb size={48} className="text-blue-500" />,
    title: 'Lights & Luminous Products',
    description: 'Comprehensive lighting solutions, from architectural and facade lighting to advanced LED systems for commercial and residential projects.'
  },
  {
    icon: <Layers size={48} className="text-blue-500" />,
    title: 'Steels',
    description: 'High-grade structural steel, custom fabrication, and steel components for industrial, commercial, and infrastructure projects.'
  },
  {
    icon: <Palette size={48} className="text-blue-500" />,
    title: 'Interior Design',
    description: 'A curated selection of premium materials and finishes to bring sophisticated interior design visions to life, from flooring to fixtures.'
  },
  {
    icon: <Settings size={48} className="text-blue-500" />,
    title: 'Hardware Components',
    description: 'A wide range of industrial and architectural hardware, including precision fasteners, high-grade fittings, and mechanical parts.'
  },
];

const ServicesPage = () => {
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
          Our Specialized Sectors
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Providing superior products across our core sectors of expertise, ensuring quality and performance for every project.
        </motion.p>
      </header>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-start space-x-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Partner with KASR?</h2>
            <p className="text-gray-600 mb-4">
              Our focused approach and commitment to quality set us apart. We are not just suppliers; we are partners in our clients' success, providing the best components and materials for every endeavor.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Decades of sourcing experience</li>
              <li>Unwavering commitment to quality and durability</li>
              <li>Innovative and premium product selections</li>
              <li>Client-centric approach to supply</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2190" alt="Why Choose Us" className="rounded-lg shadow-2xl"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
