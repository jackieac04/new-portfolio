/*
  Screenshots live in src/assets/projects/<folder>/ as full-size masters.
  `npm run art` (wired to predev/prebuild) re-encodes each one into
  src/assets/projects-web/<folder>__<file>.{sticky,full}.webp, and these
  helpers look them up by folder and file name (no extension).

  `thumb` is the little snapshot on the sticky note attached to each project
  card on /projects; `cover` is the large image beside the title on the
  project page; `images` is the gallery below it. All optional -- leave one
  out and that piece just doesn't render.
*/
const projectWebModules = import.meta.glob('../assets/projects-web/*.webp', {
  eager: true,
  import: 'default',
});

function projectImage(folder, file, variant) {
  return projectWebModules[`../assets/projects-web/${folder}__${file}.${variant}.webp`] ?? null;
}

const thumb = (folder, file) => projectImage(folder, file, 'sticky');

const cover = (folder, file, alt) => {
  const src = projectImage(folder, file, 'full');
  return src ? { src, alt } : null;
};

const gallery = (folder, items) =>
  items
    .map(({ file, alt }) => ({ src: projectImage(folder, file, 'full'), alt }))
    .filter((img) => img.src);

export const projects = [
  {
    id: 1,
    title: 'Posters @ Brown',
    description: 'A centralized hub for Brown University event posters with OCR-powered tagging and community filtering.',
    longDescription: `Posters @ Brown was built around a gap in how student organizations
 at Brown communicate events. Flyers go up on bulletin boards, get torn down (sometimes daily!),
 and vanish — and there was no way to find events you weren't in the know for, and no way to advertise a club's event or see previous events.
\n\nThe app lets organizers upload event posters (physical scans or digital files).
 A Google Cloud Vision OCR pipeline reads the text and auto-suggests tags like "free food”,
 "performance", or "music" — which the uploader can approve, edit, or delete. Attendees
 can then filter all Brown events by tag and date.
\n\nBeyond discovery, the app serves as a permanent archive of student group
 visual design over the years. Built by a four person team over a year using a
 Java/Spring Boot backend, MongoDB for storage, Imgur for image hosting, and a
React/TypeScript frontend.`,
highlights: [
      'OCR pipeline reads poster text and auto-suggests event tags',
      'Tag-based and date-based event filtering',
      'Persistent archive of Brown student group event posters',
      'Google OAuth for uploader authentication',
      'Responsive masonry grid layout',
    ],
    techStack: [
      { name: 'Java / Spring Boot', role: 'Backend API & business logic' },
      { name: 'MongoDB', role: 'Poster and user storage' },
      { name: 'Google Cloud Vision', role: 'OCR text extraction from posters' },
      { name: 'React / TypeScript', role: 'Frontend UI & tag management' },
    ],
    tags: ['Java', 'React', 'TypeScript', 'MongoDB', 'OCR'],
    link: 'https://postersatbrown.com/',
    github: 'https://github.com/jackieac04/PostersAtBrown',
    color: '#e5a893',
    thumb: thumb('pab', 'pabhome'),
    cover: cover('pab', 'pabhome', 'Posters @ Brown home page with search, suggested tags, and upcoming event posters'),
    images: gallery('pab', [
      { file: 'pabhome', alt: 'Posters @ Brown home page with search, suggested tags, and upcoming event posters' },
      { file: 'pabprofile', alt: 'User profile page showing liked, created, and draft posters' },
      { file: 'pabprofileedit', alt: 'Edit profile dialog with avatar upload and interest tag selection' },
    ]),

  },
  {
    id: 2,
    title: 'Terrarium World',
    description: 'An interactive 3D terrarium with real-time weather simulation, L-System plants, and boid fireflies.',
    longDescription: `Terrarium World is a living, breathing 3D modeled, rigged, and animated interactive scene rendered entirely in the browser.\n\nThe terrarium responds to a real-time weather system (sunny, rainy, snowy, foggy) and a time-of-day slider that shifts lighting across the scene. Plants grow procedurally from an L-System algorithm. Fireflies move through the space as boids, naturally flocking and dispersing. A cow rigged and animated in Blender roams the environment alongside low-poly animals and plants, and a moveable desk lamp lets users play with lighting.\n\nBuilt with React Three Fiber and @react-three/drei, with Leva powering the sidebar controls for real-time parameter tweaking.`,
    highlights: [
      'Weather simulation: sunny, rainy, snowy, and foggy modes',
      'Time-of-day slider with dynamic lighting',
      'Procedural plant generation via L-System algorithm',
      'Boid simulation driving firefly swarm behavior',
      'Blender-rigged and animated cow model',
    ],
    techStack: [
      { name: 'React Three Fiber', role: 'WebGL scene rendering' },
      { name: '@react-three/drei', role: '3D model loading & animation helpers' },
      { name: 'Leva', role: 'Sidebar controls for simulation parameters' },
      { name: 'Next.js', role: 'App framework' },
    ],
    tags: ['Three.js', 'React', 'Next.js', '3D'],
    link: '#',
    github: 'https://github.com/jackieac04/Terrarium-World',
    color: '#a8b78d',
    thumb: thumb('terrarium', 'rainy'),
    cover: cover('terrarium', 'ter', 'The glass terrarium on a desk beside a lamp and alarm clock, overlooking the water at dusk'),
    images: gallery('terrarium', [
      { file: 'ter', alt: 'The glass terrarium on a desk beside a lamp and alarm clock, overlooking the water at dusk' },
      { file: 'rainy', alt: 'Close-up of the terrarium in rainy weather, with clouds inside the glass dome' },
      { file: 'sheep', alt: 'Inside the terrarium: low-poly sheep, cow, and giraffe among grass and sunflowers' },
    ]),

  },
  {
    id: 3,
    title: 'Tunnel Book Generator',
    description: 'Upload a photo and generate layered tunnel book artwork using superpixel segmentation and edge detection.',
    longDescription: `Tunnel books are layered paper artworks where depth is created by stacking cut-out frames with progressively smaller openings. This tool automates most of the pipeline: after creating the image they want to turn into a tunnel book, the program splits an image into meaningful depth layers without anything falling apart.\n\nUpload any photo and the Python backend applies superpixel segmentation and edge detection to intelligently separate the scene into distinct layers. A custom stand generation system creates the structural frames, and the results are exported as print-ready files you can cut out via lasercutter and assemble.\n\nThe React/TypeScript frontend provides a live per-layer preview, controls for adjusting segmentation parameters, and a toggle between automatic and manual framing modes.`,
    highlights: [
      'Superpixel segmentation to identify scene depth layers',
      'Edge detection pipeline for clean layer boundaries',
      'Automatic and manual frame generation modes',
      'Real-time per-layer preview in the browser',
      'Export layers as print-ready files',
    ],
    techStack: [
      { name: 'Python', role: 'Image segmentation & edge detection backend' },
      { name: 'React / TypeScript', role: 'Frontend layer preview & controls' },
      { name: 'Vite', role: 'Build tooling' },
    ],
    tags: ['Python', 'React', 'TypeScript', 'Computer Vision', 'Computational Fabrication'],
    link: '#',
    github: 'https://github.com/jackieac04/TunnelBookGenerator',
    color: '#efc98d',
    thumb: thumb('tunnelbook', 'by-the-pond'),
    cover: cover('tunnelbook', 'by-the-pond', 'By the Pond: a laser-cut paper tunnel book with layered translucent frames between amber paper covers'),
    images: gallery('tunnelbook', [
      { file: 'upload', alt: 'Upload step: a print of pink geese with layer count, outline or engrave mode, and frame dimensions' },
      { file: 'boundaries', alt: 'Mark boundaries step: superpixels colored by layer, with soft split, hard split, and delete tools' },
      { file: 'crease-map', alt: 'Crease map showing the cut-cost field along the geese outlines, from costly to cut to free' },
      { file: 'preview', alt: '3D book preview of the solved six-layer stack, with per-layer visibility toggles' },
    ]),
  },
  {
    id: 4,
    title: 'Silkscreen Visualizer',
    description: 'Separate any image into silkscreen-ready print layers — CMYK halftone or poster-style block colors.',
    longDescription: `Silkscreen Visualizer allows an artist to quickly go from a digital image to a physical screen print. Upload any image and the tool separates it into individual layers, each ready to burn into a silkscreen.\n\nChoose between two separation modes: CMYK halftone for photographic reproduction, or poster-style block colors and rainbow roll effects for graphic, illustrative results. Every layer is fully customizable — pick your ink color, set opacity, reorder layers by drag-and-drop, and toggle between auto-detected colors and your own palette.\n\nProduction-focused controls like custom canvas dimensions and trapping settings ensure the output works in a real print context. Each layer exports as a standalone file ready to print and expose onto a screen.`,
    highlights: [
      'CMYK halftone and poster-style block color separation modes',
      'Per-layer color picker with opacity control',
      'Drag-and-drop layer reordering',
      'Auto color detection or custom ink palette',
      'Overprinting for color mixing effects',
      'Custom canvas dimensions and trapping settings',
      'Export each layer as a print-ready file',
    ],
    techStack: [
      { name: 'React / TypeScript', role: 'UI & layer compositor' },
      { name: 'Canvas API', role: 'Image processing & layer rendering' },
    ],
    tags: ['React', 'TypeScript', 'Canvas API', 'Computational Fabrication'],
    link: '#',
    github: 'https://bbgithub.dev.bloomberg.com/training-jcohen652/beyond-copilot/tree/silkscreen-visualizer',
    color: '#bcb0dc',
    thumb: thumb('silkscreen', 'editor'),
    cover: cover('silkscreen', 'editor', 'Silkscreen Studio editor with per-plate halftone controls, a portrait preview, and the ink palette'),
    images: gallery('silkscreen', [
      { file: 'step1-inks', alt: 'Separation step 1: choosing ink colors to match against, with a CMYK palette loaded' },
      { file: 'step2-style', alt: 'Separation step 2: choosing photographic halftone or poster-style flat and rainbow roll' },
      { file: 'step3-resolution', alt: 'Separation step 3: resolution, max inks, and a side-by-side original and simulated print' },
      { file: 'editor', alt: 'Editor with per-plate halftone controls (frequency, angle, dot shape, trap) beside the composited portrait' },
      { file: 'export', alt: 'Export dialog with registration marks, plate labels, trap, DPI, and film width settings' },
      { file: 'plate-cyan', alt: 'Exported cyan halftone plate with registration marks' },
      { file: 'plate-magenta', alt: 'Exported magenta halftone plate with registration marks' },
      { file: 'plate-yellow', alt: 'Exported yellow halftone plate with registration marks' },
      { file: 'plate-black', alt: 'Exported black halftone plate with registration marks' },
    ]),
  },
];
