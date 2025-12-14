'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse follower effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      // Hero entrance animation with more flair
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(logoRef.current, 
          { scale: 0, rotation: -360, opacity: 0 }, 
          { scale: 1, rotation: 0, opacity: 1, duration: 2, ease: 'elastic.out(1, 0.5)' }
        )
        .fromTo(titleRef.current, 
          { x: -100, opacity: 0, rotateY: -90 }, 
          { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power4.out' }, 
          '-=1.5'
        )
        .fromTo(subtitleRef.current, 
          { x: 100, opacity: 0, rotateY: 90 }, 
          { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power4.out' }, 
          '-=1'
        )
        .fromTo(descRef.current, 
          { y: 100, opacity: 0, scale: 0.8 }, 
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 
          '-=0.8'
        );

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Parallax hero elements
      gsap.to(titleRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(logoRef.current, {
        y: 150,
        scale: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // About section with reveal animation
      const aboutTitle = aboutRef.current?.querySelector('h2');
      const aboutParagraphs = aboutRef.current?.querySelectorAll('p');
      
      gsap.fromTo(aboutTitle, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(aboutParagraphs, 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.3,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
          }
        }
      );

      // Skills with 3D flip animation
      const skills = gsap.utils.toArray('.skill');
      skills.forEach((skill: any, index) => {
        gsap.fromTo(skill, 
          { opacity: 0, rotateY: -180, z: -100 }, 
          {
            opacity: 1, rotateY: 0, z: 0, 
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 70%',
            }
          }
        );

        // Hover animation
        skill.addEventListener('mouseenter', () => {
          gsap.to(skill, { scale: 1.1, rotateY: 10, duration: 0.3 });
        });
        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, { scale: 1, rotateY: 0, duration: 0.3 });
        });
      });

      // Projects with magnetic effect
      const projects = gsap.utils.toArray('.project');
      projects.forEach((project: any, index) => {
        gsap.fromTo(project, 
          { opacity: 0, y: 100, rotateX: -45 }, 
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: 'top 70%',
            },
            delay: index * 0.15
          }
        );

        // Parallax on scroll
        gsap.to(project, {
          y: -50,
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });

      // Testimonials slide from sides
      const testimonials = gsap.utils.toArray('.testimonial');
      testimonials.forEach((testimonial: any, index) => {
        gsap.fromTo(testimonial, 
          { opacity: 0, x: index % 2 === 0 ? -200 : 200, rotation: index % 2 === 0 ? -10 : 10 }, 
          {
            opacity: 1, x: 0, rotation: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 70%',
            },
            delay: index * 0.3
          }
        );
      });

      // Contact form elements animate in sequence
      const formElements = contactRef.current?.querySelectorAll('h2, p, a, input, textarea, button');
      gsap.fromTo(formElements, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
          }
        }
      );

      // Smooth color transitions on scroll
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: '#0f172a', duration: 1 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#111827', duration: 1 }),
      });

      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: 'top 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: '#1e1b4b', duration: 1 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#0f172a', duration: 1 }),
      });

      ScrollTrigger.create({
        trigger: portfolioRef.current,
        start: 'top 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: '#312e81', duration: 1 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#1e1b4b', duration: 1 }),
      });

      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: 'top 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: '#1e3a8a', duration: 1 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#312e81', duration: 1 }),
      });

      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 50%',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: '#0f172a', duration: 1 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#1e3a8a', duration: 1 }),
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-x-hidden transition-colors duration-1000" style={{ perspective: '1000px' }}>
      {/* Animated cursor follower */}
      <div 
        className="fixed w-8 h-8 rounded-full bg-blue-500 pointer-events-none mix-blend-screen z-50 transition-transform duration-300"
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`, 
          transform: 'translate(-50%, -50%)',
          filter: 'blur(10px)',
          opacity: 0.6
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => {
              const size = 1 + (i % 4);
              const top = (i * 5) % 100;
              const left = (i * 7) % 100;
              const delay = (i % 2);
              const duration = 2 + (i % 3);
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Image
            ref={logoRef}
            src="/Transparent Logo_light_bg.png"
            alt="CIKefallinos Logo"
            width={280}
            height={280}
            className="mb-12 drop-shadow-2xl"
          />
          <h1 ref={titleRef} className="text-7xl md:text-8xl font-extrabold mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
            CIKefallinos
          </h1>
          <p ref={subtitleRef} className="text-2xl md:text-4xl mb-10 text-blue-300 font-light tracking-wide">
            Web Developer - Χάρης Κεφαλληνός
          </p>
          <p ref={descRef} className="text-center max-w-4xl text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            Welcome to my portfolio. I am a passionate web developer specializing in creating beautiful, interactive, and functional websites using modern technologies like React, Next.js, GSAP, and more. Explore my work and let&apos;s build something amazing together!
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-24 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 animate-pulse"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-16 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
            About Me
          </h2>
          <p className="text-2xl md:text-3xl leading-relaxed mb-12 text-gray-200 font-light">
            Hi, I&apos;m <span className="text-blue-400 font-semibold">Charis Kefallinos</span>, a dedicated web developer with over <span className="text-purple-400 font-semibold">[X] years</span> of experience in crafting innovative digital experiences. I specialize in modern web technologies including <span className="text-blue-300">React</span>, <span className="text-blue-300">Next.js</span>, <span className="text-blue-300">TypeScript</span>, <span className="text-blue-300">Node.js</span>, and animation libraries like <span className="text-blue-300">GSAP</span>. My passion lies in creating websites that not only look stunning but also provide seamless user experiences and drive business results.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities. I believe in continuous learning and staying up-to-date with the latest trends in web development.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="relative py-24 px-6 min-h-screen flex items-center" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-600 to-pink-500"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-20 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ perspective: '1000px' }}>
            <div className="skill bg-linear-to-br from-blue-900 to-blue-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer border border-blue-500/30">
              <div className="text-5xl mb-4">⚛️</div>
              <h3 className="text-3xl font-bold mb-3 text-blue-300">React</h3>
              <p className="text-gray-300 text-lg">Building dynamic UIs</p>
            </div>
            <div className="skill bg-linear-to-br from-gray-900 to-gray-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-white/50 transition-all duration-300 cursor-pointer border border-gray-500/30">
              <div className="text-5xl mb-4">▲</div>
              <h3 className="text-3xl font-bold mb-3 text-white">Next.js</h3>
              <p className="text-gray-300 text-lg">Full-stack framework</p>
            </div>
            <div className="skill bg-linear-to-br from-green-900 to-green-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-green-500/50 transition-all duration-300 cursor-pointer border border-green-500/30">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-3xl font-bold mb-3 text-green-300">GSAP</h3>
              <p className="text-gray-300 text-lg">Advanced animations</p>
            </div>
            <div className="skill bg-linear-to-br from-blue-800 to-blue-600 p-8 rounded-2xl text-center shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 cursor-pointer border border-blue-400/30">
              <div className="text-5xl mb-4">📘</div>
              <h3 className="text-3xl font-bold mb-3 text-blue-200">TypeScript</h3>
              <p className="text-gray-300 text-lg">Type-safe JavaScript</p>
            </div>
            <div className="skill bg-linear-to-br from-green-800 to-green-600 p-8 rounded-2xl text-center shadow-2xl hover:shadow-green-400/50 transition-all duration-300 cursor-pointer border border-green-400/30">
              <div className="text-5xl mb-4">🟢</div>
              <h3 className="text-3xl font-bold mb-3 text-green-200">Node.js</h3>
              <p className="text-gray-300 text-lg">Server-side development</p>
            </div>
            <div className="skill bg-linear-to-br from-cyan-900 to-cyan-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer border border-cyan-500/30">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-3xl font-bold mb-3 text-cyan-300">Tailwind</h3>
              <p className="text-gray-300 text-lg">Utility-first styling</p>
            </div>
            <div className="skill bg-linear-to-br from-emerald-900 to-emerald-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer border border-emerald-500/30">
              <div className="text-5xl mb-4">🍃</div>
              <h3 className="text-3xl font-bold mb-3 text-emerald-300">MongoDB</h3>
              <p className="text-gray-300 text-lg">NoSQL database</p>
            </div>
            <div className="skill bg-linear-to-br from-orange-900 to-orange-700 p-8 rounded-2xl text-center shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 cursor-pointer border border-orange-500/30">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-3xl font-bold mb-3 text-orange-300">Git</h3>
              <p className="text-gray-300 text-lg">Version control</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="relative py-24 px-6 min-h-screen">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-bl from-pink-600 to-purple-700"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-20 text-center bg-clip-text text-transparent bg-linear-to-r from-pink-400 to-purple-400">
            My Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" style={{ perspective: '1000px' }}>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 border border-gray-700 hover:border-blue-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">🛒</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors">E-commerce Platform</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">A full-featured online store built with Next.js, featuring product catalogs, shopping cart, and payment integration.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Next.js</span>
                <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Stripe</span>
              </div>
            </div>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 border border-gray-700 hover:border-purple-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-purple-600 to-purple-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">💼</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors">Portfolio Website</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">A responsive portfolio site with smooth animations and interactive elements, showcasing creative work.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">React</span>
                <span className="bg-yellow-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">GSAP</span>
              </div>
            </div>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-500 border border-gray-700 hover:border-red-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-red-600 to-red-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">📊</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-red-300 group-hover:text-red-200 transition-colors">Dashboard App</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">An admin dashboard with data visualization, user management, and real-time updates.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Chart.js</span>
                <span className="bg-indigo-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Socket.io</span>
              </div>
            </div>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 border border-gray-700 hover:border-pink-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-pink-600 to-pink-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">📱</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-pink-300 group-hover:text-pink-200 transition-colors">Mobile App UI</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">Design and development of a mobile app interface with focus on UX and accessibility.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-pink-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Figma</span>
                <span className="bg-teal-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">React Native</span>
              </div>
            </div>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 border border-gray-700 hover:border-orange-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-orange-600 to-orange-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">🔌</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-orange-300 group-hover:text-orange-200 transition-colors">API Development</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">RESTful API design and implementation for a SaaS platform with authentication and rate limiting.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Express.js</span>
                <span className="bg-cyan-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">JWT</span>
              </div>
            </div>
            <div className="project bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 border border-gray-700 hover:border-emerald-500 cursor-pointer group overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-56 bg-linear-to-br from-emerald-600 to-emerald-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl">🚀</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-emerald-300 group-hover:text-emerald-200 transition-colors">Landing Page</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">High-converting landing page with A/B testing and analytics integration.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-lime-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Google Analytics</span>
                <span className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="relative py-24 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-tr from-cyan-600 to-blue-700"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-20 text-center bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="testimonial bg-linear-to-br from-gray-900 to-gray-800 p-10 rounded-2xl shadow-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500">
              <div className="text-6xl mb-6 text-cyan-400">"</div>
              <p className="text-xl italic mb-8 text-gray-200 leading-relaxed">Charis delivered exceptional work on our project. His attention to detail and creative solutions exceeded our expectations.</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-cyan-300">Client Name</p>
                  <p className="text-gray-400">Company</p>
                </div>
              </div>
            </div>
            <div className="testimonial bg-linear-to-br from-gray-900 to-gray-800 p-10 rounded-2xl shadow-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-500">
              <div className="text-6xl mb-6 text-blue-400">"</div>
              <p className="text-xl italic mb-8 text-gray-200 leading-relaxed">Working with Charis was a pleasure. He brought fresh ideas and implemented them flawlessly.</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold text-blue-300">Another Client</p>
                  <p className="text-gray-400">Another Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative py-24 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-purple-700 to-blue-800"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-12 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
            Get In Touch
          </h2>
          <p className="text-2xl md:text-3xl mb-16 text-gray-200 font-light">
            Interested in working together? Let&apos;s connect and discuss your next project!
          </p>
          <div className="flex justify-center space-x-8 mb-16">
            <a href="mailto:your.email@example.com" className="text-blue-400 hover:text-blue-300 text-xl font-semibold transition-all duration-300 hover:scale-110 transform">📧 Email</a>
            <a href="https://linkedin.com/in/yourprofile" className="text-blue-400 hover:text-blue-300 text-xl font-semibold transition-all duration-300 hover:scale-110 transform">💼 LinkedIn</a>
            <a href="https://github.com/yourusername" className="text-blue-400 hover:text-blue-300 text-xl font-semibold transition-all duration-300 hover:scale-110 transform">🐙 GitHub</a>
          </div>
          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-gray-800/70"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-gray-800/70"
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                rows={6} 
                className="w-full p-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-gray-800/70 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-5 rounded-xl text-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Send Message ✨
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-800">
        <p className="text-gray-400 text-lg">© 2025 CIKefallinos. All rights reserved.</p>
      </footer>
    </div>
  );
}
