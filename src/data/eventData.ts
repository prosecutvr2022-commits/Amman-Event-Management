import { EventService, GalleryItem, Testimonial } from '../types';

export const BRAND_INFO = {
  businessName: 'AMMAN EVENT MANAGEMENT',
  tamilName: 'அம்மன் ஈவென்ட் மேனேஜ்மென்ட்',
  plannerName: 'J. Balamurugan',
  title: 'Event Planner',
  tagline: 'WE UNDERTAKE',
  heroHeadline: 'Your Vision. Our Planning. An Unforgettable Event.',
  supportingHeadline: 'WE UNDERTAKE ALL TYPES OF EVENTS',
  heroCopy: 'From weddings and birthdays to corporate events, product launches and destination celebrations, we plan, coordinate and create memorable experiences with attention to every detail.',
  location: {
    address: 'Vittukatti, Thiruthuraipoondi',
    pincode: '614 715',
    full: 'Vittukatti, Thiruthuraipoondi - 614 715, Tamil Nadu',
    district: 'Tiruvarur District'
  },
  phone: '95245 16821',
  phoneFormatted: '+91 95245 16821',
  phoneRaw: '+919524516821',
  whatsappUrl: 'https://wa.me/919524516821?text=Hi%20Amman%20Event%20Management%2C%20I%20would%20like%20to%20enquire%20about%20event%20planning%20services.',
  instagramHandle: '@AMMAN_EVENT_TTP',
  instagramUrl: 'https://instagram.com/AMMAN_EVENT_TTP',
  facebookPresence: 'Amman Event Management',
  youtubePresence: 'Amman Event TTP',
  googleReviewsUrl: 'https://www.google.com/search?q=amman+event+management&oq=amman+event+&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyCggAEEUYFhgeGDkyBwgBEAAYgAQyCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yBggFEEUYPDIGCAYQRRg8MgYIBxBFGD3SAQkxMTM4OGowajeoAgiwAgHxBQVyP2I7sNVF&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3a555b0007c843ef:0x1733f24a268ef0a7,1,,,,',
};

