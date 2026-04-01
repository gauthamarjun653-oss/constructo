import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductSectors from '../components/ProductSectors';
import GooeyNav from '../components/GooeyNav';

const heroSlides = [
  {
    title: 'Let’s Build Something Best Together',
    subtitle: 'Advance Group: Providing quality solutions & supplies to the construction and medical industry for over 20 years.',
    image: '/images/CorporateConstruction%20Image.jpg'
  },
  {
    title: 'Fabae Lighting Solutions',
    subtitle: 'Energy-efficient sustainable, smart lighting to empower the world.',
    image: '/images/Smart%20Lighting%20Image.jpg'
  },
  {
    title: 'Advance City Steel Contracting',
    subtitle: 'Building superior, smarter and complex steel structure works across the Middle East.',
    image: '/images/Steel%20Structure%20Image.jpg'
  }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <motion.div 
                className="max-w-2xl text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroSlides[currentSlide].title}</h1>
                <p className="text-xl md:text-2xl mb-8">{heroSlides[currentSlide].subtitle}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 flex items-center">
                  Our Products <ArrowRight className="ml-2" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Sectors Section */}
      <ProductSectors />

      {/* Sustainability Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img src="/images/Office%20Photo.jpg" alt="Advance Group Office" className="rounded-lg shadow-2xl"/>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">A Legacy of Excellence</h2>
            <p className="text-lg text-gray-600 mb-6">With over 20 years of experience, Advance Group has built a reputation for providing superior technical solutions and high-quality products. We value strong, long-term relationships and strive for complete customer satisfaction in every project.</p>
            <button 
              onClick={() => window.location.href='/about'}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Our History
            </button>
          </div>
        </div>
      </section>

      {/* Floating Gooey Nav */}
      <GooeyNav />
    </div>
  );
};

export default HomePage;
