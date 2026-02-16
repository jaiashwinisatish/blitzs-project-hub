import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NovaLandingNew = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Features data
  const features = [
    {
      icon: 'lni-vector',
      title: 'Graphics Design',
      description: 'Short description for the ones who look for something new.'
    },
    {
      icon: 'lni-pallet',
      title: 'Print Design',
      description: 'Short description for the ones who look for something new.'
    },
    {
      icon: 'lni-stats-up',
      title: 'Business Analysis',
      description: 'Short description for the ones who look for something new.'
    },
    {
      icon: 'lni-code-alt',
      title: 'Web Development',
      description: 'Short description for the ones who look for something new.'
    },
    {
      icon: 'lni-lock',
      title: 'Best Security',
      description: 'Short description for the ones who look for something new.'
    },
    {
      icon: 'lni-code',
      title: 'Web Design',
      description: 'Short description for the ones who look for something new.'
    }
  ];

  // Pricing plans data
  const pricingPlans = [
    {
      title: 'Basic Design',
      subtitle: 'Web Design',
      price: '$ 29.00',
      features: [
        'Carefully crafted components',
        'Amazing page examples',
        'Super friendly support team',
        'Awesome Support'
      ]
    },
    {
      title: 'Standard Design',
      subtitle: 'Web Development',
      price: '$ 89.00',
      features: [
        'Carefully crafted components',
        'Amazing page examples',
        'Super friendly support team',
        'Awesome Support'
      ],
      featured: true
    },
    {
      title: 'Pro Design',
      subtitle: 'Design & Develop',
      price: '$ 199.00',
      features: [
        'Carefully crafted components',
        'Amazing page examples',
        'Super friendly support team',
        'Awesome Support'
      ]
    }
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="navbar-brand">
              <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
            </Link>
            
            <button
              className="navbar-toggler md:hidden"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-controls="navbarSupportedContent6"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon block w-5 h-0.5 bg-gray-800 mb-1"></span>
              <span className="toggler-icon block w-5 h-0.5 bg-gray-800 mb-1"></span>
              <span className="toggler-icon block w-5 h-0.5 bg-gray-800"></span>
            </button>

            <div className={`hidden md:flex items-center space-x-8 ${mobileMenuOpen ? 'block' : 'hidden'}`} id="navbarSupportedContent6">
              <ul className="navbar-nav flex space-x-8">
                <li className="nav-item">
                  <a className="page-scroll active text-gray-800 hover:text-indigo-600 transition-colors" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll text-gray-600 hover:text-indigo-600 transition-colors" href="#feature">Feature</a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll text-gray-600 hover:text-indigo-600 transition-colors" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll text-gray-600 hover:text-indigo-600 transition-colors" href="#pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll text-gray-600 hover:text-indigo-600 transition-colors" href="#contact">Contact</a>
                </li>
              </ul>
              
              <div className="header-action flex items-center space-x-4 ml-8">
                <a href="#0" className="text-gray-600 hover:text-indigo-600">
                  <i className="lni lni-cart text-xl"></i>
                </a>
                <a href="#0" className="text-gray-600 hover:text-indigo-600">
                  <i className="lni lni-alarm text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
          style={{ backgroundImage: "url('/nova-template/assets/img/hero/hero-5/hero-bg.svg')" }}
        ></div>
        <div className="absolute inset-0 bg-white/90 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hero-content-wrapper text-center lg:text-left"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                  You're Using Free Lite Version
                </h2>
                <p className="text-lg mb-8 text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Please purchase full version of the template to get all sections and permission to use with commercial projects.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link 
                    to="/get-started" 
                    className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Get Started <i className="lni lni-chevron-right ml-2"></i>
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-block bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-full font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-image"
              >
                <img
                  src="/nova-template/assets/img/hero/hero-5/hero-img.svg"
                  alt="Hero Image"
                  className="w-full max-w-md"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="feature" className="feature-section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Specializing In</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="single-feature bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="icon mb-6 relative">
                  <i className={`lni ${feature.icon} text-3xl text-indigo-600`}></i>
                  <svg width="110" height="72" viewBox="0 0 110 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -left-4 opacity-20">
                    <path d="M110 54.7589C110 85.0014 85.3757 66.2583 55 66.2583C24.6243 66.2583 0 85.0014 0 54.7589C0 24.5164 24.6243 0 55 0C85.3757 0 110 24.5164 110 54.7589Z" fill="#EBF4FF"/>
                  </svg>
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h5>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="about-content-wrapper"
              >
                <div className="section-title mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">The future of designing starts here</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed,
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <i className="lni lni-checkmark-circle text-green-500 mt-1 mr-3"></i>
                    <span>Stop wasting time and money designing and managing a website that doesn’t get results.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="lni lni-checkmark-circle text-green-500 mt-1 mr-3"></i>
                    <span>Stop wasting time and money designing and managing.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="lni lni-checkmark-circle text-green-500 mt-1 mr-3"></i>
                    <span>Stop wasting time and money designing and managing a website that doesn’t get results.</span>
                  </li>
                </ul>
                <Link to="/about" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="about-image"
              >
                <img
                  src="/nova-template/assets/img/about/about-4/about-img.svg"
                  alt="About Image"
                  className="w-full max-w-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
              >
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Pricing Plan</h3>
                <p className="text-lg text-gray-600">
                  Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed! Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!
                </p>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <div className="pricing-active-wrapper">
                <div className="pricing-active grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`single-pricing-wrapper ${plan.featured ? 'transform scale-105 z-10' : ''}`}
                    >
                      <div className={`single-pricing bg-white p-8 rounded-xl shadow-md ${plan.featured ? 'border-2 border-indigo-500 relative' : ''}`}>
                        {plan.featured && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Popular
                          </div>
                        )}
                        <h6 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{plan.title}</h6>
                        <h4 className="text-xl font-bold mb-2 text-gray-800">{plan.subtitle}</h4>
                        <h3 className="text-3xl font-bold mb-6 text-gray-800">{plan.price}</h3>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <i className="lni lni-checkmark-circle text-green-500 mr-2"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/get-started"
                          className={`block text-center px-6 py-3 rounded-lg font-medium ${
                            plan.featured
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } transition-colors`}
                        >
                          Get Started
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Get in touch</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="contact-form-wrapper">
                <form action="#" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="single-input relative mb-6">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
                          placeholder="Name"
                        />
                        <i className="lni lni-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                    <div>
                      <div className="single-input relative mb-6">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
                          placeholder="Email"
                        />
                        <i className="lni lni-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                    <div>
                      <div className="single-input relative mb-6">
                        <input
                          type="text"
                          id="number"
                          name="number"
                          className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
                          placeholder="Number"
                        />
                        <i className="lni lni-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                    <div>
                      <div className="single-input relative mb-6">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12"
                          placeholder="Subject"
                        />
                        <i className="lni lni-text-format absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="single-input relative mb-6">
                        <textarea
                          name="message"
                          id="message"
                          className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-12 pt-3"
                          placeholder="Message"
                          rows={6}
                        ></textarea>
                        <i className="lni lni-comments-alt absolute left-4 top-4 text-gray-400"></i>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="form-button">
                        <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center">
                          <i className="lni lni-telegram-original mr-2"></i> Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="left-wrapper">
                <div className="space-y-6">
                  <div className="single-item flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="icon mr-4 mt-1">
                      <i className="lni lni-phone text-indigo-600 text-xl"></i>
                    </div>
                    <div className="text">
                      <p className="font-medium">0045939863784</p>
                      <p className="text-gray-600">+004389478327</p>
                    </div>
                  </div>
                  <div className="single-item flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="icon mr-4 mt-1">
                      <i className="lni lni-envelope text-indigo-600 text-xl"></i>
                    </div>
                    <div className="text">
                      <p className="font-medium">yourmail@gmail.com</p>
                      <p className="text-gray-600">admin@yourwebsite.com</p>
                    </div>
                  </div>
                  <div className="single-item flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="icon mr-4 mt-1">
                      <i className="lni lni-map-marker text-indigo-600 text-xl"></i>
                    </div>
                    <div className="text">
                      <p className="font-medium">John's House, 13/5 Road, Sidny United State Of America</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Logo Section */}
      <section className="clients-logo-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="client-logo text-center"
          >
            <img
              src="/nova-template/assets/img/clients/brands.svg"
              alt="Clients Logo"
              className="w-full max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="footer-widget">
              <div className="logo mb-6">
                <Link to="/">
                  <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
                </Link>
              </div>
              <p className="desc text-gray-300 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nulla placerat amet amet congue.</p>
              <ul className="socials flex space-x-4">
                <li>
                  <a href="#0" className="text-gray-300 hover:text-white">
                    <i className="lni lni-facebook-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="#0" className="text-gray-300 hover:text-white">
                    <i className="lni lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="#0" className="text-gray-300 hover:text-white">
                    <i className="lni lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="#0" className="text-gray-300 hover:text-white">
                    <i className="lni lni-linkedin-original"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-widget">
              <h6 className="text-lg font-semibold mb-6">Quick Link</h6>
              <ul className="links space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white">Service</Link>
                </li>
                <li>
                  <Link to="/testimonials" className="text-gray-300 hover:text-white">Testimonial</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget">
              <h6 className="text-lg font-semibold mb-6">Services</h6>
              <ul className="links space-y-3">
                <li>
                  <Link to="/services/web-design" className="text-gray-300 hover:text-white">Web Design</Link>
                </li>
                <li>
                  <Link to="/services/web-development" className="text-gray-300 hover:text-white">Web Development</Link>
                </li>
                <li>
                  <Link to="/services/seo" className="text-gray-300 hover:text-white">Seo Optimization</Link>
                </li>
                <li>
                  <Link to="/services/blog-writing" className="text-gray-300 hover:text-white">Blog Writing</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget">
              <h6 className="text-lg font-semibold mb-6">Download App</h6>
              <ul className="download-app space-y-4">
                <li>
                  <a href="#0" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="icon mr-3">
                      <i className="lni lni-apple text-xl"></i>
                    </span>
                    <span className="text">
                      Download on the <b>App Store</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#0" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="icon mr-3">
                      <i className="lni lni-play-store text-xl"></i>
                    </span>
                    <span className="text">
                      GET IT ON <b>Play Store</b>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright-wrapper pt-8 mt-12 border-t border-gray-700 text-center">
            <p className="text-gray-400">Design and Developed by <a href="https://uideck.com" rel="nofollow" target="_blank" className="text-indigo-400 hover:text-indigo-300">UIdeck</a> Built-with <a href="https://uideck.com" rel="nofollow" target="_blank" className="text-indigo-400 hover:text-indigo-300">Lindy UI Kit</a></p>
          </div>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="scroll-top fixed bottom-6 right-6 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <i className="lni lni-chevron-up"></i>
      </button>
    </div>
  );
};

export default NovaLandingNew;