// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  ArrowRight, 
  Building2, 
  Home, 
  Briefcase, 
  HeartPulse, 
  Factory,
  Leaf,
  Recycle,
  Cpu,
  Trash2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { ConstructionServices, ProjectsPortfolio } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Robust Animated Reveal Component
const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ConstructionServices[]>([]);
  const [projects, setProjects] = useState<ProjectsPortfolio[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSector, setActiveSector] = useState(0);

  const heroSlides = [
    {
      title: 'Leading construction conglomerate',
      subtitle: 'operating in the MENA region for three decades.',
      image: 'https://static.wixstatic.com/media/89a4fd_856de17cf7da4c96af1ad00fcfcb16fe~mv2.png?originWidth=1152&originHeight=576',
      label: 'MBR Library'
    },
    {
      title: 'Driven by teamwork and integrity',
      subtitle: 'and utilizes the expertise of its employees, motivated by ASGC\'s values and strategies.',
      image: 'https://static.wixstatic.com/media/89a4fd_d7663fe342d944cbad034f0e21c1371e~mv2.png?originWidth=1152&originHeight=576',
      label: 'Creek Edge'
    },
    {
      title: 'Building for tomorrow',
      subtitle: 'by adopting latest technology and sustainable construction solutions.',
      image: 'https://static.wixstatic.com/media/89a4fd_02f09d835b67412e8ef29a243fc4e87a~mv2.png?originWidth=1152&originHeight=576',
      label: 'Marsa Al Arab'
    },
    {
      title: 'Delivering value',
      subtitle: 'by providing clients expertise in construction, estimating, procurement, value engineering and design management.',
      image: 'https://static.wixstatic.com/media/89a4fd_eef84cf1a30a48b4b783bc23fe3c0c5d~mv2.png?originWidth=1152&originHeight=576',
      label: 'Dubai Harbour Cruise Terminal'
    }
  ];

  const sectors = [
    { name: 'Hospitality', icon: Building2, image: 'https://static.wixstatic.com/media/89a4fd_9fca75da42b1477ab061ff2dc50ebe1c~mv2.png?originWidth=768&originHeight=448' },
    { name: 'Residential', icon: Home, image: 'https://static.wixstatic.com/media/89a4fd_cc9eeb32c36247aa8c2e92cc582f7efe~mv2.png?originWidth=768&originHeight=448' },
    { name: 'Commercial', icon: Briefcase, image: 'https://static.wixstatic.com/media/89a4fd_cf66f5106e8843488ee538b0bc498b43~mv2.png?originWidth=768&originHeight=448' },
    { name: 'Social Infrastructure', icon: HeartPulse, image: 'https://static.wixstatic.com/media/89a4fd_626affe01ec740208021d82b011cee64~mv2.png?originWidth=768&originHeight=448' },
    { name: 'Industrial', icon: Factory, image: 'https://static.wixstatic.com/media/89a4fd_5078b59882fc4cd881bf190ca0c9e86a~mv2.png?originWidth=768&originHeight=448' }
  ];

  const sustainabilityFeatures = [
    { title: 'Sustainable Construction Materials', icon: Leaf },
    { title: 'Reducing & Reusing Resources', icon: Recycle },
    { title: 'Smart Buildings & Digital Solutions', icon: Cpu },
    { title: 'Minimizing Waste', icon: Trash2 }
  ];

  const newsItems = [
    { date: 'February 10, 2023', title: 'ASGC is pleased to announce the successful completion of the Address Grand Creek Harbour' },
    { date: 'December 08, 2022', title: 'ASGC Welfare Department won the Taqdeer Award' }
  ];

  useEffect(() => {
    loadServices();
    loadProjects();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<ConstructionServices>('constructionservices', [], { limit: 6 });
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<ProjectsPortfolio>('projectsportfolio', [], { limit: 4 });
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-accent">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            
            {/* Diagonal Overlay matching screenshot */}
            <div 
              className="absolute inset-0 bg-accent/60 backdrop-blur-[2px]"
              style={{ clipPath: 'polygon(0 0, 65% 0, 45% 100%, 0% 100%)' }}
            />
            
            <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
              <div className="max-w-2xl text-white pt-20">
                <AnimatedElement delay={300}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                </AnimatedElement>
                <AnimatedElement delay={500}>
                  <p className="text-lg md:text-xl mb-8 text-white/90 font-light max-w-lg">
                    {slide.subtitle}
                  </p>
                </AnimatedElement>
                <AnimatedElement delay={700}>
                  <Button 
                    onClick={() => navigate('/about')}
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-accent rounded-full px-8 py-6 text-sm tracking-wider uppercase transition-all duration-300"
                  >
                    Read More
                  </Button>
                </AnimatedElement>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Right Slide Indicator */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full pr-2 pl-6 py-2">
          <span className="text-white font-medium text-sm">
            {heroSlides[currentSlide].label}
          </span>
          <div className="flex items-center gap-3 ml-4">
            <span className="text-white/70 text-sm font-mono">
              {currentSlide + 1}/{heroSlides.length}
            </span>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-colors duration-300"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* INTRO & STATS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-2xl">
                <Image 
                  src="https://static.wixstatic.com/media/89a4fd_0913a9a53ffc401c8a0feacc0bd375d4~mv2.png?originWidth=1280&originHeight=704" 
                  alt="Corporate Video" 
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 text-white font-heading font-semibold tracking-wide">
                  Corporate Video
                </div>
              </div>
            </AnimatedElement>

            <div className="space-y-10">
              <AnimatedElement delay={200}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-accent leading-tight">
                  Industry leader in providing complete construction solutions
                </h2>
              </AnimatedElement>
              
              <div className="grid grid-cols-2 gap-8">
                <AnimatedElement delay={400}>
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2 font-heading">
                      12000+
                    </div>
                    <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                      Employees
                    </div>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={600}>
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2 font-heading">
                      300+
                    </div>
                    <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                      Completed Projects
                    </div>
                  </div>
                </AnimatedElement>
              </div>

              <AnimatedElement delay={800}>
                <Button 
                  variant="outline" 
                  className="rounded-full px-8 py-6 border-border text-accent hover:bg-accent hover:text-white transition-all duration-300 uppercase tracking-wider text-sm"
                  onClick={() => navigate('/profile')}
                >
                  Profile <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 mb-10">
          <AnimatedElement>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-green-500"></div>
              <span className="text-green-600 font-bold tracking-widest uppercase text-sm">Sectors</span>
            </div>
            <div className="flex justify-between items-end">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent max-w-md leading-tight">
                Our portfolio across various sectors
              </h2>
              <div className="hidden md:flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Sectors Navigation Bar */}
        <div className="w-full bg-accent text-white/70 border-b border-white/10">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto scrollbar-hide">
              {sectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveSector(index)}
                    className={`flex-1 min-w-[160px] py-6 px-4 flex flex-col items-center gap-3 transition-all duration-300 border-r border-white/10 last:border-r-0
                      ${activeSector === index ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{sector.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sectors Image Slices */}
        <div className="w-full h-[400px] md:h-[500px] flex overflow-hidden">
          {sectors.map((sector, index) => (
            <div 
              key={index}
              className={`relative h-full transition-all duration-700 ease-in-out cursor-pointer group border-r border-white/20 last:border-r-0
                ${activeSector === index ? 'flex-[3] md:flex-[4]' : 'flex-1 hidden md:block'}`}
              onClick={() => setActiveSector(index)}
            >
              <Image 
                src={sector.image} 
                alt={sector.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/20 to-transparent opacity-80" />
              
              <div className={`absolute bottom-8 left-8 transition-all duration-500 ${activeSector === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-white text-2xl font-heading font-bold">{sector.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <div className="relative">
                {/* Distinctive Shape Container */}
                <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden relative shadow-2xl aspect-[4/3]">
                  <Image 
                    src="https://static.wixstatic.com/media/89a4fd_18aa5f9064f841a4bc4a430981ade236~mv2.png?originWidth=1152&originHeight=896" 
                    alt="Sustainability" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-accent/80 backdrop-blur-sm p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-[2px] bg-green-500"></div>
                      <span className="text-green-400 font-bold tracking-widest uppercase text-sm">Sustainability</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                      ASGC's approach to sustainability
                    </h2>
                    <Button 
                      onClick={() => navigate('/sustainability')}
                      className="self-start bg-accent border border-white/30 hover:bg-white hover:text-accent text-white rounded-full px-8 py-6 transition-all duration-300"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <div className="grid sm:grid-cols-2 gap-8">
              {sustainabilityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <AnimatedElement key={index} delay={index * 150}>
                    <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors duration-300 group">
                      <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-accent text-lg leading-snug">
                        {feature.title}
                      </h3>
                    </div>
                  </AnimatedElement>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS & NEWS SECTION */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Projects Column (Takes 2/3) */}
            <div className="lg:col-span-2">
              <AnimatedElement>
                <h2 className="text-3xl font-heading font-bold text-accent mb-10">
                  Newly awarded projects
                </h2>
              </AnimatedElement>
              
              <div className="relative min-h-[400px]">
                {isLoadingProjects ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl z-10">
                    <LoadingSpinner className="w-8 h-8 text-primary" />
                  </div>
                ) : null}
                
                <div className={`grid sm:grid-cols-2 gap-6 transition-opacity duration-500 ${isLoadingProjects ? 'opacity-50' : 'opacity-100'}`}>
                  {projects.length > 0 ? projects.slice(0, 4).map((project, index) => (
                    <AnimatedElement key={project._id} delay={index * 100}>
                      <Link to={`/projects/${project._id}`} className="block group">
                        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 rounded-2xl bg-white">
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={project.mainImage || 'https://static.wixstatic.com/media/89a4fd_0acd3baa637d4fed84952dc966c31f7f~mv2.png?originWidth=576&originHeight=320'}
                              alt={project.projectName || 'Project'}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <CardContent className="p-6">
                            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">
                              Sector: {project.sector || 'Construction'}
                            </p>
                            <h3 className="text-xl font-heading font-bold text-accent group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {project.projectName}
                            </h3>
                          </CardContent>
                        </Card>
                      </Link>
                    </AnimatedElement>
                  )) : (
                    <div className="col-span-2 text-center py-12 bg-white rounded-2xl">
                      <p className="text-muted-foreground">No projects available at the moment.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* News Column (Takes 1/3) */}
            <div>
              <AnimatedElement>
                <h2 className="text-3xl font-heading font-bold text-accent mb-10">
                  Latest news
                </h2>
              </AnimatedElement>
              
              <div className="space-y-8">
                {newsItems.map((item, index) => (
                  <AnimatedElement key={index} delay={index * 200}>
                    <div className="group cursor-pointer border-b border-border pb-8 last:border-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-accent group-hover:text-primary transition-colors duration-300 leading-snug mb-4">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION (Preserved from original, styled to match) */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-6">
          <AnimatedElement>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6">
                Our Construction Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Delivering excellence across a comprehensive range of construction disciplines.
              </p>
            </div>
          </AnimatedElement>

          <div className="relative min-h-[300px]">
            {isLoadingServices ? (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner className="w-8 h-8 text-primary" />
              </div>
            ) : null}

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isLoadingServices ? 'opacity-0' : 'opacity-100'}`}>
              {services.length > 0 ? services.map((service, index) => (
                <AnimatedElement key={service._id} delay={index * 100}>
                  <Card className="group h-full border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden bg-white">
                    {service.serviceImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Service'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-xl font-heading font-bold text-accent mb-4 group-hover:text-primary transition-colors duration-300">
                        {service.serviceName}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Services information coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}