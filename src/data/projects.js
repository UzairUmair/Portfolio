// Stack evidence: deployed HTML/JS; Blog App and Notes App also have local source.
// TODO: Add verified repository URLs, project dates and personal learning notes.
export const developmentProjects = [
  {
    id: 'freelancerflow', title: 'FreelancerFlow', category: 'Business workspace',
    shortDescription: 'A workspace for keeping clients, projects, tasks and invoices in one place.',
    fullDescription: 'FreelancerFlow brings a freelance workflow into a single dashboard, with dedicated views for clients, projects, tasks, invoices and finances. The interface includes account access, workspace search and a theme switch.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
    coverImage: '/images/freelancerflow.webp', screenshots: ['/images/freelancerflow.webp'],
    liveUrl: 'https://freelancer-flow-ruddy.vercel.app/', githubUrl: '',
    features: ['Client and project views', 'Task board and deadlines', 'Invoice and finance views', 'Firebase-backed workspace records'],
  },
  {
    id: 'cineverse', title: 'CineVerse', category: 'Movie discovery',
    shortDescription: 'A movie and TV discovery interface with title details, search and a personal library.',
    fullDescription: 'CineVerse presents trending movies and television series with dedicated browsing and detail views. Its deployed source uses TMDB data and Firebase, with account access and a saved-title library. It is a discovery platform, not a streaming service.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
    coverImage: '/images/cineverse.webp', screenshots: ['/images/cineverse.webp'],
    liveUrl: 'https://cineverse-uu.vercel.app/', githubUrl: '',
    features: ['Trending movie and TV shelves', 'Search and title details', 'Personal library', 'TMDB-powered movie information'],
  },
  {
    id: 'pick-and-wear', title: 'Pick & Wear', category: 'E-commerce interface',
    shortDescription: 'A lifestyle storefront with category browsing, product search and a shopping cart.',
    fullDescription: 'A multi-page storefront presenting fashion, accessories, technology and lifestyle products. The JavaScript source implements product rendering, search, a cart and a wishlist, with browser storage for cart and wishlist state.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    coverImage: '/images/pick-and-wear.webp', screenshots: ['/images/pick-and-wear.webp'],
    liveUrl: 'https://pick-and-wear.vercel.app/', githubUrl: '',
    features: ['Product and category browsing', 'Product search', 'Cart and wishlist stored in the browser', 'Shared navigation across pages'],
  },
  {
    id: 'my-blog-app', title: 'My Blog App', category: 'React learning project',
    shortDescription: 'A React practice app for writing, editing and reacting to posts.',
    fullDescription: 'A learning project built with React and Vite. Posts can be created, edited and deleted, and readers can switch between like and dislike reactions. Post data lives in React state and resets when the page reloads.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Material UI'],
    coverImage: '/images/blog.webp', screenshots: ['/images/blog.webp'],
    liveUrl: 'https://stately-tartufo-954fdc.netlify.app/', githubUrl: '',
    features: ['Create, edit and delete posts', 'Like and dislike reactions', 'Form validation', 'In-memory React state'],
  },
  {
    id: 'notes-app', title: 'Notes App', category: 'JavaScript learning project',
    shortDescription: 'A notes app with email sign-in and note creation using Firebase.',
    fullDescription: 'A JavaScript practice project with registration, login and logout using Firebase Authentication. Notes are created in Firestore and displayed with their author and timestamp. The supplied screenshot shows the notes dashboard.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
    coverImage: '/images/notes.webp', screenshots: ['/images/notes.webp'],
    liveUrl: 'https://magenta-florentine-24d311.netlify.app/', githubUrl: '',
    features: ['Email and password authentication', 'Create and display notes', 'Firestore data storage', 'Author and timestamp display'],
  },
];