// All 17 exact services from the attached banner grouped into 4 intelligent categories
export const ALL_SERVICES: EventService[] = [
  // 1. WEDDINGS & CELEBRATIONS
  {
    id: 'wedding',
    name: 'Wedding',
    category: 'weddings',
    shortDesc: 'Complete traditional and contemporary South Indian wedding planning, stage decor, and guest hospitality.',
    fullDesc: 'End-to-end luxury wedding management encompassing Muhurtham decor, reception stages, lighting, floral arrangements, ritual coordination, guest escorting, and seamless event flow.',
    highlight: 'Grand Stage Decor & Full Coordination',
    iconName: 'Heart',
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    features: ['Custom Mandapam Decor', 'Lighting & Sound Rig', 'Bride & Groom Stage', 'Ritual Coordination', 'Family Hospitality']
  },
  {
    id: 'destination-wedding',
    name: 'Destination Wedding',
    category: 'weddings',
    shortDesc: 'Bespoke destination celebrations across Tamil Nadu and premier resort locations with full logistics.',
    fullDesc: 'We handle venue sourcing, guest accommodation, scenic outdoor mandapams, beachside/resort setups, transport, and multi-day ceremonies effortlessly.',
    highlight: 'Curated Venues & Seamless Logistics',
    iconName: 'Compass',
    bgGradient: 'from-blue-950/60 via-slate-900 to-slate-950',
    features: ['Resort & Heritage Venues', 'Guest Transit & Rooms', 'Multi-day Itinerary', 'Scenic Mandap Setup', 'Dedicated On-site Leads']
  },
  {
    id: 'birthday-parties',
    name: 'Birthday Parties',
    category: 'weddings',
    shortDesc: 'Spectacular 1st birthday themes, milestone celebrations, and family birthday parties with customized backdrops.',
    fullDesc: 'From whimsical fairytale themes and animated balloon decor to DJ, magic shows, themed cake-cutting stages, and custom return gifts for children and guests.',
    highlight: 'Creative Themes & Festive Fun',
    iconName: 'Sparkles',
    bgGradient: 'from-rose-950/60 via-slate-900 to-slate-950',
    features: ['Custom Themed Backdrops', 'Balloon & Floral Styling', 'Kids Entertainment & MC', 'Themed Dessert Tables', 'Return Gift Hampers']
  },
  {
    id: 'special-occasions',
    name: 'Special Occasions',
    category: 'weddings',
    shortDesc: 'Housewarming, Ayushya Homam, 60th/80th Sashtiapthapoorthi, and intimate family milestones.',
    fullDesc: 'Honoring tradition with reverence and modern elegance. We craft serene pooja and ceremonial settings with authentic floral decorations, seating, and welcoming ambience.',
    highlight: 'Traditional Sacred Ambience',
    iconName: 'Gem',
    bgGradient: 'from-yellow-950/60 via-slate-900 to-slate-950',
    features: ['Sashtiapthapoorthi & Sadhabishekam', 'Grihapravesam Styling', 'Pooja Mandap Setup', 'Traditional Seating', 'Catering Integration']
  },
  {
    id: 'surprise-events',
    name: 'Surprise Events',
    category: 'weddings',
    shortDesc: 'Heartfelt surprise birthdays, wedding anniversaries, proposals, and family reunions executed discreetly.',
    fullDesc: 'Secret coordination, dramatic reveals, flash decors, custom audio-visual retrospectives, and personalized emotional moments crafted to perfection.',
    highlight: 'Discreet Planning & Perfect Reveals',
    iconName: 'Gift',
    bgGradient: 'from-purple-950/60 via-slate-900 to-slate-950',
    features: ['Secret Venue Preparation', 'Romantic Candlelight / Neon Decor', 'Live Musicians / Soloists', 'Photographer in Hiding', 'Emotional Video Highlights']
  },

  // 2. CORPORATE & BRAND EVENTS
  {
    id: 'corporate-events',
    name: 'Corporate Events',
    category: 'corporate',
    shortDesc: 'Annual general meetings, executive summits, dealer meets, conferences, and gala award nights.',
    fullDesc: 'Professional conference engineering with high-definition LED video walls, precision sound, branded podiums, stage lighting, and professional delegate coordination.',
    highlight: 'Professional AV & Precision Scheduling',
    iconName: 'Award',
    bgGradient: 'from-blue-950/60 via-slate-900 to-slate-950',
    features: ['LED Backdrops & Presentation AV', 'Branded Stage Setup', 'Delegate Registration Desk', 'Award Night Trophies & Flow', 'Formal Dinner Logistics']
  },
  {
    id: 'product-launches',
    name: 'Product Launches',
    category: 'corporate',
    shortDesc: 'Impactful unveiling experiences with dramatic curtain drops, pyrotechnics, and lighting sequences.',
    fullDesc: 'Commanding launches designed for press, VIPs, and consumers. High-energy stage reveals, thematic entrance archways, and immersive brand storytelling.',
    highlight: 'High-Impact Reveal Engineering',
    iconName: 'Eye',
    bgGradient: 'from-indigo-950/60 via-slate-900 to-slate-950',
    features: ['Dramatic Reveal Mechanism', 'Press & Media Backdrop', 'Sound & Light Sync', 'Demo Zones & Podiums', 'Influencer/VIP Management']
  },
  {
    id: 'brand-promotions',
    name: 'Brand Promotions',
    category: 'corporate',
    shortDesc: 'Experiential marketing activations, mall roadshows, promotional stalls, and canopy displays.',
    fullDesc: 'Engage target audiences across Thiruthuraipoondi, Tiruvarur, and statewide. Custom promotional kiosks, printed collaterals, trained promoters, and sound setups.',
    highlight: 'High Footfall & Brand Visibility',
    iconName: 'Share2',
    bgGradient: 'from-cyan-950/60 via-slate-900 to-slate-950',
    features: ['Custom Promotional Kiosks', 'Roadshow & Mobile Floats', 'Promoter Sourcing & Uniforms', 'Customer Engagement Activities', 'High-Visibility Signage']
  },
  {
    id: 'celebrity-events',
    name: 'Celebrity Events',
    category: 'corporate',
    shortDesc: 'Chief guest coordination, VIP hospitality, celebrity appearances, and high-security protocols.',
    fullDesc: 'Seamless coordination for film personalities, political dignitaries, and public figures. Includes green rooms, secure passage, stage protocol, and media management.',
    highlight: 'VIP Protocol & Hospitality',
    iconName: 'Star',
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    features: ['Green Room & VIP Suite', 'Security & Crowd Management', 'Stage Appearance Timing', 'Media Briefing Zone', 'Bouquets & Traditional Honors']
  },

  // 3. CREATIVE & THEMED EVENTS
  {
    id: 'theme-events',
    name: 'Theme Events',
    category: 'creative',
    shortDesc: 'Immersive conceptual decors ranging from royal palace grandeur to retro, Bollywood, or neon festivals.',
    fullDesc: 'Total environmental transformation with customized props, architectural lighting, entrance walkways, ceiling drapes, and interactive photo installations.',
    highlight: '360° Immersive Concept Environments',
    iconName: 'Sparkles',
    bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
    features: ['Custom Fabricated Props', 'Entrance Passage Themes', 'Lighting Color Washes', 'Selfie & Photo Booth Zones', 'Synchronized Soundtrack']
  },
  {
    id: 'social-events',
    name: 'Social Events',
    category: 'creative',
    shortDesc: 'College fests, cultural sangams, club gatherings, community celebrations, and festive melas.',
    fullDesc: 'Vibrant community gathering infrastructure with stage audio, seating for thousands, food stalls layout, power backups, and seamless crowd movement.',
    highlight: 'Large-scale Community Infrastructure',
    iconName: 'Users',
    bgGradient: 'from-sky-950/60 via-slate-900 to-slate-950',
    features: ['Mass Seating & Shamiyana', 'High-Output Line-Array Sound', 'Safety & Emergency Exits', 'Stall & Vendor Demarcation', 'Live Announcements & Anchor']
  },
  {
    id: 'entertainments',
    name: 'Entertainments',
    category: 'creative',
    shortDesc: 'Live music bands, DJ nights, classical dance troupes, mimicry artists, and stage performances.',
    fullDesc: 'Curated entertainment line-ups that keep audiences enthralled. We book trusted artists, handle technical riders, sound checks, and stage direction.',
    highlight: 'Top Artists & Live Stage Shows',
    iconName: 'Music',
    bgGradient: 'from-violet-950/60 via-slate-900 to-slate-950',
    features: ['Live Orchestra & Fusion Bands', 'DJ & Dance Floor Lighting', 'Traditional Folk & Classical Dance', 'Professional Emcees / Anchors', 'Stand-up & Mimicry Shows']
  },

  // 4. COMPLETE EVENT SERVICES
  {
    id: 'catering-services',
    name: 'Catering Services',
    category: 'complete',
    shortDesc: 'Delectable South Indian traditional banana leaf feasts, multi-cuisine buffets, and live counters.',
    fullDesc: 'Hygienic, mouthwatering culinary experiences prepared by seasoned chefs. From traditional Kalyana Virundhu with payasam varieties to modern live chaat and dessert bars.',
    highlight: 'Authentic Traditional Feasts & Buffets',
    iconName: 'Utensils',
    bgGradient: 'from-orange-950/60 via-slate-900 to-slate-950',
    features: ['Traditional Elai Sappadu', 'Modern Multi-Cuisine Buffets', 'Live Dosai & Chaat Counters', 'Beverages & Mocktail Bars', 'Courteous Uniformed Servers']
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    category: 'complete',
    shortDesc: 'Candid photography, cinematic wedding teasers, 4K multi-cam coverage, and drone captures.',
    fullDesc: 'Preserving every fleeting emotion with artistic lenses. Includes pre-wedding shoots, live YouTube/LED streaming, traditional photo albums, and same-day highlight reels.',
    highlight: 'Cinematic 4K & Candid Storytelling',
    iconName: 'Camera',
    bgGradient: 'from-blue-950/60 via-slate-900 to-slate-950',
    features: ['Candid & Traditional Coverage', 'Cinematic Wedding Films', 'Drone Aerial Footage', 'Live LED & Web Streaming', 'Luxury Embossed Albums']
  },
  {
    id: 'wedding-invitation',
    name: 'Wedding Invitation',
    category: 'complete',
    shortDesc: 'Custom luxury printed invitations, gold-foil cards, box invitations, and animated digital e-invites.',
    fullDesc: 'First impressions matter. We design and deliver bespoke wedding stationery, traditional Tamil devotional formats, modern laser-cut cards, and WhatsApp video invitations.',
    highlight: 'Bespoke Stationery & Digital Invites',
    iconName: 'Gift',
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    features: ['Gold-foil & Embossed Cards', 'Bespoke Box Invitations', 'Animated Video E-invites', 'Tamil & English Typography', 'Custom Wax Seal Detailing']
  },
  {
    id: 'thamboolam-bags',
    name: 'Thamboolam Bags',
    category: 'complete',
    shortDesc: 'Elegant customized Thamboolam gift bags in jute, silk, cotton, and customized brand prints.',
    fullDesc: 'Thoughtfully curated return gift bags for guests. Premium eco-friendly jute bags, brocade pouches, printed couple names, and customized gift inclusions.',
    highlight: 'Premium Traditional Return Gifts',
    iconName: 'Gift',
    bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
    features: ['Custom Screen & Foil Printing', 'Eco-friendly Jute & Cotton Bags', 'Silk & Brocade Potli Bags', 'Bulk Packaging Delivery', 'Curated Return Gift Items']
  },
  {
    id: 'chenda-melam',
    name: 'Chenda Melam',
    category: 'complete',
    shortDesc: 'Energetic traditional Kerala & Tamil Nadu percussion troupes for grand Baraat and temple entries.',
    fullDesc: 'Infuse high spiritual energy and royal grandeur into weddings and temple processions. Master Chenda, Ilathalam, and Kombu artists in authentic traditional attire.',
    highlight: 'Authentic Royal Percussion Troupe',
    iconName: 'Music',
    bgGradient: 'from-red-950/60 via-slate-900 to-slate-950',
    features: ['Grand Wedding Processions', 'Traditional Kasavu Uniforms', 'Panchari & Pandi Melam Artists', 'Kombu & Thavil Combinations', 'Unmatched Festive Euphoria']
  },

  // NEW DEDICATED WEDDING & EVENT SERVICES
  {
    id: 'violin-program',
    name: 'Violin Program',
    category: 'creative',
    shortDesc: 'Soul-stirring classical, Carnatic fusion, and romantic film violin recitals for receptions and muhurthams.',
    fullDesc: 'Elevate your event ambiance with melodious acoustic and electric violin performances. Master violin virtuosos perform classical ragas, Carnatic fusion, and evergreen instrumental melodies accompanied by rhythm artists.',
    highlight: 'Melodious Classical & Fusion Recital',
    iconName: 'Music',
    bgGradient: 'from-purple-950/60 via-slate-900 to-slate-950',
    features: ['Acoustic & Electric Violin Sets', 'Carnatic & Film Melodies Fusion', 'Reception Stage Ambiance', 'Dedicated Audio Tuning', 'Soloists & Ensemble Formats']
  },
  {
    id: 'melam-nadhasvaram',
    name: 'Melam & Nadhasvaram',
    category: 'complete',
    shortDesc: 'Auspicious traditional Mangala Vathiyam with master Nadhasvaram & Thavil vidwans for sacred muhurtham and baraat.',
    fullDesc: 'Traditional South Indian wedding music heralding divine blessings. Experienced vidwans deliver resonant auspicious ragas throughout the groom procession, Kasi Yatra, and sacred Thali tying Muhurtham.',
    highlight: 'Auspicious Mangala Vathiyam & Thavil',
    iconName: 'Music',
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    features: ['Master Nadhasvaram & Thavil Vidwans', 'Kasi Yatra & Jaanavasam Melam', 'Sacred Muhurtham Ragas', 'Temple & Hall Processions', 'Traditional Silk Ponnada Attire']
  },
  {
    id: 'aiyar',
    name: 'Aiyar',
    category: 'weddings',
    shortDesc: 'Experienced Vedic Vadhyar & Purohit services for authentic Hindu wedding rituals, Homam, and sacred ceremonies.',
    fullDesc: 'Complete traditional ritual guidance by knowledgeable Vedic priests following proper sastras and family customs. Includes Ganapathi Homam, Navagraha Pooja, Kanyadaanam, and Mangalya Dharanam coordination.',
    highlight: 'Vedic Vadhyar & Sacred Rituals',
    iconName: 'Sparkles',
    bgGradient: 'from-orange-950/60 via-slate-900 to-slate-950',
    features: ['Learned Vedic Vadhyar / Purohits', 'Ganapathi & Navagraha Homam', 'Muhurtham Sastra Guidance', 'Sacred Pooja Samagri Coordination', 'Family Tradition Adherence']
  },
  {
    id: 'manamakal-malai',
    name: 'Manamakal Malai',
    category: 'weddings',
    shortDesc: 'Handcrafted luxury wedding garlands (Varmala) made with fresh exotic roses, fragrant jasmine, and gold zari detailing.',
    fullDesc: 'Exquisite bridal and groom wedding garlands crafted with utmost devotion and artistry. Bespoke designs including layered Dutch rose petal malai, scented Madurai malli, lotus buds, and lightweight feather-soft knotting.',
    highlight: 'Bespoke Bridal & Groom Garlands',
    iconName: 'Heart',
    bgGradient: 'from-rose-950/60 via-slate-900 to-slate-950',
    features: ['Fresh Dutch Rose & Jasmine Malai', 'Custom Color Themes Matching Attire', 'Lightweight & Comfortable Wear', 'Lotus & Orchid Specialty Garlands', 'On-time Fresh Mandap Delivery']
  },
  {
    id: 'arkestra-music',
    name: 'Arkestra Music',
    category: 'creative',
    shortDesc: 'Grand live wedding orchestra, celebrity playback singers, dynamic keyboard, rhythm pads, and stage musical night.',
    fullDesc: 'Full-fledged live musical troupe delivering high-voltage entertainment for sangeet, reception, and gala celebrations. Professional singers, energetic anchors, live rhythm section, and retro-to-latest hit songs customized to family preferences.',
    highlight: 'High-Energy Live Stage Orchestra',
    iconName: 'Music',
    bgGradient: 'from-indigo-950/60 via-slate-900 to-slate-950',
    features: ['Multi-Singer Live Troupe', 'Dynamic Live Sound & Digital Console', 'Bilingual Song Repertoire', 'Crowd-Engaging Stage Anchors', 'Custom Playlist & Requests']
  },
  {
    id: 'food-stall',
    name: 'Food Stall',
    category: 'complete',
    shortDesc: 'Interactive live wedding food counters featuring Delhi chaat, hot dosas, kulfi, mocktails, and sweet treats.',
    fullDesc: 'Delight your guests with live culinary theater. Vibrant specialty food stalls including chaat counters, mini dosai varieties, popping corn, artisanal ice creams, chocolate fountain, and traditional herbal hot tea & filter coffee bars.',
    highlight: 'Live Gourmet Food & Snack Counters',
    iconName: 'Utensils',
    bgGradient: 'from-yellow-950/60 via-slate-900 to-slate-950',
    features: ['Live Dosa & Chaat Counters', 'Traditional Kumbakonam Degree Coffee', 'Kulfi, Ice Cream & Dessert Stalls', 'Popcorn & Cotton Candy for Kids', 'Hygienic Uniformed Live Chefs']
  },
  {
    id: 'horse-chariot',
    name: 'Horse Chariot',
    category: 'weddings',
    shortDesc: 'Majestic royal horse-drawn carriage (Sarath) and decorated white horse for royal groom entrance & Baraat.',
    fullDesc: 'Make an unforgettable grand entrance with our ornate royal horse chariot. Handcrafted golden carriage with illuminated fairy lights, floral crests, disciplined trained white horses, and royal costumed charioteers.',
    highlight: 'Royal Horse Carriage & Grand Baraat',
    iconName: 'Award',
    bgGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    features: ['Regal Golden Sarath Carriage', 'Gentle & Well-Trained White Horses', 'Traditional Charioteer Uniforms', 'Floral & LED Carriage Decor', 'Spectacular Baraat Entrance Photos']
  },
  {
    id: 'mack-up',
    name: 'Mack Up',
    category: 'weddings',
    shortDesc: 'Professional bridal makeup, HD airbrush makeover, traditional saree draping, mehendi, and hair styling.',
    fullDesc: 'Flawless bridal transformations by certified makeup artists. Tailored to enhance natural beauty for Muhurtham and Reception with high-definition sweat-proof cosmetics, intricate floral jadai hairdos, and perfect silk saree pleating.',
    highlight: 'Luxury HD Bridal Makeup & Styling',
    iconName: 'Sparkles',
    bgGradient: 'from-pink-950/60 via-slate-900 to-slate-950',
    features: ['HD & Airbrush Bridal Makeover', 'Long-Lasting Water-Resistant Finish', 'Traditional Muhurtham Jadai & Styling', 'Expert Silk Saree Draping', 'Pre-Bridal Trials & Consultation']
  },
  {
    id: 'bridal-groom',
    name: 'Bridal & Groom',
    category: 'weddings',
    shortDesc: 'Exclusive bride & groom entry concepts, floral chadars, sparkler walkways, couture styling & personal assistants.',
    fullDesc: 'Turn your couple moments into breathtaking cinematic experiences. We coordinate dramatic bridal entry under floral umbrellas, cold pyrotechnic tunnels, couple costume color coordination, and dedicated on-site bride & groom coordinators.',
    highlight: 'Cinematic Couple Entries & Coordination',
    iconName: 'Heart',
    bgGradient: 'from-red-950/60 via-slate-900 to-slate-950',
    features: ['Floral Chadar & Phoolon Ki Chaadar', 'Cold Pyro & Sparkler Entry Walkway', 'Couple Color Coordination Styling', 'Personal Attendant for Couple', 'Choreographed Stage Entry Concepts']
  }
];

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', count: 26 },
  { id: 'weddings', label: 'Weddings & Celebrations', count: 10 },
  { id: 'corporate', label: 'Corporate & Brand Events', count: 4 },
  { id: 'creative', label: 'Creative & Themed Events', count: 5 },
  { id: 'complete', label: 'Complete Event Services', count: 7 }
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Grand Royal Wedding Reception Mandap',
    category: 'weddings',
    location: 'Thiruthuraipoondi',
    tag: 'Wedding Decor',
    description: 'Bespoke floral architecture with golden pillars, ambient chandeliers, and royal navy silk drapery.',
    accentColor: '#D4AF37'
  },
  {
    id: 'g2',
    title: 'Traditional Kasavu Chenda Melam Procession',
    category: 'special',
    location: 'Vittukatti',
    tag: 'Cultural Heritage',
    description: 'Dynamic 15-artist Chenda Melam troupe delivering thunderous festive beats for a wedding entrance.',
    accentColor: '#DC2626'
  },
  {
    id: 'g3',
    title: 'Corporate Annual Summit & Product Reveal',
    category: 'corporate',
    location: 'Tiruvarur',
    tag: 'Corporate Production',
    description: 'High-definition 40ft LED video wall, synchronized intelligent stage lighting, and VIP podium.',
    accentColor: '#2563EB'
  },
  {
    id: 'g4',
    title: 'Fairytale 1st Birthday Theme Celebration',
    category: 'birthday',
    location: 'Thiruthuraipoondi',
    tag: 'Birthday Decor',
    description: 'Pastel balloon cascades, custom 3D character cutouts, illuminated marquee numbers, and sweet cart.',
    accentColor: '#EC4899'
  },
  {
    id: 'g5',
    title: 'Traditional Kalyana Virundhu Catering',
    category: 'special',
    location: 'Nagapattinam Road',
    tag: 'Catering & Hospitality',
    description: 'Traditional South Indian banana leaf feast featuring 18 delicacies and artisanal payasam service.',
    accentColor: '#EAB308'
  },
  {
    id: 'g6',
    title: 'Bespoke Jute Thamboolam Gift Presentation',
    category: 'special',
    location: 'Vittukatti Studio',
    tag: 'Thamboolam Bags',
    description: 'Handcrafted gold-printed jute bags with auspicious betel leaves, coconuts, and sweets.',
    accentColor: '#059669'
  },
  {
    id: 'g7',
    title: 'Destination Beachside Mandap Setup',
    category: 'weddings',
    location: 'Velankanni Coast',
    tag: 'Destination Wedding',
    description: 'Open-sky floral canopy with ocean view, bamboo lanterns, and fragrant jasmine garlands.',
    accentColor: '#0EA5E9'
  },
  {
    id: 'g8',
    title: 'Automobile Brand Launch & Dealer Meet',
    category: 'corporate',
    location: 'Kumbakonam',
    tag: 'Brand Promotion',
    description: 'Hydraulic curtain drop, cold pyrotechnics reveal, laser mapping, and media hospitality lounge.',
    accentColor: '#6366F1'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-google-1',
    name: 'Amulkathir Amulkathir',
    event: 'Wedding & Events · Bala & Team',
    location: 'Google Review · a year ago',
    quote:
      'Highly recommended! I am glad we went with Amman wedding & events . The entire team and especially Bala made sure everything was as per the plan.They make everything turn out into the way you want it to be and fulfill all your expectations and demands. Loved their work. They were amazing!',
    rating: 5,
    date: '1 year ago'
  },
  {
    id: 't-google-2',
    name: 'DURGAGOWRI. G',
    event: 'Sadangu & Engagement (Decor, Food & Photo)',
    location: 'Google Review · a month ago',
    quote:
      'Reasonable price. I have booked for my sadangu and engagement for decor, food and photography.very satisfied with their work. Budget Friendly too.',
    rating: 5,
    date: '1 month ago'
  },
  {
    id: 't-google-3',
    name: 'Nagarajan Muthukrishnan',
    event: 'Audio, Lighting & Equipment Service',
    location: 'Google Review · 8 months ago',
    quote:
      'They have provided excellent service with quality high standard equipment and accessories. The technician did his job well during the function. The rate is comparatively reasonable. I strongly recommend them for functions.',
    rating: 5,
    date: '8 months ago'
  },
  {
    id: 't1',
    name: 'S. Vigneshwaran & Deepa',
    event: 'Grand Wedding & Reception',
    location: 'Thiruthuraipoondi',
    quote: 'J. Balamurugan and the Amman Event Management team took over our entire wedding headache. The stage decoration with royal blue and gold drapes was breathtaking. The Chenda Melam team created goosebumps during the Baraat!',
    rating: 5,
    date: 'February 2026'
  },
  {
    id: 't2',
    name: 'K. Ramasamy',
    event: 'Sashtiapthapoorthi (60th Birthday)',
    location: 'Vittukatti',
    quote: 'For my father\'s 60th milestone, everything from the traditional homam backdrop to catering and thamboolam bags was arranged smoothly under one roof. No running behind multiple vendors. Highly recommended.',
    rating: 5,
    date: 'January 2026'
  }
];

