import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Building, Users, Award } from 'lucide-react';

const milestones = [
  { icon: <Building size={40} className="text-blue-500" />, value: 1000, suffix: '+', label: 'Products Stocked' },
  { icon: <Users size={40} className="text-blue-500" />, value: 500, suffix: '+', label: 'Satisfied Clients' },
  { icon: <Award size={40} className="text-blue-500" />, value: 20, suffix: '+', label: 'Industry Partners' },
];

const CountUp = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(1);
  const rounded = useTransform(count, (Math.round));
  const display = useTransform(rounded, (latest) => `${latest.toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 0.8, ease: "easeOut" }); // Animate within a fraction of a second
    }
  }, [isInView, to, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const AboutPage = () => {
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
          About AdVance Group
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your trusted partner for premium architectural and industrial products, from lighting to hardware.
        </motion.p>
      </header>

      {/* Company History */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Founded with a vision to supply the construction industry with superior products, AdVance Group has become a leading name in specialized building materials. We are dedicated to sourcing and providing the highest quality lights, steels, interior finishes, and hardware components.
            </p>
            <p className="text-gray-600">
              Our mission is to empower architects, designers, and builders by offering a curated selection of products that meet the most demanding standards of quality, performance, and aesthetics. We believe in building lasting relationships based on trust and reliability.
            </p>
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" alt="Our Team" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{milestone.icon}</div>
                <p className="text-4xl font-bold text-blue-600">
                  <CountUp to={milestone.value} suffix={milestone.suffix} />
                </p>
                <p className="text-lg text-gray-600 mt-2">{milestone.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
