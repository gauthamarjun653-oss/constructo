import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { ConstructionServices } from '@/entities';
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

export default function ServicesPage() {
  const [services, setServices] = useState<ConstructionServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<ConstructionServices>('constructionservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our Construction Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Comprehensive construction solutions delivering value through expertise in estimating, procurement, value engineering, and design management
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20 min-h-[600px]">
        <div className="container mx-auto px-4">
          {isLoading ? null : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedElement key={service._id}>
                  <Card
                    className="group h-full hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {service.serviceImage && (
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Service'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {service.serviceName}
                      </h3>
                      {service.shortDescription && (
                        <p className="text-muted-foreground mb-4 text-lg">
                          {service.shortDescription}
                        </p>
                      )}
                      {service.detailedDescription && (
                        <p className="text-muted-foreground mb-6">
                          {service.detailedDescription}
                        </p>
                      )}
                      {service.callToActionUrl && (
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                          onClick={() => window.open(service.callToActionUrl, '_blank')}
                        >
                          Learn More
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Services information will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <AnimatedElement>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                Why Choose ASGC
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      Expertise & Experience
                    </h3>
                    <p className="text-muted-foreground">
                      Over 30 years of construction excellence in the MENA region with 300+ completed projects across diverse sectors.
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      Skilled Workforce
                    </h3>
                    <p className="text-muted-foreground">
                      12,000+ dedicated professionals driven by teamwork, integrity, and commitment to delivering exceptional results.
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      Innovation & Technology
                    </h3>
                    <p className="text-muted-foreground">
                      Adopting the latest construction technology and sustainable solutions to build for tomorrow.
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      Complete Solutions
                    </h3>
                    <p className="text-muted-foreground">
                      From estimating to design management, we provide comprehensive construction services tailored to your needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA Section */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-br from-accent to-accent/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to discuss your project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our construction services can bring your vision to life.
            </p>
            <Button
              size="lg"
              className="bg-white text-accent hover:bg-white/90"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </Button>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
