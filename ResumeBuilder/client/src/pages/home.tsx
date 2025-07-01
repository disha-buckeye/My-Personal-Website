import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FloatingNav } from "@/components/ui/floating-nav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Home as HomeIcon,
  GraduationCap,
  Users,
  Heart,
  Code,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  Menu,
  X,
  Star,
  Award,
  BookOpen,
  Briefcase,
  Globe,
  Languages,
  Cake,
  Book,
  Bike,
  Plane,
  Music,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronDown,
} from "lucide-react";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

const navItems = [
  { name: "Home", link: "#home", icon: <HomeIcon className="w-4 h-4" /> },
  { name: "Education", link: "#education", icon: <GraduationCap className="w-4 h-4" /> },
  { name: "Leadership", link: "#leadership", icon: <Users className="w-4 h-4" /> },
  { name: "Volunteer", link: "#volunteer", icon: <Heart className="w-4 h-4" /> },
  { name: "Skills", link: "#skills", icon: <Code className="w-4 h-4" /> },
  { name: "Study", link: "/study", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Contact", link: "#contact", icon: <Mail className="w-4 h-4" /> },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} className="hidden md:block" />

      {/* Mobile Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-lg border-b-2 border-purple-200/50 z-50 md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">Disha Purkar</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.link.startsWith('#')) {
                      const element = document.querySelector(item.link);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    } else {
                      window.location.href = item.link;
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center blob-bg overflow-hidden">
        {/* Floating abstract shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bubble floating-element opacity-60"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 floating-element opacity-70"></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-coral-300 to-coral-400 floating-element opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 to-coral-200 floating-element opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 floating-element opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 via-coral-300 to-blue-400 blur-xl opacity-70 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616c667a2c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Professional portrait of Disha Purkar"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-white/80 soft-shadow"
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-700"
            >
              Disha Purkar
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl mb-6 text-slate-600 font-medium"
            >
              Empowering Communities Through Leadership & Innovation
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg mb-8 max-w-3xl mx-auto text-slate-500 leading-relaxed"
            >
              From founding nonprofits that provide free tutoring to thousands of children, to leading business initiatives and volunteering across multiple organizations—I believe in the power of young leaders to create meaningful change. Let's build something amazing together.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-400 to-coral-400 text-white hover:from-blue-500 hover:to-coral-500 border-0 rounded-full px-8 py-3 font-semibold soft-shadow"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Collaborate
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-400 text-slate-700 hover:bg-blue-100 hover:border-blue-500 rounded-full px-8 py-3 font-semibold"
                onClick={() => document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Award className="w-4 h-4 mr-2" />
                See My Impact
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center text-slate-500"
            >
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Columbus, OH
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <button
            onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </motion.div>
      </section>

      {/* Academic Excellence Section */}
      <section id="education" className="py-20 bg-gradient-to-br from-blue-50 to-coral-50 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-blue-300/30 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-coral-200/30 to-coral-300/30 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Academic Excellence</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Achieving outstanding results while pushing the boundaries of learning through advanced coursework and exceptional performance
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden card-hover soft-shadow bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 relative z-10">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">New Albany Plain Local Schools</h3>
                      <p className="text-slate-600 mb-4">Columbus, OH</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">3.98</div>
                          <div className="text-sm text-slate-600">Unweighted GPA</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">1470</div>
                          <div className="text-sm text-slate-600">SAT Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">32</div>
                          <div className="text-sm text-slate-600">ACT Score</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Perfect AP Scores</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="skill-badge bg-gradient-to-r from-blue-300 to-blue-400 text-white border-0 px-4 py-2">AP Statistics (5)</Badge>
                            <Badge className="skill-badge bg-gradient-to-r from-coral-300 to-coral-400 text-white border-0 px-4 py-2">AP U.S. History (5)</Badge>
                            <Badge className="skill-badge bg-gradient-to-r from-blue-400 to-coral-300 text-white border-0 px-4 py-2">AP Precalculus (5)</Badge>
                            <Badge className="skill-badge bg-gradient-to-r from-coral-400 to-blue-400 text-white border-0 px-4 py-2">AP Psychology (5)</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">College Coursework</h4>
                          <Badge className="skill-badge bg-gradient-to-r from-blue-200 to-coral-200 text-slate-700 border-0 px-4 py-2">CCP American Government</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 lg:mt-0 lg:ml-8">
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                        alt="Student studying in library with books and laptop"
                        className="w-full lg:w-80 h-60 object-cover rounded-xl shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Impact Section */}
      <section id="leadership" className="py-20 bg-gradient-to-br from-coral-50 via-blue-50 to-coral-100 relative overflow-hidden">
        {/* Abstract floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-coral-300/40 to-coral-400/40 blur-2xl floating-element"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-300/40 to-blue-400/40 blur-2xl floating-element"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/30 to-coral-300/30 blur-xl floating-element"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Creating Real Impact</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From founding nonprofits to leading transformative initiatives, here's how I'm building a better future for our communities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Heads Up Mentors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover soft-shadow bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 relative z-10">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-blue-300 to-coral-300 p-3 rounded-full mr-4">
                      <Users className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Nonprofit Founder & President</CardTitle>
                      <CardDescription className="text-coral-500 font-medium">Heads Up Mentors • June 2024 - Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Team meeting with diverse group of young professionals collaborating"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <p className="text-slate-600 mb-6 text-lg">Transforming education by providing free tutoring to thousands of underserved children</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-100 to-coral-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-slate-800">45+</div>
                      <div className="text-sm text-slate-600">Schools & Organizations Reached</div>
                    </div>
                    <div className="bg-gradient-to-r from-coral-100 to-blue-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-slate-800">501(c)(3)</div>
                      <div className="text-sm text-slate-600">Official Nonprofit Status</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-coral-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Founded and launched first mentoring pilot programs reaching K-8 students</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Developed strategic partnerships with 45+ schools and community organizations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-coral-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">Built organizational systems for sustainable growth and community impact</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Baking Club */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover soft-shadow bg-white/80 backdrop-blur-sm border-2 border-yellow-200/50 relative z-10">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-yellow-200 to-orange-200 p-3 rounded-full mr-4">
                      <Cake className="text-slate-600 h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Founder & Co-President - NAHS Baking Club</CardTitle>
                      <CardDescription>November 2023 - Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Group of students baking together in a kitchen, making cookies and pastries"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <p className="text-slate-600 mb-4">Building community through baking with 30+ active members</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Organized fundraisers and bake sales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Coordinated volunteer opportunities with local organizations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Proficient in Gmail, Google Forms, and Google Slides</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Global Scholars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/10 p-3 rounded-full mr-4">
                      <Globe className="text-green-500 h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Global Scholars</CardTitle>
                      <CardDescription>August 2023 - Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Professional business conference with speakers presenting to an audience"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Gained open-minded thinking strategies and cultural knowledge</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Toured Nestle R&D Factory for global business insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* National Student Leadership Conference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-500/10 p-3 rounded-full mr-4">
                      <Award className="text-purple-500 h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">National Student Leadership Conference</CardTitle>
                      <CardDescription>July 2024 - Ann Arbor, MI</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="University of Michigan campus with students attending leadership conference"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <p className="text-slate-600 mb-4">Business and Entrepreneurship focus at University of Michigan</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Developed business acumen through workshops and guest speakers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Enhanced teamwork through Capsim simulations and product pitches</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Engaged in leadership symposiums and style adaptation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Volunteer Work</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Giving back to the community through education and outreach initiatives
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business For Kids */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Briefcase className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Business For Kids Outreach Volunteer</CardTitle>
                      <CardDescription>August 2024 - Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Young volunteer teaching business concepts to elementary school children"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <p className="text-slate-600 mb-4">501(c)(3) nonprofit teaching business concepts to students grades 3-12</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Curated ideas behind social media posts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Wrote emails to schools and organizations nationwide</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Planned educational content for events</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Columbus Metropolitan Library */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/10 p-3 rounded-full mr-4">
                      <BookOpen className="text-green-500 h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Columbus Metropolitan Library Volunteen</CardTitle>
                      <CardDescription>November 2021 - Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Volunteer helping elementary student with reading in library setting"
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <div className="bg-green-100 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">90+</div>
                      <div className="text-sm text-green-700">Hours of Volunteer Work</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Coach elementary students in English literacy skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                      <span>Participate in Reading Buddies program weekly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Skills & Interests</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Technical proficiencies and personal interests that drive my passion for learning
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Code className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Technical Skills</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:scale-105 transition-transform duration-200">
                      Java
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:scale-105 transition-transform duration-200 ml-2">
                      Xojo
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:scale-105 transition-transform duration-200 ml-2">
                      HTML
                    </Badge>
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 hover:scale-105 transition-transform duration-200 ml-2">
                      CSS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/10 p-3 rounded-full mr-4">
                      <Languages className="text-green-500 h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Languages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">English</span>
                      <Badge className="bg-green-100 text-green-800">Native</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Marathi</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Limited Working</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Spanish</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Limited Working</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <Heart className="text-orange-500 h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Interests</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:scale-105 transition-transform duration-200">
                      <Cake className="w-3 h-3 mr-1" />
                      Baking
                    </Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:scale-105 transition-transform duration-200 ml-2">
                      <Book className="w-3 h-3 mr-1" />
                      Reading
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:scale-105 transition-transform duration-200 ml-2">
                      <Bike className="w-3 h-3 mr-1" />
                      Biking
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:scale-105 transition-transform duration-200 ml-2">
                      <Plane className="w-3 h-3 mr-1" />
                      Traveling
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:scale-105 transition-transform duration-200 ml-2">
                      <Music className="w-3 h-3 mr-1" />
                      Singing
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Let's connect and explore opportunities for collaboration, mentorship, or just to chat about shared interests
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Let's Connect</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <Mail className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Email</p>
                          <a href="mailto:dishahpurkar@gmail.com" className="text-primary font-medium hover:underline">
                            dishahpurkar@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <MapPin className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Location</p>
                          <p className="text-slate-800 font-medium">Columbus, OH</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <Clock className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Response Time</p>
                          <p className="text-slate-800 font-medium">Within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Areas of Interest</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                        <span className="text-sm">Educational initiatives and tutoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                        <span className="text-sm">Business and entrepreneurship</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                        <span className="text-sm">Community volunteer opportunities</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                        <span className="text-sm">Leadership development</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border border-gray-100">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          {...register("name")}
                          className="mt-2"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          {...register("email")}
                          className="mt-2"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="What's this about?"
                          {...register("subject")}
                          className="mt-2"
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-sm font-semibold text-slate-700">Message *</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="Tell me more about your inquiry..."
                          {...register("message")}
                          className="mt-2 resize-none"
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Disha Purkar</h3>
            <p className="text-slate-300 mb-6">Student Leader • Entrepreneur • Community Volunteer</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:dishahpurkar@gmail.com" className="text-slate-300 hover:text-white transition-colors duration-200">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            
            <div className="border-t border-slate-700 pt-8">
              <p className="text-slate-400 text-sm">
                © 2024 Disha Purkar. All rights reserved. | 
                <span className="text-slate-500 ml-2">Columbus, OH</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
