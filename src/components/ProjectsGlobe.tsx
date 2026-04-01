import { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { allProjects } from '../data/projects';
import { useNavigate } from 'react-router-dom';

const ProjectsGlobe = () => {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-rotate and controls
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = false; // Disable zoom to keep it looking clean and locked
      globeEl.current.pointOfView({ lat: 25, lng: 50, altitude: 2.2 }); // Slightly pulled back
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 600
        });
      }
    };

    // Initial resize call
    setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] md:h-[600px] flex justify-center items-center overflow-hidden rounded-2xl relative bg-transparent">
      
      {/* Subtle overlay instructions */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider">Global Footprint</h3>
        <p className="text-sm text-gray-400 mt-1">Drag to rotate the view. Hover over nodes to preview projects.</p>
      </div>

      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)" // Transparent background
        htmlElementsData={allProjects}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          
          el.innerHTML = `
            <div class="relative group cursor-pointer pointer-events-auto">
              <!-- Glowing Outer Ring & Inner Dot -->
              <div class="relative w-4 h-4 flex items-center justify-center">
                <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-60"></div>
                <div class="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#3b82f6] z-10"></div>
              </div>
              
              <!-- Hover Card Tooltip -->
              <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div class="bg-[#0f172a]/95 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden transform origin-bottom scale-95 group-hover:scale-100 transition-transform duration-300">
                  <div class="h-28 w-full overflow-hidden relative">
                    <img src="${d.image}" alt="${d.title}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 to-transparent"></div>
                  </div>
                  <div class="p-4 relative -mt-6">
                    <div class="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">${d.category}</div>
                    <div class="text-sm font-semibold text-white leading-tight mb-2">${d.title}</div>
                    <div class="flex items-center text-[10px] text-gray-400">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      ${d.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          el.style.pointerEvents = 'auto';
          el.onclick = () => {
             let sectorId = 'hardware';
             if (d.category.toLowerCase().includes('light')) sectorId = 'lights';
             if (d.category.toLowerCase().includes('steel')) sectorId = 'steels';
             if (d.category.toLowerCase().includes('interior')) sectorId = 'interior';
             navigate('/sectors/' + sectorId);
          };
          
          return el;
        }}
        htmlAltitude={0.05} // Kept low to almost touch the surface
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}
      />
    </div>
  );
};

export default ProjectsGlobe;
