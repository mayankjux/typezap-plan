'use client';

import { ChevronDown, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const subjects = [
  {
    title: "Self-Paced Learning",
    description: "Learn at your own pace with our flexible curriculum. Access comprehensive courses designed to fit your schedule and learning style.",
    features: ["24/7 course access", "Interactive lessons", "Progress tracking"]
  },
  {
    title: "Skill Development",
    description: "Master essential skills for today's job market. From technical to soft skills, our courses help you stay competitive.",
    features: ["Industry-relevant content", "Hands-on projects", "Skill assessments"]
  },
  {
    title: "Professional Certification",
    description: "Earn recognized certifications that boost your career. Our programs are designed in collaboration with industry experts.",
    features: ["Accredited certificates", "Expert-led courses", "Career guidance"]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Career Switcher",
    content: "This platform helped me transition into tech. The structured learning path and career guidance were invaluable!",
    image: "/testimonial1.jpg"
  },
  {
    name: "Michael Chen",
    role: "College Student",
    content: "The perfect complement to my university studies. The practical projects helped me understand concepts better.",
    image: "/testimonial2.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Professional",
    content: "The flexibility to learn while working full-time was crucial. I could upgrade my skills without compromising my job.",
    image: "/testimonial3.jpg"
  }
];

const faqs = [
  {
    question: "How does the learning platform work?",
    answer: "Our platform offers flexible, self-paced learning with interactive courses, practical assignments, and real-time progress tracking. You can learn anytime, anywhere."
  },
  {
    question: "Are the certificates recognized?",
    answer: "Yes, our certificates are industry-recognized and accredited. They're designed in partnership with leading companies and educational institutions."
  },
  {
    question: "How long do I have access to courses?",
    answer: "Once enrolled, you have lifetime access to the course materials. Learn at your own pace and revisit content whenever needed."
  },
  {
    question: "Is there support available?",
    answer: "Yes, we offer comprehensive support including mentor guidance, community forums, and technical assistance throughout your learning journey."
  }
];

interface CTAButtonProps {
  className?: string;
  isFloating?: boolean;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CTAButton = ({ className = "", isFloating = false }: CTAButtonProps) => (
    <Link href="/select">
      <button 
        className={`group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 ${className}`}
      >
        Start Learning Free
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section id="hero-section" className="relative h-[90vh] flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            Transform Your Future Through Learning
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Access world-class education at your fingertips. Learn, grow, and succeed on your own terms.
          </p>
          <CTAButton className="mx-auto" />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </div>
      </section>

      {/* Updated Subjects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Get to know our platform
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Discover how our learning platform adapts to your needs and helps you achieve your goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => (
              <div 
                key={subject.title}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                    {subject.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {subject.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {subject.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="group/btn inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold text-lg">
                    Explore courses
                    <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA Button */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <CTAButton />
      </div>
    </div>
  );
}
