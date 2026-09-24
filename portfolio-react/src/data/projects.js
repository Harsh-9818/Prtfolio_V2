export const projects = [
  {
    slug: 'velfora',
    name: 'Velfora',
    category: 'E-Commerce Platform',
    description: 'A modern clothing storefront built for fast browsing and a smooth checkout experience.',
    live: 'https://velforaclothing.vercel.app/',
    github: 'https://github.com/Harsh-9818/Velfora',
    problem: 'Small clothing brands need a fast, secure storefront without the overhead of a full commerce platform — something that handles catalog browsing, cart state, auth, and payments cleanly on a lean stack.',
    approach: 'Built a full MERN e-commerce app with a clear separation between customer-facing storefront and an admin dashboard, backed by JWT auth, Cloudinary for media, and PayPal for checkout.',
    stack: {
      frontend: ['React.js', 'Redux Toolkit', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js'],
      database: ['MongoDB', 'Mongoose'],
      other: ['JWT', 'bcrypt', 'Multer', 'Cloudinary', 'PayPal Sandbox'],
    },
    architecture: [
      { id: 'client', label: 'React Client', desc: 'Storefront + Admin UI' },
      { id: 'api', label: 'Express API', desc: 'Auth, products, orders' },
      { id: 'db', label: 'MongoDB Atlas', desc: 'Users, products, orders' },
      { id: 'cloudinary', label: 'Cloudinary', desc: 'Product image storage' },
      { id: 'paypal', label: 'PayPal Sandbox', desc: 'Payment processing' },
    ],
    challenges: [
      'Resolved a CORS issue caused by incorrect allowedHeaders configuration',
      'Debugged route typos and case-sensitivity issues across the API layer',
      'Learned Redux Toolkit for centralized, predictable global state management',
    ],
    roadmap: [
      'Product reviews and ratings',
      'Wishlist functionality',
      'Additional payment gateways (e.g., Stripe)',
    ],
  },
  {
    slug: 'enhance-through-ai',
    name: 'Enhance Through AI',
    category: 'Generative AI Tool',
    description: 'An AI-powered image enhancement tool that improves quality and resolution in the browser.',
    live: 'https://enhancethroughai.vercel.app/',
    github: 'https://github.com/Harsh-9818/AI-Image-Enhancer',
    problem: 'Users often need quick image upscaling/enhancement without installing desktop software or paying for a subscription tool.',
    approach: 'Built a browser-based tool that processes and enhances images client-side, keeping the workflow fast and free of server round-trips for the core enhancement step.',
    stack: {
      frontend: ['React.js', 'Tailwind CSS'],
      backend: ['Node.js'],
      database: [],
      other: ['Image processing APIs'],
    },
    architecture: [
      { id: 'client', label: 'React Client', desc: 'Upload + preview UI' },
      { id: 'api', label: 'Node Service', desc: 'Enhancement pipeline' },
      { id: 'output', label: 'Enhanced Output', desc: 'Downloadable result' },
    ],
    challenges: [
      'Balancing enhancement quality against processing time in-browser',
      'Handling large image uploads without blocking the UI',
    ],
    roadmap: [
      'Batch image processing',
      'More enhancement presets',
    ],
  },
  {
    slug: 'atelier',
    name: 'Atelier',
    category: 'Web Application',
    description: 'A clean, componentized web application focused on usability and performance.',
    live: 'https://dev-atelier.vercel.app/',
    github: 'https://github.com/Harsh-9818/Atelier',
    problem: 'Needed a reusable, componentized front-end foundation for building fast, maintainable web apps.',
    approach: 'Focused on component isolation, performance budgets, and clean state boundaries to keep the app easy to extend.',
    stack: {
      frontend: ['React.js', 'Tailwind CSS'],
      backend: [],
      database: [],
      other: [],
    },
    architecture: [
      { id: 'client', label: 'React Client', desc: 'Componentized UI' },
      { id: 'hosting', label: 'Vercel', desc: 'Static hosting + CDN' },
    ],
    challenges: [
      'Keeping component boundaries clean as the app grew',
    ],
    roadmap: [
      'Add backend integration',
    ],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}