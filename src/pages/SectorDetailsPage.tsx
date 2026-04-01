import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Layers, Palette, Settings, ArrowLeft, CheckCircle2 } from 'lucide-react';

const sectorData = {
  lights: {
    title: 'Professional Lighting Solutions',
    shortTitle: 'Lights',
    description: 'Illuminate your spaces with our premium range of lighting solutions. From energy-efficient LEDs to stunning architectural fixtures, we provide lighting that enhances aesthetics and functionality.',
    icon: <Lightbulb className="w-12 h-12" />,
    heroImage: '/images/lights.jpg',
    products: [
      { name: 'Architectural Led Lighting', desc: 'Sleek and integrated lighting for modern designs.' },
      { name: 'Industrial High Bay Lights', desc: 'Powerful illumination for warehouses and factories.' },
      { name: 'Smart Home Lighting Systems', desc: 'Controllable, automated lighting for convenience.' },
      { name: 'Outdoor & Landscape Lighting', desc: 'Durable lighting for exterior aesthetics and security.' },
    ],
    details: 'Our lighting division partners with top global manufacturers to bring you reliable, state-of-the-art illumination technology. Whether it is a commercial skyscraper or a residential project, we have all different lights sold here to meet exact specifications and energy standards.'
  },
  steels: {
    title: 'High-Grade Steel Materials',
    shortTitle: 'Steels',
    description: 'Robust, durable, and versatile steel products for all construction and manufacturing needs. Quality you can build on.',
    icon: <Layers className="w-12 h-12" />,
    heroImage: '/images/steels.jpg',
    products: [
      { name: 'Structural Steel Beams', desc: 'Essential support structures for heavy construction.' },
      { name: 'Reinforcement Bars (Rebar)', desc: 'High-tensile strength bars for concrete reinforcement.' },
      { name: 'Galvanized Steel Sheets', desc: 'Rust-resistant sheeting for roofing and cladding.' },
      { name: 'Custom Fabrication', desc: 'Bespoke steel solutions engineered to order.' },
    ],
    details: 'We supply premium grade steel sourced from certified mills globally. Our inventory handles projects of any scale, ensuring timely delivery of structural and aesthetic steel components that meet strict industry standards.'
  },
  interior: {
    title: 'Exquisite Interior Design Elements',
    shortTitle: 'Interior Design',
    description: 'Transforming empty spaces into inspiring environments. We supply premium materials for modern interior architecture.',
    icon: <Palette className="w-12 h-12" />,
    heroImage: '/images/interior.jpg',
    products: [
      { name: 'Acoustic Panels', desc: 'Sound-absorbing materials with high aesthetic appeal.' },
      { name: 'Premium Floor Coverings', desc: 'Hardwoods, laminates, and luxury vinyl tiles.' },
      { name: 'Decorative Wall Finishes', desc: 'Textured paints, wallpapers, and elegant cladding.' },
      { name: 'Custom Cabinetry Materials', desc: 'High-quality woods and composites for built-ins.' },
    ],
    details: 'Our interior design sector focuses on providing architects and designers with a curated selection of premium finishes and fixtures. We stay ahead of trends while ensuring timeless quality.'
  },
  hardware: {
    title: 'Reliable Hardware Components',
    shortTitle: 'Hardware',
    description: 'The critical details that hold it all together. Precision-engineered hardware for flawless functionality.',
    icon: <Settings className="w-12 h-12" />,
    heroImage: '/images/hardware.jpg',
    products: [
      { name: 'Architectural Door Hardware', desc: 'Locks, handles, and hinges built for heavy traffic.' },
      { name: 'Fastening Systems', desc: 'Industrial-grade bolts, screws, and anchors.' },
      { name: 'Cabinet & Furniture Fittings', desc: 'Smooth glides, hinges, and ergonomic pulls.' },
      { name: 'Safety & Security Hardware', desc: 'Access control accessories and panic hardware.' },
    ],
    details: 'We offer an extensive catalog of hardware components designed for durability and ease of installation. Our products ensure that the moving parts of your project operate smoothly for years to come.'
  }
};

type SectorKey = keyof typeof sectorData;

const SectorDetailsPage = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  
  const sector = sectorId && sectorData[sectorId as SectorKey] ? sectorData[sectorId as SectorKey] : null;

  if (!sector) {
    return (
      <div className="min-h-screen py-32 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Sector Not Found</h1>
        <p className="text-gray-600 mb-8">The product sector you are looking for does not exist.</p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${sector.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-blue-900/70 z-10" />
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              {sector.icon}
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {sector.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {sector.description}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-6">About Our {sector.shortTitle} Division</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {sector.details}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We pride ourselves on offering comprehensive solutions tailored to your specific requirements. By leveraging our established supply chains and industry expertise, we ensure our clients receive the highest value and quality for every single component.
              </p>
            </motion.div>
          </div>

          {/* Products List Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Key Products Sold</h3>
              <ul className="space-y-6">
                {sector.products.map((product, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{product.name}</h4>
                      <p className="text-gray-600 text-sm">{product.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/contact" 
                className="block w-full py-4 px-6 bg-blue-900 text-white text-center rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectorDetailsPage;
