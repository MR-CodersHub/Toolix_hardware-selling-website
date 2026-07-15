document.addEventListener('DOMContentLoaded', () => {
  // --- Header Sticky Effect ---
  const header = document.querySelector('header');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      header.classList.add('sticky');
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      header.classList.remove('sticky');
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
  });

  // --- Scroll to Top Action ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Mobile Drawer Navigation ---
  const burgerMenuBtn = document.querySelector('.burger-menu');
  const mobileNav = document.getElementById('mobileNav');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (burgerMenuBtn && mobileNav) {
    burgerMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent main page scrolling
    });
  }

  const closeMobileNav = () => {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  // --- Cart Count Demo Handler ---
  const cartBadge = document.querySelector('.cart-count');
  const addCartBtns = document.querySelectorAll('.product-add-cart, .btn-primary[data-cart]');
  let cartCount = 3; // Starting demo count

  addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartBadge.style.transform = 'scale(1)';
        }, 200);
      }

      // Visual feedback on button
      const originalText = btn.textContent;
      btn.textContent = 'ADDED!';
      btn.style.backgroundColor = '#4CAF50';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1000);
    });
  });

  // --- Scroll Reveal Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => revealOnScrollObserver.observe(el));

  // --- Countdown Timer for Special Offers ---
  const daysVal = document.getElementById('days');
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  if (daysVal && hoursVal && minutesVal && secondsVal) {
    // Set target date for 10 days from current date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysVal.textContent = days.toString().padStart(2, '0');
      hoursVal.textContent = hours.toString().padStart(2, '0');
      minutesVal.textContent = minutes.toString().padStart(2, '0');
      secondsVal.textContent = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  // --- Animated Numbers Counter (About Page) ---
  const counterElements = document.querySelectorAll('.stat-number');
  if (counterElements.length > 0) {
    const startCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 1500; // ms
      const stepTime = Math.max(Math.floor(duration / target), 15);

      const timer = setInterval(() => {
        current += Math.ceil(target / 45); // increment step matches speed
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = current + suffix;
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // --- Products Grid Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.products-grid .product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const categoryFilter = btn.getAttribute('data-category');

        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (categoryFilter === 'all' || cardCategory === categoryFilter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- Quick View Modal Functionality ---
  const quickViewModal = document.getElementById('quickViewModal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const quickViewTriggers = document.querySelectorAll('.quick-view-trigger');

  // Hardcoded product database details for quick-view details display
  const productDetailsMap = {
    '1': {
      title: 'Heavy Duty Yellow Rotary Hammer Drill',
      category: 'Power Tools',
      price: '$189.99',
      oldPrice: '$249.99',
      image: 'images/products/rotary_hammer_drill.png',
      desc: 'Achieve massive building results with our 1500W Rotary Hammer Drill. Perfect for drilling stones, bricks, wood and steel, featuring safety clutch and robust carbon brush engine to prolong performance support.',
      sku: 'PD-HD-001',
      brand: 'Atronic Pro',
      avail: 'In Stock'
    },
    '2': {
      title: 'Precision Mechanical Socket Wrench Set',
      category: 'Hand Tools',
      price: '$59.00',
      oldPrice: '$79.00',
      image: 'images/products/socket_wrench_set.png',
      desc: 'A complete set of 48 metric and standard sockets with highly durable chrome vanadium finish, robust ratchets, extension rods, and premium heavy-duty carrying box.',
      sku: 'HT-SW-902',
      brand: 'Craftsman Hub',
      avail: 'In Stock'
    },
    '3': {
      title: 'Gloss Finish High Endurance Weather Paint',
      category: 'Paints & Coatings',
      price: '$45.50',
      oldPrice: '$55.00',
      image: 'images/products/weather_paint.png',
      desc: 'All-weather maximum protection exterior acrylic latex coating paint. Fights moisture penetration, color fading, mildew, and cracks with 10 years guaranteed protection.',
      sku: 'PC-WE-341',
      brand: 'Titan Paints',
      avail: '12 Cans Left'
    },
    '4': {
      title: 'Smart Indoor Safety Distribution Panel',
      category: 'Electrical Fittings',
      price: '$120.00',
      oldPrice: '',
      image: 'images/products/distribution_panel.png',
      desc: '12-circuit consumer main boards distribution panel box with custom surge protection breaker indicators. Certified electrical components for maximum residential integrity.',
      sku: 'EF-SD-109',
      brand: 'VoltLine',
      avail: 'Out of Stock (2 weeks backorder)'
    },
    '5': {
      title: 'Professional Brushless Circular Saw 18V',
      category: 'Power Tools',
      price: '$149.99',
      oldPrice: '$179.99',
      image: 'images/products/circular_saw.png',
      desc: 'High velocity brushless circular saw cutting concrete, tiles and sheets cleanly. Equipped with LED alignment rays and precise angle adjusting locks.',
      sku: 'PD-CS-233',
      brand: 'Atronic Pro',
      avail: 'In Stock'
    },
    '6': {
      title: 'Hardened Premium Steel Anvil & Claw Hammer',
      category: 'Hand Tools',
      price: '$24.99',
      oldPrice: '$32.99',
      image: 'images/products/claw_hammer.png',
      desc: 'Premium high-density forged steel claw hammer built to resist extreme force. Ergonomic non-slip rubber grip absorbs vibrations and minimizes arm straining.',
      sku: 'HT-CH-551',
      brand: 'Hardy Tools',
      avail: 'In Stock'
    },
    '7': {
      title: 'Industrial Heavy Duty Safety Helmet & Visor',
      category: 'Safety Equipment',
      price: '$34.00',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Impact resistant outer shell helmet with full protection anti-scratch face visor shield, shock absorbing lining, and adjustable headband strap.',
      sku: 'SE-SH-778',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '8': {
      title: 'Leak-Proof Brass Ball Valve & Connection Pack',
      category: 'Plumbing Supplies',
      price: '$18.50',
      oldPrice: '$22.00',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Superb quality lead-free brass ball valve connector designed for maximum pressure pipes and domestic hot/cold plumbing integrations.',
      sku: 'PL-BV-099',
      brand: 'FlowTech',
      avail: 'In Stock'
    },
    '9': {
      title: 'Industrial Variable Speed Angle Grinder 900W',
      category: 'Power Tools',
      price: '$79.99',
      oldPrice: '$99.99',
      image: 'images/products/angle_grinder.png',
      desc: 'Achieve massive building results with our 900W Angle Grinder. Ideal for polishing metal, rust removal, and brick cutting, equipped with side handle control.',
      sku: 'PD-AG-009',
      brand: 'Atronic Pro',
      avail: 'In Stock'
    },
    '10': {
      title: 'Cordless Compact Lithium-Ion Jigsaw 20V',
      category: 'Power Tools',
      price: '$115.00',
      oldPrice: '',
      image: 'images/products/jigsaw.png',
      desc: 'Precision cutting jigsaw built lightweight with an ergonomic handle. 4 orbital position options for curved and straight lumber cuts.',
      sku: 'PD-JS-010',
      brand: 'Atronic Pro',
      avail: 'In Stock'
    },
    '11': {
      title: 'High Pressure Electric Air Compressor 10 Bar',
      category: 'Power Tools',
      price: '$245.00',
      oldPrice: '$299.00',
      image: 'images/products/air_compressor.png',
      desc: 'Powerful compressor for spray setups, tyre lines, and pneumatic tools. Incorporates dual outlet pressure indicators and 50L safety tank.',
      sku: 'PD-AC-011',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '12': {
      title: 'Heavy Duty Chrome Adjustable Wrench Set',
      category: 'Hand Tools',
      price: '$39.99',
      oldPrice: '$49.99',
      image: 'images/products/adjustable_wrench_set.png',
      desc: 'A premium pair of durable wrenches constructed for robust torque application in tight mechanical settings.',
      sku: 'HT-AW-012',
      brand: 'Craftsman Hub',
      avail: 'In Stock'
    },
    '13': {
      title: 'Magnetic Screwdriver 12pc Set',
      category: 'Hand Tools',
      price: '$19.99',
      oldPrice: '',
      image: 'images/products/screwdriver_set.png',
      desc: 'High grip handles with magnetic tip holds screws firmly. Includes precision flathead, Phillips head and extension rods.',
      sku: 'HT-MS-013',
      brand: 'Hardy Tools',
      avail: 'In Stock'
    },
    '14': {
      title: 'Multifunctional Locking Jaw Pliers Set 3pc',
      category: 'Hand Tools',
      price: '$29.50',
      oldPrice: '$35.00',
      image: 'images/products/pliers_set.png',
      desc: 'Ideal locking mechanics for clamping fittings, bolts, sheet materials. Quick release tension pull built in.',
      sku: 'HT-LP-014',
      brand: 'Hardy Tools',
      avail: 'In Stock'
    },
    '15': {
      title: 'Anti-Rust Protective Metal Primer Paint',
      category: 'Paints & Coatings',
      price: '$32.00',
      oldPrice: '',
      image: 'images/products/metal_primer_paint.png',
      desc: 'Specifically formulated primer coat to repel oxidation and base humidity, perfect for exterior railings and sheet steels.',
      sku: 'PC-MP-015',
      brand: 'Titan Paints',
      avail: '15 Cans Left'
    },
    '16': {
      title: 'Premium Ceiling Quick-Dry Matte White Emulsion',
      category: 'Paints & Coatings',
      price: '$38.99',
      oldPrice: '$45.00',
      image: 'images/products/ceiling_emulsion_paint.png',
      desc: 'Super high opacity ceiling paint keeping room spaces bright. Features splatter resistance and low odor compounds.',
      sku: 'PC-WE-016',
      brand: 'Titan Paints',
      avail: 'In Stock'
    },
    '17': {
      title: 'Eco-Friendly Wood Polish Lacquer',
      category: 'Paints & Coatings',
      price: '$42.00',
      oldPrice: '',
      image: 'images/products/wood_polish_lacquer.png',
      desc: 'Enhances wood grain beauty while providing a tough liquid resistant surface. Biodegradable and low VOC.',
      sku: 'PC-WP-017',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '18': {
      title: 'Specialized Concrete Floor Epoxy Paint Pack',
      category: 'Paints & Coatings',
      price: '$89.99',
      oldPrice: '$110.00',
      image: 'images/products/floor_epoxy_paint.png',
      desc: 'Heavy duty epoxy coating resilient to car tires, machine traffic and drops. Ideal for garage floors.',
      sku: 'PC-CF-018',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '19': {
      title: 'Copper Core Insulated Wire Roll 100m',
      category: 'Electrical Fittings',
      price: '$45.00',
      oldPrice: '$55.00',
      image: 'images/products/copper_wire.png',
      desc: 'Low resistance high conductivity copper wires for wall conduits and industrial switch arrays.',
      sku: 'EF-CW-019',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '20': {
      title: 'Waterproof Outdoor Switch Box',
      category: 'Electrical Fittings',
      price: '$15.99',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Heavy housing switch rated IP66 for outdoor protection against torrential rain storms and garden dust.',
      sku: 'EF-OS-020',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '21': {
      title: 'Auto-Reset Miniature Circuit Breakers 6-Pack',
      category: 'Electrical Fittings',
      price: '$28.50',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Smart power tripping regulators preventing home appliance hazards and wiring overcurrent limits.',
      sku: 'EF-CB-021',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '22': {
      title: 'Heavy Duty Voltage Surge Protector Strip',
      category: 'Electrical Fittings',
      price: '$34.99',
      oldPrice: '$42.00',
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=600&h=600&q=80',
      desc: '10 outlet extension with automatic surge filter indicators protecting computers and entertainment electronics.',
      sku: 'EF-SP-022',
      brand: 'VoltLine',
      avail: 'In Stock'
    },
    '23': {
      title: 'High-Visibility Reflective Safety Vest',
      category: 'Safety Equipment',
      price: '$12.50',
      oldPrice: '$16.00',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Fluorescent neon vest with broad reflective strips for night operations on construction sites.',
      sku: 'SE-RV-023',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '24': {
      title: 'Steel Toe Waterproof Safety Boots',
      category: 'Safety Equipment',
      price: '$65.00',
      oldPrice: '$79.99',
      image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Rigid puncture resistant sole with steel cap toe ensuring heavy component drops protect user feet.',
      sku: 'SE-SB-024',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '25': {
      title: 'Safety Protective Eyewear',
      category: 'Safety Equipment',
      price: '$8.99',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Clear polycarbonate safety glasses with wrap-around shielding against flying wood shards or dust particles.',
      sku: 'SE-PE-025',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '26': {
      title: 'Premium Double-Filter Respirator Mask',
      category: 'Safety Equipment',
      price: '$24.50',
      oldPrice: '$30.00',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Dual chemical filter respirator mask preventing inhalation of paint particles, dust, and toxic fumes.',
      sku: 'SE-RM-026',
      brand: 'SureGuard',
      avail: 'In Stock'
    },
    '27': {
      title: 'Flex-Shield Braided Stainless Water Hose',
      category: 'Plumbing Supplies',
      price: '$21.99',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Durable reinforced hose for high pressure sinks, bath basins and modern faucets connections.',
      sku: 'PL-WH-027',
      brand: 'FlowTech',
      avail: 'In Stock'
    },
    '28': {
      title: 'Pro-Lock PVC Pipe Weld Solvent Adhesive',
      category: 'Plumbing Supplies',
      price: '$9.99',
      oldPrice: '$12.50',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Industrial grade liquid welder creating leak-proof joints on heavy PVC tubes and drain fittings.',
      sku: 'PL-WA-028',
      brand: 'FlowTech',
      avail: 'In Stock'
    },
    '29': {
      title: 'Solid Brass Chrome Kitchen Mixer Faucet',
      category: 'Plumbing Supplies',
      price: '$85.00',
      oldPrice: '$110.00',
      image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Designer heavy chrome faucet with dual temperature knobs and flexible multi-directional faucet hose.',
      sku: 'PL-KF-029',
      brand: 'FlowTech',
      avail: 'In Stock'
    },
    '30': {
      title: 'Heavy Duty Cast Iron Pipe Wrench 14"',
      category: 'Plumbing Supplies',
      price: '$27.50',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1611024847487-e26177381a3f?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Robust serrated jaw wrench with sliding adjustment collar, ideal for water main pipes and valves hooks.',
      sku: 'PL-PW-030',
      brand: 'FlowTech',
      avail: 'In Stock'
    }
  };

  if (quickViewModal && quickViewTriggers.length > 0) {
    quickViewTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const pId = trigger.getAttribute('data-id');
        const details = productDetailsMap[pId];

        if (details) {
          // Inject content
          quickViewModal.querySelector('.modal-category').textContent = details.category;
          quickViewModal.querySelector('.modal-title').textContent = details.title;
          quickViewModal.querySelector('.modal-price').innerHTML = details.price + (details.oldPrice ? ` <span>${details.oldPrice}</span>` : '');
          quickViewModal.querySelector('.modal-desc').textContent = details.desc;
          quickViewModal.querySelector('.modal-gallery img').setAttribute('src', details.image);

          quickViewModal.querySelector('.sku-val').textContent = details.sku;
          quickViewModal.querySelector('.brand-val').textContent = details.brand;
          quickViewModal.querySelector('.avail-val').textContent = details.avail;

          // Color text on Availability
          const availEl = quickViewModal.querySelector('.avail-val');
          if (details.avail.includes('In Stock')) {
            availEl.style.color = '#4CAF50';
          } else if (details.avail.includes('Left') || details.avail.includes('backorder')) {
            availEl.style.color = '#F4B400';
          } else {
            availEl.style.color = '#E53935';
          }

          // Open Modal
          quickViewModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  const closeModal = () => {
    if (quickViewModal) {
      quickViewModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        closeModal();
      }
    });
  }

  // --- Contact Form Submission & Validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const msg = document.getElementById('message').value.trim();
      const feedback = document.getElementById('formFeedback');

      if (!name || !email || !msg) {
        if (feedback) {
          feedback.textContent = '❌ Please fill out all required fields marked with (*).';
          feedback.style.color = '#E53935';
        }
        return;
      }

      // Quick Email regex regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.textContent = '❌ Please enter a valid email address.';
          feedback.style.color = '#E53935';
        }
        return;
      }

      // Success Display (Mock)
      if (feedback) {
        feedback.textContent = '⏱️ Processing your request...';
        feedback.style.color = '#F4B400';
      }

      setTimeout(() => {
        if (feedback) {
          feedback.innerHTML = `🏆 <strong>Success!</strong> Thank you ${name}. Your message has been sent to our Contractor support desk. We will review and reply within 2 working hours.`;
          feedback.style.color = '#4CAF50';
        }
        contactForm.reset();
      }, 1500);
    });
  }

  // --- Newsletter Form Submission ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const val = input.value.trim();
      if (val) {
        alert(`Thank you for subscribing to Toolix Tools alerts: ${val}`);
        input.value = '';
      }
    });
  });

  // --- FAQ Accordion Toggle Hook ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const activeItem = document.querySelector('.faq-item.active');
      if (activeItem && activeItem !== parent) {
        activeItem.classList.remove('active');
      }
      parent.classList.toggle('active');
    });
  });

  // --- Dark Mode / Light Mode Toggle logic ---
  const currentTheme = localStorage.getItem('toolix-theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    setTimeout(() => toggleThemeIcons(true), 0);
  }

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('toolix-theme', isDark ? 'dark' : 'light');
      toggleThemeIcons(isDark);
    });
  }

  function toggleThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    sunIcons.forEach(i => i.style.display = isDark ? 'block' : 'none');
    moonIcons.forEach(i => i.style.display = isDark ? 'none' : 'block');
  }

  // --- RTL / LTR Toggle logic ---
  const currentDir = localStorage.getItem('toolix-dir') || 'ltr';
  if (currentDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const newDir = isRtl ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('toolix-dir', newDir);
    });
  }

  // --- Premium Sliding Navigation Highlight Background ---
  const desktopNav = document.querySelector('.desktop-nav');
  if (desktopNav) {
    const navLinks = desktopNav.querySelector('.nav-links');
    if (navLinks) {
      // Create sliding pill highlight element
      const pill = document.createElement('div');
      pill.className = 'nav-hover-pill';
      navLinks.appendChild(pill);

      const items = navLinks.querySelectorAll('li');
      const activeItem = navLinks.querySelector('li.active');

      const positionPill = (item) => {
        if (!item) {
          pill.style.opacity = '0';
          pill.style.transform = 'scale(0.8)';
          return;
        }
        const itemRect = item.getBoundingClientRect();
        const parentRect = navLinks.getBoundingClientRect();

        pill.style.left = `${itemRect.left - parentRect.left}px`;
        pill.style.width = `${itemRect.width}px`;
        pill.style.height = `${itemRect.height}px`;
        pill.style.opacity = '1';
        pill.style.transform = 'scale(1)';
      };

      // Set initial position on active page link
      if (activeItem) {
        setTimeout(() => positionPill(activeItem), 50);
      } else {
        pill.style.opacity = '0';
        pill.style.transform = 'scale(0.8)';
      }

      // Add mouse events for smooth slide highlight transitions
      items.forEach(item => {
        item.addEventListener('mouseenter', () => positionPill(item));
        item.addEventListener('mouseleave', () => {
          if (activeItem) {
            positionPill(activeItem);
          } else {
            positionPill(null);
          }
        });
      });

      // Reposition on window resize or RTL switch
      window.addEventListener('resize', () => {
        if (activeItem) positionPill(activeItem);
      });

      if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
          setTimeout(() => {
            if (activeItem) positionPill(activeItem);
          }, 150); // slight delay to allow direction change execution
        });
      }
    }
  }

  // --- User Account Dropdown logic ---
  const userAccountBtn = document.getElementById('userAccountBtn');
  const userDropdown = document.getElementById('userDropdown');
  if (userAccountBtn && userDropdown) {
    userAccountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && e.target !== userAccountBtn) {
        userDropdown.classList.remove('open');
      }
    });

    // Prevent closing when clicking dropdown itself
    userDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});
