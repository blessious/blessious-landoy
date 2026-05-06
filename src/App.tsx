import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Mail, ChevronRight, Download, Moon, Sun, CheckCircle, Code2, Shield, Database, Cpu } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import Gallery from './components/Gallery';

const techStack = {
  frontend: ["JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "WordPress"],
  backend: ["Python", "Node.js", "SQL", "FastAPI", "PHP", "Laravel"],
  tools: ["Claude Code", "Lovable", "Vercel", "Docker", "Fortinet", "Adobe Suite"]
};

const education = [
  {
    school: "Marinduque State College",
    degree: "BS in Computer Engineering (BSCpE)",
    year: "2018 - 2022"
  },
  {
    school: "Marinduque National High School",
    degree: "STEM [With Honors]",
    year: "2016 - 2018"
  },
  {
    school: "Cawit Elementary School",
    degree: "Elementary [With Honors]",
    year: "2006 - 2012"
  }
];

const projects = [
  {
    name: "DTR Management",
    desc: "Automated daily time record system",
    github: "https://github.com/blessious/LGU-DTR-Management-System"
  },
  {
    name: "FAAS System",
    desc: "Digital approval routing workflow",
    github: "https://github.com/blessious/FAAS-System"
  },
  {
    name: "Senior Citizen Management System",
    desc: "Registrants management platform",
    github: "https://github.com/blessious/Senior_Citizen_Management_System_MSWDO"
  }
];

const experience = [
  {
    title: "Computer Operator I",
    company: "ICT - LGU Boac",
    desc: "Built Senior Citizen Management System and official LGU website.",
    year: "2024 - Present"
  },
  {
    title: "Virtual Reality Operator",
    company: "Astro Robotics",
    desc: "Operated and diagnosed robots via VR systems.",
    year: "2023 - 2024"
  },
  {
    title: "Cybersecurity Threat Engineer",
    company: "Trend Micro",
    desc: "Malware reverse engineering and analysis.",
    year: "2022 - 2023"
  }
];

const Section = ({ title, children, viewAll = false }: { title: string, children: React.ReactNode, viewAll?: boolean }) => (
  <section className="bg-white dark:bg-[#111] shadow-sm p-4 mb-3 transition-colors duration-300">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[18px] font-bold text-black dark:text-white">{title}</h2>
      {viewAll && (
        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors">
          View All <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      )}
    </div>
    {children}
  </section>
);

function App() {
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black text-black dark:text-[#ececec] font-sans py-8 md:py-16 px-4 sm:px-8 flex justify-center transition-colors duration-300">
      <div className="w-full max-w-[850px]">

        {/* Header Section */}
        <header className="relative flex flex-col md:flex-row items-start gap-5 mb-6">

          {/* Slide Toggle for Dark Mode */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="absolute top-0 right-0 w-[52px] h-[28px] bg-gray-300 dark:bg-[#222] cursor-pointer flex items-center p-[3px] transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
          >
            <motion.div
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 bg-white dark:bg-white flex items-center justify-center rounded-none shadow-sm"
            >
              {isDark ? <Moon className="w-3 h-3 text-black" /> : <Sun className="w-3 h-3 text-black" />}
            </motion.div>
          </button>

          {/* Profile Picture */}
          <div className="w-36 h-36 md:w-40 md:h-40 bg-gray-200 dark:bg-[#222] flex-shrink-0 shadow-sm overflow-hidden relative rounded-none">
            <img
              src="/ID-BLESS.png"
              alt="Blessious Joseph Landoy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 pt-1 w-full">
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">Blessious Joseph Landoy</h1>
              <img src="/verified.png" alt="Verified" className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-4 text-[13px] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Marinduque, Philippines</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6 text-[13px] font-bold text-black dark:text-[#ececec]">
              <span>Software Developer \ Full Stack \ Systems Architecture</span>
              <div className="flex gap-2">
                <span className="bg-blue-600 text-white px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
                  BSCpE 2022 Graduate
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span className="bg-emerald-600 text-white px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
                  Civil Service Eligible
                  <CheckCircle className="w-3 h-3 fill-white text-emerald-600" />
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 text-[12px] font-bold">
              <a href="mailto:landoyblessious@gmail.com" className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 border border-transparent">
                <Calendar className="w-3.5 h-3.5" />
                Schedule a Call
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </a>
              <a href="mailto:landoyblessious@gmail.com" className="bg-white dark:bg-[#111] text-black dark:text-white shadow-sm px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1c1c1c] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
              <a href="/resume.pdf" download className="bg-white dark:bg-[#111] text-black dark:text-white shadow-sm px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1c1c1c] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-between w-full sm:w-auto sm:flex-1 max-w-[160px]">
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-x-3 gap-y-3">

          {/* Left Column */}
          <div>

            {/* About */}
            <Section title="About">
              <div className="text-[13.5px] text-black dark:text-[#ececec] space-y-4 leading-relaxed font-medium">
                <p>
                  I am a Computer Engineering graduate dedicated to building high-performance, resilient software systems. My expertise lies in architecting complex full-stack solutions that solve real-world problems and automate intricate enterprise workflows.
                </p>
                <p>
                  I've helped local government units streamine their processes through software solutions. I thrive on solving technical challenges that require a strong security mindset and scalable development practices.
                </p>
                <p>
                  Lately, I've been diving deeper into the world of system automation, focusing on integrating tools and techniques into modern applications to optimize development workflows and deliver cutting-edge tech.
                </p>
              </div>
            </Section>

            {/* Tech Stack */}
            <Section title="Tech Stack" viewAll>
              <div className="space-y-6 ml-1">
                <div>
                  <h3 className="text-[13px] font-bold mb-2 text-black dark:text-white">Frontend</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {techStack.frontend.map(t => (
                      <span key={t} className="text-[12px] font-medium text-black dark:text-[#ececec] hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold mb-2 text-black dark:text-white">Backend</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {techStack.backend.map(t => (
                      <span key={t} className="text-[12px] font-medium text-black dark:text-[#ececec] hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold mb-2 text-black dark:text-white">Tools & Others</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {techStack.tools.map(tech => (
                      <span key={tech} className="text-[12px] text-black dark:text-[#ececec] font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Recent Projects */}
            <Section title="Recent Projects" viewAll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 ml-1">
                {projects.map(p => (
                  <a href={p.github} target="_blank" rel="noreferrer" key={p.name} className="block group cursor-pointer">
                    <h3 className="font-bold text-[14px] mb-1 text-black dark:text-white group-hover:text-blue-600 transition-colors">{p.name}</h3>
                    <p className="text-[12px] text-black dark:text-[#ececec] font-medium mb-3 leading-snug">{p.desc}</p>
                  </a>
                ))}
              </div>
            </Section>

          </div>

          {/* Right Column */}
          <div>
            {/* Current Status Card */}
            <div className="bg-white dark:bg-[#111] p-5 shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Current Status</span>
              </div>
              <p className="text-[12px] font-medium text-black dark:text-[#ececec] leading-relaxed mb-3">
                Actively building scalable software for local government units and researching automated system workflows.
              </p>
              <div className="flex gap-3 text-[11px] font-medium text-black dark:text-[#ececec]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Remote / On-site</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Full-time</span>
              </div>
            </div>

            {/* Core Expertise Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { icon: <Code2 className="w-4 h-4 mb-2 text-blue-600 dark:text-blue-400" />, title: "Full-Stack", desc: "End-to-end web apps" },
                { icon: <Shield className="w-4 h-4 mb-2 text-rose-600 dark:text-rose-400" />, title: "Security", desc: "Threat mitigation" },
                { icon: <Database className="w-4 h-4 mb-2 text-indigo-600 dark:text-indigo-400" />, title: "Architecture", desc: "Scalable systems" },
                { icon: <Cpu className="w-4 h-4 mb-2 text-emerald-600 dark:text-emerald-400" />, title: "Hardware", desc: "System diagnostics" }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-[#111] p-4 shadow-sm hover:-translate-y-0.5 transition-transform duration-300 cursor-default">
                  {item.icon}
                  <h3 className="text-[14px] font-bold text-black dark:text-white mb-1">{item.title}</h3>
                  <p className="text-[11.5px] font-medium text-black dark:text-[#ececec] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <Section title="Experience">
              <div className="border-l-[1.5px] border-gray-200 dark:border-[#333] ml-[5px] space-y-6 pt-1">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-[18px] group cursor-pointer">
                    <div className={`absolute w-[9px] h-[9px] left-[-5.5px] top-1.5 transition-all duration-300 ${i === 0
                        ? 'bg-black dark:bg-white'
                        : 'border-[1.5px] border-black dark:border-white bg-transparent group-hover:bg-black dark:group-hover:bg-white'
                      }`}></div>
                    <div className="flex justify-between items-start">
                      <div className="pr-2">
                        <h3 className="font-bold text-[14.5px] text-black dark:text-white leading-tight mb-1 group-hover:text-blue-600 transition-colors">{exp.title}</h3>
                        <p className="text-[12px] text-black dark:text-[#ececec] font-medium mb-1">{exp.company}</p>
                        <p className="text-[11px] text-black dark:text-[#ececec] font-medium leading-relaxed italic">{exp.desc}</p>
                      </div>
                      <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 pt-0.5 flex-shrink-0">
                        {exp.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* Bottom Aligned Sections */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-x-3 gap-y-0">
          <div>
            <Section title="Education">
              <div className="space-y-0 ml-1">
                {education.map((edu, i) => (
                  <div key={i} className="py-3 border-b border-gray-100 dark:border-[#222] last:border-0 last:pb-0 first:pt-0 group">
                    <h3 className="font-bold text-[14.5px] text-black dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">{edu.school}</h3>
                    <p className="text-[12px] text-black dark:text-[#ececec] font-medium mb-1">{edu.degree}</p>
                    <p className="text-[11px] text-black dark:text-[#ececec] font-medium uppercase tracking-wider">{edu.year}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
          <div>
            <Section title="Skills & Interests">
              <div className="space-y-5 ml-1 py-1">
                <div>
                  <h3 className="text-[14.5px] font-bold text-black dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">Hardware & Software</h3>
                  <p className="text-[12px] text-black dark:text-[#ececec] font-medium leading-relaxed">Installation, configuration, troubleshooting, system maintenance</p>
                </div>
                <div>
                  <h3 className="text-[14.5px] font-bold text-black dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">Software Tools</h3>
                  <p className="text-[12px] text-black dark:text-[#ececec] font-medium leading-relaxed">Microsoft Office, Adobe Suite, antivirus solutions, backup and recovery tools</p>
                </div>
                <div>
                  <h3 className="text-[14.5px] font-bold text-black dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">Programming</h3>
                  <p className="text-[12px] text-black dark:text-[#ececec] font-medium leading-relaxed">Python, JavaScript, React.js, Node.js, SQL, WordPress, Next.js, Typescript, Claude Code, Lovable, Vercel</p>
                </div>
                <div>
                  <h3 className="text-[14.5px] font-bold text-black dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">Networking</h3>
                  <p className="text-[12px] text-black dark:text-[#ececec] font-medium leading-relaxed">LAN/WAN setup, IP addressing, router and switch configuration, network troubleshooting</p>
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Gallery */}
        <Gallery />

        <footer className="mt-12 mb-8 text-center text-[12px] text-gray-500 dark:text-gray-500 font-medium">
          <p>© 2026 Blessious Joseph Landoy. All rights reserved.</p>
        </footer>

        {/* AI Chat Widget */}
        <ChatWidget />

      </div>
    </div>
  );
}

export default App;
