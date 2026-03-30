import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
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

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'Teamwork & Integrity',
      description: 'We utilize the expertise of our employees, motivated by ASGC&apos;s values and strategies to deliver exceptional results.'
    },
    {
      icon: Target,
      title: 'Excellence in Execution',
      description: 'Our commitment to quality and precision ensures every project meets the highest standards of construction excellence.'
    },
    {
      icon: Award,
      title: 'Industry Leadership',
      description: 'With over 30 years of experience, we have established ourselves as leaders in the MENA construction industry.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation & Growth',
      description: 'We continuously adopt the latest technology and sustainable construction solutions to build for tomorrow.'
    }
  ];

  const milestones = [
    { year: '1990s', title: 'Foundation', description: 'ASGC established as a construction company in the MENA region' },
    { year: '2000s', title: 'Expansion', description: 'Grew to become a leading construction conglomerate' },
    { year: '2010s', title: 'Innovation', description: 'Adopted sustainable construction and advanced technology' },
    { year: '2020s', title: 'Excellence', description: 'Over 300 projects completed with 12,000+ employees' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-accent to-accent/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About ASGC Group
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Leading construction conglomerate operating in the MENA region for over three decades
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <AnimatedElement>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Building Excellence Since 1990
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  ASGC is a leading construction conglomerate that has been shaping the landscape of the MENA region for over 30 years. Our commitment to excellence, innovation, and sustainability has made us a trusted partner for some of the most prestigious projects in the region.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  With a workforce of over 12,000 skilled professionals and a portfolio of more than 300 completed projects, we have established ourselves as industry leaders in providing complete construction solutions.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our success is driven by the expertise and dedication of our employees, who are motivated by ASGC&apos;s core values and strategic vision to deliver exceptional results on every project.
                </p>
              </div>
              <div>
                <Image
                  src="https://static.wixstatic.com/media/89a4fd_7a06c55f13c2488ca8e0479669b7dbe9~mv2.png?originWidth=576&originHeight=384"
                  alt="ASGC Construction Site"
                  className="rounded-2xl shadow-2xl w-full"
                  width={600}
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Core Values */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Timeline */}
      <AnimatedElement>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three decades of growth, innovation, and excellence
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex gap-6 items-start group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <span className="text-xl font-bold text-primary">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-4">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Stats Section */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-br from-accent to-accent/80 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">12,000+</div>
                <div className="text-xl text-white/90">Skilled Employees</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">300+</div>
                <div className="text-xl text-white/90">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">30+</div>
                <div className="text-xl text-white/90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Mission Statement */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 shadow-xl">
                <CardContent>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-center">
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground text-center mb-6">
                    To deliver value by providing clients with expertise in construction, estimating, procurement, value engineering, and design management, while building for tomorrow by adopting the latest technology and sustainable construction solutions.
                  </p>
                  <p className="text-lg text-muted-foreground text-center">
                    We are driven by teamwork and integrity, utilizing the expertise of our employees who are motivated by ASGC&apos;s values and strategies to create lasting impact in the communities we serve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
