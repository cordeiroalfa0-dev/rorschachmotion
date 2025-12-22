import { useState, lazy, Suspense, memo } from "react";
import Header from "@/components/mobi/Header";
import Hero from "@/components/mobi/Hero";
import Footer from "@/components/mobi/Footer";
import WhatsAppButton from "@/components/mobi/WhatsAppButton";
import LoadingScreen from "@/components/mobi/LoadingScreen";

// Lazy load heavy components that are below the fold
const Clients = lazy(() => import("@/components/mobi/Clients"));
const About = lazy(() => import("@/components/mobi/About"));
const Services = lazy(() => import("@/components/mobi/Services"));
const Process = lazy(() => import("@/components/mobi/Process"));
const Technologies = lazy(() => import("@/components/mobi/Technologies"));
const Projects = lazy(() => import("@/components/mobi/Projects"));
const DeliveredSites = lazy(() => import("@/components/mobi/DeliveredSites"));
const Team = lazy(() => import("@/components/mobi/Team"));
const Testimonials = lazy(() => import("@/components/mobi/Testimonials"));
const FAQ = lazy(() => import("@/components/mobi/FAQ"));
const Contact = lazy(() => import("@/components/mobi/Contact"));
const ChatBot = lazy(() => import("@/components/mobi/ChatBot"));
const ScrollProgress = lazy(() => import("@/components/mobi/ScrollProgress"));
const FloatingElements = lazy(() => import("@/components/mobi/FloatingElements"));
const CustomCursor = lazy(() => import("@/components/mobi/CustomCursor"));
const Timeline = lazy(() => import("@/components/mobi/Timeline"));

// Minimal section loader
const SectionLoader = memo(() => (
  <div className="w-full py-20 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
));

// Video background component - optimized
const VideoBackground = memo(() => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-[120%] object-cover opacity-60 scale-110 -translate-y-[10%]"
      poster="/images/emerson-cordeiro.jpeg"
    >
      <source src="/videos/blog-background.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/50" />
  </div>
));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      
      <VideoBackground />

      <Suspense fallback={null}>
        <FloatingElements />
        <ScrollProgress />
      </Suspense>
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <Clients />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Process />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Technologies />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Timeline />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <DeliveredSites />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Team />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <WhatsAppButton />
      
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Index;
