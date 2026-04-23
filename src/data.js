// ============================================================
// Portfolio Data — extracted from original components
// ============================================================

export const personalInfo = {
  name: "Anil Yadav",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "Problem Solver", "MERN Engineer", "Tech Explorer"],
  bio: "I'm a Computer Science student from Nepal, currently studying at JNTUA in Andhra Pradesh, India. I enjoy turning ideas into working products, learning how things work under the hood, and constantly improving my skills through hands-on projects.",
  location: "Chittoor, AP, India",
  field: "Computer Science",
  focus: "MERN Stack · Java · DSA · Cloud & Azure",
  email: "anilyadav77745@gmail.com",
  phone: "+91 8125305482",
  github: "https://github.com/anilyadav45",
  linkedin: "https://www.linkedin.com/in/anilyadav4577/",
  instagram: "https://www.instagram.com/anil.yadav_7/",
  youtube: "https://www.youtube.com/@Yadutech45",
  twitter: "https://twitter.com/yourhandle",
};

export const projects = [
  {
    id: 1,
    title: "LivoraStays",
    subtitle: "Travel Stay Booking Web App",
    description: "A full-stack Airbnb-inspired web application where users can create, edit, view, and delete property listings. Includes authentication, server-side validation, and a complete CRUD flow.",
    image: "https://images.unsplash.com/photo-1657256031855-68029292ff34?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyYm5ifGVufDB8fDB8fHww",
    techStack: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap"],
    githubUrl: "https://github.com/anilyadav45/LivoraStays",
    liveUrl: "https://livorastays.onrender.com/",
    status: "Completed",
    color: "#00f5d4",
  },
  {
    id: 2,
    title: "BlogApp",
    subtitle: "Full CRUD Blog Platform",
    description: "A fully functional blog web app where users can create posts, edit content, delete blogs, add comments, and like posts. Built to understand how frontend and backend work together.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/anilyadav45/BLOG-WEB",
    liveUrl: "https://dairyheaven.onrender.com/",
    status: "Completed",
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "Eduxo",
    subtitle: "College Management Web App",
    description: "A full-stack college management platform with role-based login (Admin, Faculty, Student), attendance tracking, fee management, faculty directory, timetable scheduling, notices, and a student dashboard — everything a modern college needs in one place.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    githubUrl: "https://github.com/anilyadav45/Eduxo",
    liveUrl: "https://eduxo-backend.onrender.com/",
    status: "In Progress",
    color: "#6366f1",
  }
];

export const skills = {
  "Frontend": [
    { name: "HTML", level: 85 },
    { name: "CSS", level: 80 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 65 },
    { name: "Next.js", level: 60 },
    { name: "TypeScript", level: 65 },
    { name: "Tailwind CSS", level: 75 },
  ],
  "Backend": [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Java", level: 80 },
    { name: "REST APIs", level: 75 },
    { name: "SQL", level: 50 },
  ],
  "Tools & Cloud": [
    { name: "Git / GitHub", level: 80 },
    { name: "Postman", level: 65 },
    { name: "Docker", level: 40 },
    { name: "Linux", level: 75 },
    { name: "Azure (Basics)", level: 40 },
  ],
};
