import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Home, Info, ShoppingBag, Briefcase, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { icon: <Home size={24} />, label: 'Home', path: '/' },
  { icon: <Info size={24} />, label: 'About', path: '/about' },
  { icon: <ShoppingBag size={24} />, label: 'Products', path: '/products' },
  { icon: <Briefcase size={24} />, label: 'Projects', path: '/projects' },
  { icon: <Mail size={24} />, label: 'Contact', path: '/contact' },
];

const GooeyNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#goo)' }} className="relative flex flex-col items-center">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute bottom-full mb-6 flex flex-col-reverse items-center gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ y: 80, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 80, opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.05
                  }}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className="w-14 h-14 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors group relative"
                  title={item.label}
                >
                  {item.icon}
                  {/* Label tooltip */}
                  <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={toggleMenu}
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-500 transition-colors z-10"
        >
          <Plus size={32} />
        </motion.button>
      </div>
    </div>
  );
};

export default GooeyNav;