export const PLANNING_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Understanding Your Dream',
    desc: "We sit down with you to deeply understand your event vision, guest count, cultural traditions, preferred theme, and specific expectations.",
    icon: 'Compass',
    deliverable: 'Initial consultation, event scope & transparent quotation'
  },
  {
    step: '02',
    title: 'PLAN',
    subtitle: 'Blueprint & Concept',
    desc: 'Balamurugan drafts a meticulous concept plan: 3D stage layouts, color palettes, timeline schedules, catering menus, and logistics mapping.',
    icon: 'SlidersHorizontal',
    deliverable: 'Moodboard, vendor lineup, menu selection & master schedule'
  },
  {
    step: '03',
    title: 'CREATE',
    subtitle: 'Coordination & Crafting',
    desc: 'Our production team coordinates floral decor, lighting rigs, Chenda Melam artists, photography crews, invitations, and catering logistics.',
    icon: 'Sparkles',
    deliverable: 'Flawless venue setup, sound testing, rehearsal & readiness'
  },
  {
    step: '04',
    title: 'CELEBRATE',
    subtitle: 'Flawless Live Execution',
    desc: 'On your big day, we manage stage flow, guest hospitality, artist cues, and photo moments so you can celebrate stress-free with loved ones.',
    icon: 'Award',
    deliverable: 'On-site floor coordination from dawn till final departure'
  }
];

export const TRUST_POINTS = [
  {
    title: 'Creative Planning',
    desc: 'Customized concepts tailored to your family heritage and brand identity.',
    icon: 'Sparkles'
  },
  {
    title: 'Professional Coordination',
    desc: 'Led by J. Balamurugan with meticulous attention to every scheduled minute.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Complete Event Solutions',
    desc: 'From stage decor and catering to photography, invitations, and Chenda Melam under one roof.',
    icon: 'Gem'
  },
  {
    title: 'Memorable Experiences',
    desc: 'Creating joyful celebrations that leave a lasting impression on your guests.',
    icon: 'Heart'
  }
];
