import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { ProjectsPortfolio } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0`}>
      {children}
    </div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectsPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const sectors = [
    'All',
    'Industrial',
    'Healthcare',
    'Transport',
    'Oil & Gas',
    'Infrastructure',
    'Hospitality',
    'Residential',
    'Commercial',
    'Social Infrastructure'
  ];

  useEffect(() => {
    loadProjects();
  }, [skip]);

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<ProjectsPortfolio>('projectsportfolio', [], { limit, skip });
      setProjects(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = selectedSector === 'All'
    ? projects
    : projects.filter(project => project.sector === selectedSector);

  const handleLoadMore = () => {
    setSkip(skip + limit);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-accent to-accent/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our Projects Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Showcasing 300+ completed projects across various sectors in the MENA region
            </p>
          </div>
        </div>
      </section>

      {/* Sector Filter */}
      <section className="py-8 bg-secondary/20 sticky top-20 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSector === sector ? 'default' : 'outline'}
                onClick={() => setSelectedSector(sector)}
                className={`transition-all duration-200 ${
                  selectedSector === sector
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-primary/10'
                }`}
              >
                {sector}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20 min-h-[600px]">
        <div className="container mx-auto px-4">
          {isLoading ? null : filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <AnimatedElement key={project._id}>
                    <Card
                      className="group h-full hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.mainImage || 'https://static.wixstatic.com/media/89a4fd_5d43ac583c984f10a074d7de0f591f23~mv2.png?originWidth=384&originHeight=256'}
                          alt={project.projectName || 'Project'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {project.completionYear && (
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            {project.completionYear}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        {project.sector && (
                          <p className="text-sm text-primary font-semibold mb-2">
                            Sector: {project.sector}
                          </p>
                        )}
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {project.projectName}
                        </h3>
                        {project.specifications && (
                          <p className="text-muted-foreground line-clamp-3">
                            {project.specifications}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>

              {/* Load More */}
              {hasNext && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    onClick={handleLoadMore}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Load More Projects
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {selectedSector === 'All'
                  ? 'No projects available at the moment.'
                  : `No projects found in the ${selectedSector} sector.`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
                Our Track Record
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">300+</div>
                  <div className="text-xl text-white/90">Completed Projects</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">9</div>
                  <div className="text-xl text-white/90">Industry Sectors</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">30+</div>
                  <div className="text-xl text-white/90">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA Section */}
      <AnimatedElement>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Have a project in mind?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how ASGC can help bring your construction project to life with our proven expertise.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
