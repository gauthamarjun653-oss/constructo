import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    emailAddress: '',
    phoneNumber: '',
    inquirySubject: '',
    messageContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactInquiries>('contactinquiries', {
        _id: crypto.randomUUID(),
        senderName: formData.senderName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        inquirySubject: formData.inquirySubject,
        messageContent: formData.messageContent,
        submissionDate: new Date().toISOString()
      });

      setSubmitSuccess(true);
      setFormData({
        senderName: '',
        emailAddress: '',
        phoneNumber: '',
        inquirySubject: '',
        messageContent: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'MENA Region Headquarters',
      details: 'Multiple locations across the region'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+971 XX XXX XXXX',
      details: 'Mon-Fri: 8:00 AM - 6:00 PM'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@asgcgroup.com',
      details: 'We respond within 24 hours'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Monday - Friday',
      details: '8:00 AM - 6:00 PM GST'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Let&apos;s discuss how ASGC can help bring your construction project to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
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
                      <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-foreground font-semibold mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {info.details}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Contact Form */}
      <AnimatedElement>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-primary font-semibold text-center">
                        Thank you for your inquiry! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="senderName" className="text-foreground font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="senderName"
                          name="senderName"
                          value={formData.senderName}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailAddress" className="text-foreground font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phoneNumber" className="text-foreground font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="+971 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquirySubject" className="text-foreground font-semibold">
                          Subject *
                        </Label>
                        <Input
                          id="inquirySubject"
                          name="inquirySubject"
                          value={formData.inquirySubject}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Project Inquiry"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="messageContent" className="text-foreground font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="messageContent"
                        name="messageContent"
                        value={formData.messageContent}
                        onChange={handleChange}
                        required
                        className="mt-2 min-h-[150px]"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Map/Location Section */}
      <AnimatedElement>
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Locations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                ASGC operates across multiple locations in the MENA region, bringing construction excellence to communities throughout the area.
              </p>
              <Card className="p-8 shadow-xl">
                <CardContent>
                  <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">
                        Multiple locations across the MENA region
                      </p>
                    </div>
                  </div>
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
