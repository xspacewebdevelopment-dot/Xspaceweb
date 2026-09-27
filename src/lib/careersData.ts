export interface JobDetail {
  id: string;
  type: "job" | "internship";
  title: string;
  company: string;
  department: string;
  workType: string;
  location: string;
  postedDate: string;
  salary: string;
  salarySubtext: string;
  experience: string;
  isNew: boolean;
  shortDescription: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
  iconType: "code" | "design" | "marketing" | "business" | "product";
}

export const ALL_CAREERS: JobDetail[] = [
  {
    id: "fullstack-dev",
    type: "job",
    title: "Full Stack Developer",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Engineering",
    workType: "Full Time",
    location: "Kolkata / Remote",
    postedDate: "2 days ago",
    salary: "₹6,00,000 – ₹12,00,000",
    salarySubtext: "Annual Salary (Based on experience)",
    experience: "2+ Years",
    isNew: true,
    shortDescription:
      "Build scalable web applications and SaaS products from frontend to backend.",
    aboutRole:
      "We are looking for a passionate Full Stack Developer to join our team and work on innovative SaaS products and digital solutions. You will be involved in designing, developing and maintaining web applications from frontend to backend, and play a key role in building scalable, high-performing products used by real businesses and users.",
    responsibilities: [
      "Design, develop and maintain web applications from frontend to backend.",
      "Write clean, efficient and scalable code.",
      "Collaborate with design and product teams to implement features.",
      "Integrate third-party APIs and services.",
      "Optimize applications for performance, scalability and security.",
      "Participate in code reviews and follow best development practices.",
      "Troubleshoot, debug and resolve issues across the stack.",
    ],
    requirements: [
      "2+ years of experience in full stack web development (or relevant experience).",
      "Proficiency in HTML, CSS, JavaScript and modern frontend frameworks (React preferred).",
      "Experience with backend technologies (Node.js, PHP, Python or similar).",
      "Experience with databases (MySQL, PostgreSQL, MongoDB).",
      "Understanding of REST APIs and cloud deployment (AWS / Vercel / similar).",
      "Good problem-solving skills and ability to work in a team.",
    ],
    niceToHave: [
      "Experience with SaaS product development.",
      "Knowledge of DevOps, Docker or CI/CD.",
      "Familiarity with mobile app development (React Native / Flutter).",
      "Contribution to open source projects.",
    ],
    skills: [
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
      "HTML",
      "CSS",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Git",
      "Docker",
      "AWS",
      "Problem Solving",
      "Team Collaboration",
    ],
    iconType: "code",
  },
  {
    id: "uiux-designer",
    type: "job",
    title: "UI/UX Designer",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Design",
    workType: "Full Time",
    location: "Kolkata / Remote",
    postedDate: "3 days ago",
    salary: "₹5,00,000 – ₹10,000,000",
    salarySubtext: "Annual Salary (Based on experience)",
    experience: "2+ Years",
    isNew: true,
    shortDescription:
      "Design intuitive interfaces and digital experiences for our growing product ecosystem.",
    aboutRole:
      "We are seeking a talented UI/UX Designer to craft visually compelling, user-centric interfaces across our flagship SaaS products like MakeGSTBill, GoldenGST, and client platforms. You will bridge user empathy with high-polish design systems.",
    responsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and modular design systems in Figma.",
      "Conduct user research and usability testing to refine complex user workflows.",
      "Collaborate closely with frontend engineers to ensure pixel-perfect implementation.",
      "Produce brand assets, marketing collaterals, and landing page visual experiences.",
    ],
    requirements: [
      "Portfolio showcasing end-to-end web & mobile product design cases.",
      "Deep mastery of Figma, auto-layout, design tokens, and interactive prototyping.",
      "Strong understanding of typography, color harmony, layout grids, and accessibility standards.",
      "Empathetic mindset with relentless obsession for micro-interactions and polish.",
    ],
    niceToHave: [
      "Familiarity with HTML/CSS and design system engineering in Tailwind CSS.",
      "Experience creating micro-animations in Lottie or Rive.",
      "Previous experience designing B2B SaaS dashboards.",
    ],
    skills: [
      "Figma",
      "UI/UX Design",
      "Prototyping",
      "Design Systems",
      "User Research",
      "Wireframing",
      "Visual Design",
      "Design Tokens",
      "Creative Suite",
    ],
    iconType: "design",
  },
  {
    id: "marketing-exec",
    type: "job",
    title: "Digital Marketing Executive",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Marketing",
    workType: "Full Time",
    location: "Kolkata / Remote",
    postedDate: "4 days ago",
    salary: "₹4,50,000 – ₹8,00,000",
    salarySubtext: "Annual Salary (Based on experience)",
    experience: "1+ Years",
    isNew: true,
    shortDescription:
      "Work across SEO, social media, content and performance marketing.",
    aboutRole:
      "Join our growth team to expand XSPACEWEB's brand presence and product user acquisition. You will run multi-channel campaigns, drive organic search dominance, and build community trust for our SaaS platforms.",
    responsibilities: [
      "Manage organic SEO strategies, on-page technical optimization, and high-ranking content.",
      "Execute targeted performance ad campaigns on Google Ads and Meta.",
      "Analyze acquisition funnels, conversion rates, CAC, and LTV using Google Analytics.",
      "Manage brand social channels, community engagement, and newsletter marketing.",
    ],
    requirements: [
      "1-3 years in digital marketing, growth hacking, or digital agency roles.",
      "Hands-on experience with GA4, Search Console, Ahrefs/SEMrush, and ad managers.",
      "Strong copywriting and storytelling skills for technical and business audiences.",
      "Analytical mindset driven by conversion metrics and measurable growth.",
    ],
    niceToHave: [
      "Experience with B2B SaaS lead generation.",
      "Basic knowledge of email marketing automation tools.",
      "Familiarity with influencer marketing and tech PR.",
    ],
    skills: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Content Strategy",
      "Google Analytics 4",
      "Copywriting",
      "Social Media",
      "Email Marketing",
      "Conversion Optimization",
    ],
    iconType: "marketing",
  },
  {
    id: "bizdev-exec",
    type: "job",
    title: "Business Development Executive",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Business",
    workType: "Full Time",
    location: "Kolkata / Remote",
    postedDate: "5 days ago",
    salary: "₹4,00,000 – ₹8,50,000",
    salarySubtext: "Annual Salary + Attractive Incentives",
    experience: "1+ Years",
    isNew: true,
    shortDescription:
      "Help our products reach new customers, businesses and markets.",
    aboutRole:
      "We are looking for an energetic Business Development Executive to drive client outreach, conduct software demonstrations, and close partnerships for our SaaS solutions and enterprise digital engineering services.",
    responsibilities: [
      "Prospect and engage prospective B2B clients, SMBs, retail chains, and enterprises.",
      "Conduct engaging software demonstrations for MakeGSTBill, GoldenGST, and custom solutions.",
      "Manage the sales pipeline from initial lead qualification to contract negotiation and closing.",
      "Collaborate with product and support teams to ensure seamless customer onboarding.",
    ],
    requirements: [
      "1+ years in B2B sales, client acquisition, or enterprise software sales.",
      "Exceptional communication, presentation, and negotiation skills.",
      "Self-motivated with strong relationship-building and problem-solving abilities.",
      "Familiarity with CRM tools (HubSpot, Zoho) and sales pipeline tracking.",
    ],
    niceToHave: [
      "Experience selling software or SaaS products to Indian MSMEs.",
      "Knowledge of GST billing and accounting software ecosystems.",
    ],
    skills: [
      "B2B Sales",
      "Lead Generation",
      "Product Demos",
      "Negotiation",
      "CRM Management",
      "Client Relations",
      "Pipeline Management",
      "Communication",
    ],
    iconType: "business",
  },
  {
    id: "frontend-intern",
    type: "internship",
    title: "Frontend Engineering Intern",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Engineering",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    postedDate: "1 day ago",
    salary: "₹15,000 – ₹25,000 / month",
    salarySubtext: "Monthly Stipend + PPO Opportunity",
    experience: "Fresher / Student",
    isNew: true,
    shortDescription:
      "Work on live Next.js client products, component libraries, and interactive interfaces.",
    aboutRole:
      "As a Frontend Intern, you will work side-by-side with senior developers on production codebases, shipping real features to thousands of active users while mastering modern TypeScript, Next.js, and Tailwind CSS.",
    responsibilities: [
      "Build reusable, accessible UI components using React, Next.js, and Tailwind CSS.",
      "Integrate backend APIs and handle client-side state management.",
      "Collaborate in daily standups and receive code reviews from senior engineers.",
      "Optimize website performance and responsiveness across devices.",
    ],
    requirements: [
      "Proficiency in JavaScript/TypeScript, React, HTML5, and modern CSS.",
      "Working knowledge of Git version control and GitHub.",
      "Enthusiasm to learn scalable software architecture and clean code best practices.",
    ],
    niceToHave: [
      "Personal projects deployed on Vercel/Netlify.",
      "Familiarity with Next.js App Router and server components.",
    ],
    skills: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Git",
      "REST APIs",
    ],
    iconType: "code",
  },
  {
    id: "uiux-intern",
    type: "internship",
    title: "UI/UX Design Intern",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Design",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    postedDate: "3 days ago",
    salary: "₹15,000 – ₹22,000 / month",
    salarySubtext: "Monthly Stipend + PPO Opportunity",
    experience: "Fresher / Student",
    isNew: true,
    shortDescription:
      "Assist in creating wireframes, mobile prototypes, and design system components.",
    aboutRole:
      "Learn and create real-world design systems, interactive prototypes, and marketing assets for live tech products under the mentorship of senior product designers.",
    responsibilities: [
      "Assist in user research, wireframing, and Figma design system components.",
      "Create high-fidelity mobile and web mockups for upcoming features.",
      "Design marketing graphics, social media banners, and pitch decks.",
    ],
    requirements: [
      "Figma design portfolio demonstrating UI sensibility and clean layout principles.",
      "Strong understanding of typography, contrast, and mobile-first design.",
    ],
    niceToHave: [
      "Experience with Adobe Illustrator / Photoshop.",
      "Basic understanding of web technologies.",
    ],
    skills: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Visual Design"],
    iconType: "design",
  },
  {
    id: "growth-intern",
    type: "internship",
    title: "Growth & Marketing Intern",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Marketing",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    postedDate: "4 days ago",
    salary: "₹12,000 – ₹20,000 / month",
    salarySubtext: "Monthly Stipend + PPO Opportunity",
    experience: "Fresher / Student",
    isNew: true,
    shortDescription:
      "Support SEO research, content creation, social media campaigns, and user community growth.",
    aboutRole:
      "Gain hands-on experience in tech marketing, SEO, performance campaigns, and content growth strategies for SaaS products.",
    responsibilities: [
      "Write engaging tech blog articles, tutorials, and case studies.",
      "Assist with keyword research and competitor SEO audits.",
      "Manage social media posts and community interactions.",
    ],
    requirements: [
      "Excellent written English communication and content creation skills.",
      "Passion for technology, SaaS businesses, and digital marketing trends.",
    ],
    niceToHave: ["Familiarity with Canva or basic graphic design."],
    skills: ["Content Writing", "SEO", "Social Media", "Keyword Research", "Blogging"],
    iconType: "marketing",
  },
  {
    id: "product-ops-intern",
    type: "internship",
    title: "SaaS Product Operations Intern",
    company: "XSPACEWEB PRIVATE LIMITED",
    department: "Product",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    postedDate: "2 days ago",
    salary: "₹12,000 – ₹20,000 / month",
    salarySubtext: "Monthly Stipend + PPO Opportunity",
    experience: "Fresher / Student",
    isNew: true,
    shortDescription:
      "Help test new product releases, write customer documentation, and assist user onboarding.",
    aboutRole:
      "Work closely with our product managers and QA leads to ensure exceptional software reliability, write user documentation, and gather user feedback.",
    responsibilities: [
      "Perform quality assurance testing on new feature releases.",
      "Write help center guides, FAQs, and product changelogs.",
      "Assist users with onboarding and product workflow guidance.",
    ],
    requirements: [
      "Strong attention to detail, problem-solving ability, and clear writing.",
      "Curiosity about software products and user experience.",
    ],
    niceToHave: ["Basic understanding of web technologies and databases."],
    skills: ["QA Testing", "Documentation", "User Support", "Problem Solving", "Product Ops"],
    iconType: "product",
  },
];
