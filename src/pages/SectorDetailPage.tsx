import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Layers, Palette, Settings, ArrowLeft, CheckCircle2 } from 'lucide-react';

const sectorData: Record<string, any> = {
  lights: {
    title: 'Lighting Solutions',
    brand: 'Fabae Lighting',
    icon: <Lightbulb className="w-12 h-12" />,
    description: 'We specialize in the supply of energy-efficient sustainable, smart lighting. Better lighting solutions to empower the world with our Fabae Lighting.',
    longDescription: 'Advance Group provides cutting-edge lighting solutions for commercial, industrial, and residential projects. Our focus is on sustainability and smart technology that reduces energy consumption while enhancing aesthetics.',
    products: [
      'Smart LED Lighting',
      'Energy-Efficient Industrial Lights',
      'Commercial Architectural Lighting',
      'Sustainable Outdoor Solutions',
      'Fibre Optic Lighting (Pools, Spas, Retail)',
      'Custom Lighting Controls'
    ],
    image: '/images/modern%20LED.jpg'
  },
  steels: {
    title: 'Steel Structures',
    brand: 'Advance City Steel Contracting LLC',
    icon: <Layers className="w-12 h-12" />,
    description: 'We build superior, smarter and complex steel structure works.',
    longDescription: 'Our steel division is known for its ability to handle complex structural challenges. From large-scale industrial buildings to intricate architectural steel elements, we deliver precision and strength.',
    products: [
      'Complex Steel Frameworks',
      'Industrial Structural Works',
      'Architectural Steel Elements',
      'Custom Steel Fabrication',
      'Large-Scale Infrastructure Steels',
      'Steel Bridge Components'
    ],
    image: '/images/steel.jpg'
  },
  interior: {
    title: 'Interior Design & Fit-out',
    brand: 'Quickline Interior Decoration LLC',
    icon: <Palette className="w-12 h-12" />,
    description: 'We design and make real brands of interior fit-out works.',
    longDescription: 'Quickline Interior Decoration LLC provides comprehensive interior design and fit-out services. We transform spaces into functional and beautiful environments that reflect our clients branding and vision.',
    products: [
      'Corporate Office Fit-outs',
      'Retail Space Design',
      'Hospitality & Hotel Interiors',
      'Custom Joinery & Furniture',
      'Luxury Residential Decoration',
      'Turnkey Interior Solutions'
    ],
    image: '/images/Interior%20Design.jpg'
  },
  hardware: {
    title: 'Hardware & Building Materials',
    brand: 'Advance General Trading CO LLC',
    icon: <Settings className="w-12 h-12" />,
    description: 'A large variety of building materials for infrastructure development requirements.',
    longDescription: 'As a leading supplier in the UAE, we offer a vast range of premium building materials. From high-quality bathroom ware to industrial-grade hardware, we are your one-stop solution for construction needs.',
    products: [
      'Premium Bathroom Ware',
      'Industrial Hardware Supplies',
      'General Building Materials',
      'Plumbing & Electrical Fittings',
      'Infrastructure Development Supplies',
      'High-Quality Finishing Materials'
    ],
    image: '/images/hardware.jpg'
  }
};

const SectorDetailPage = () => {
  const { id } = useParams();
  const sector = id ? sectorData[id] : null;

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sector not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s]"
          style={{ backgroundImage: `url(${sector.image})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <Link 
            to="/" 
            className="flex items-center text-blue-300 hover:text-white mb-8 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Sectors
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-fit mb-6">
              {sector.icon}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">{sector.title}</h1>
            <p className="text-xl text-blue-200 font-medium max-w-2xl">{sector.brand}</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Division</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {sector.description}
              </p>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>{sector.longDescription}</p>
              </div>
            </motion.div>

            {/* Products List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">What we offer</h3>
              <div className="grid sm:grid-cols-1 gap-6">
                {sector.products.map((product: string, index: number) => (
                  <div key={index} className="flex items-start group">
                    <div className="mt-1 mr-4 bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{product}</h4>
                      <p className="text-gray-500 text-sm mt-1">Premium quality industry-standard solution.</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-12 bg-black text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center group">
                Inquire about these products
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorDetailPage;
