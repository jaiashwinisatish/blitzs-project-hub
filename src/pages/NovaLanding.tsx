import { useState } from 'react';
import { Link } from 'react-router-dom';

const NovaLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header header-6 sticky top-0 z-50 bg-white shadow-sm">
        <div className="navbar-area">
          <div className="container mx-auto px-4">
            <div className="row align-items-center">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg">
                  <Link to="/" className="navbar-brand">
                    <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
                  </Link>
                  <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-controls="navbarSupportedContent6" 
                    aria-expanded={mobileMenuOpen} 
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>

                  <div className={`collapse navbar-collapse sub-menu-bar ${mobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent6">
                    <ul id="nav6" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="page-scroll active" href="#home">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#feature">Feature</a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#about">About</a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#pricing">Pricing</a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#contact">Contact</a>
                      </li>
                    </ul>
                  </div>

                  <div className="header-action d-flex hidden md:block">
                    <a href="#0" className="mr-4"> 
                      <i className="lni lni-cart"></i> 
                    </a>
                    <a href="#0"> 
                      <i className="lni lni-alarm"></i> 
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section-wrapper-5">
        <div className="hero-section hero-style-5 bg-cover bg-center py-20 md:py-32" style={{ backgroundImage: "url('/nova-template/assets/img/hero/hero-5/hero-bg.svg')" }}>
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="hero-content-wrapper">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">You're Using Free Lite Version</h2>
                  <p className="text-lg mb-8 text-gray-600">Please purchase full version of the template to get all sections and permission to use with commercial projects.</p>
                  <Link to="/get-started" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                    Get Started <i className="lni lni-chevron-right ml-2"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 align-self-end hidden md:block">
                <div className="hero-image">
                  <img 
                    src="/nova-template/assets/img/hero/hero-5/hero-img.svg" 
                    alt="Hero Image" 
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="feature" className="feature-section feature-style-5 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="row justify-center mb-16">
            <div className="col-xxl-5 col-xl-5 col-lg-7 col-md-8 text-center">
              <div className="section-title">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Specializing In</h3>
                <p className="text-lg text-gray-600">Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</p>
              </div>
            </div>
          </div>

          <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="single-feature bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section about-style-4 py-20">
        <div className="container mx-auto px-4">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6 mb-12 md:mb-0">
              <div className="about-content-wrapper">
                <div className="section-title mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">The future of designing starts here</h3>
                  <p className="text-lg text-gray-600">Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed,</p>
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
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="about-image text-center">
                <img 
                  src="/nova-template/assets/img/about/about-4/about-img.svg" 
                  alt="About Image" 
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section pricing-style-4 bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="row align-items-center mb-16">
            <div className="col-xl-5 col-lg-6 mb-12 md:mb-0">
              <div className="section-title">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Pricing Plan</h3>
                <p className="text-lg text-gray-600">Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="pricing-active-wrapper">
                <div className="pricing-active grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricingPlans.map((plan, index) => (
                    <div key={index} className={`single-pricing-wrapper ${plan.featured ? 'transform scale-105 z-10' : ''}`}>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section contact-style-3 py-20">
        <div className="container mx-auto px-4">
          <div className="row justify-center mb-16">
            <div className="col-xxl-5 col-xl-5 col-lg-7 col-md-10 text-center">
              <div className="section-title">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Get in touch</h3>
                <p className="text-lg text-gray-600">Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</p>
              </div>
            </div>
          </div>
          <div className="row flex flex-col md:flex-row gap-12">
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <form action="#" method="POST">
                  <div className="row grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-12">
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
                    <div className="col-md-12">
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

            <div className="col-lg-4">
              <div className="left-wrapper">
                <div className="row space-y-6">
                  <div className="col-lg-12 col-md-6">
                    <div className="single-item flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="icon mr-4 mt-1">
                        <i className="lni lni-phone text-indigo-600 text-xl"></i>
                      </div>
                      <div className="text">
                        <p className="font-medium">0045939863784</p>
                        <p className="text-gray-600">+004389478327</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="single-item flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="icon mr-4 mt-1">
                        <i className="lni lni-envelope text-indigo-600 text-xl"></i>
                      </div>
                      <div className="text">
                        <p className="font-medium">yourmail@gmail.com</p>
                        <p className="text-gray-600">admin@yourwebsite.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
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
        </div>
      </section>

      {/* Clients Logo Section */}
      <section className="clients-logo-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="client-logo text-center">
                <img 
                  src="/nova-template/assets/img/clients/brands.svg" 
                  alt="Clients Logo" 
                  className="w-full max-w-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-style-4 bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="widget-wrapper">
            <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
          </div>
          <div className="copyright-wrapper pt-8 mt-12 border-t border-gray-700 text-center">
            <p className="text-gray-400">Design and Developed by <a href="https://uideck.com" rel="nofollow" target="_blank" className="text-indigo-400 hover:text-indigo-300">UIdeck</a> Built-with <a href="https://uideck.com" rel="nofollow" target="_blank" className="text-indigo-400 hover:text-indigo-300">Lindy UI Kit</a></p>
          </div>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <a href="#" className="scroll-top fixed bottom-6 right-6 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50">
        <i className="lni lni-chevron-up"></i>
      </a>
    </div>
  );
};

export default NovaLanding;