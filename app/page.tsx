"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar } from "lucide-react"

export default function Portfolio() {
  // Add typewriter effect with proper delete/retype animation
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const roles = ["Software Engineer.", "Problem-Solver.", "Full-Stack Developer.", "Critical Thinker."]
    const currentRole = roles[roleIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.substring(0, displayText.length + 1))
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(currentRole.substring(0, displayText.length - 1))
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 80,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 150

      // Check if we're near the bottom of the page (contact section)
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100

      if (isNearBottom) {
        setActiveSection("contact")
        return
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Anoki AI",
      location: "Mountain View, CA",
      period: "Jun 2025 - Present",
      logo: "/logos/anoki-logo.png",
      website: "https://www.anoki.ai/",
      description: [
        "Building internal systems within the Engineering Augmentation and Machine Learning teams to support Anoki's AI-powered ContextIQ platform and streamline content operations at scale.",
      ],
    },
    {
      title: "Computational Linguistics Research Assistant",
      company: "UMIACS",
      location: "College Park, MD",
      period: "Jan 2025 - Jun 2025",
      logo: "/logos/umiacs-logo.png",
      website: "https://www.umiacs.umd.edu/",
      description: [
        "Collaborated with Dr. Naomi Feldman and graduate fellow Imani Finkley to design and execute experiments measuring textual novelty in LLM-generated literature, testing how prompt specificity affects model creativity.",
        "Applied the Creativity Index and n-gram analysis to measure lexical and thematic variation across model outputs.",
        "Fine-tuned and evaluated OPT-175b and BERT under varied prompt conditions to analyze LLM output behavior.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Hack4Impact-UMD",
      location: "College Park, MD",
      period: "Jan 2025 - Present",
      logo: "/logos/hack4impact-logo.png",
      website: "https://www.hack4impact.org/",
      description: [
        "Working on a team to build a photo-sharing and scheduling platform for Camp Starfish, a nonprofit camp supporting youth with social-emotional challenges through a 1:1 staff-to-camper model.",
        "Built Firestore helper functions for employees, albums, and campers to safely handle multi-step database operations like creating, updating, and querying by ID, UID, or email, ensuring data consistency when multiple records must be changed together.",
        "Developed a responsive Login page with secure Google Authentication using Firebase, styled with Tailwind CSS, including dynamic error messaging for failed sign-ins and a fallback link for unregistered users.",
        "The system currently supports over 1,500 photos and 300 camper records each summer, used by 60+ staff to securely manage media and streamline camper scheduling.",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Karya",
      location: "",
      period: "Aug 2024 - May 2025",
      logo: "/logos/karya-logo.png",
      website: "https://www.karya.in/",
      description: [
        "Developed Kalai, a Natural Language Query Dashboard using Google Gemini and LangChain SQL agents to process plain English queries and return SQL responses, enabling users to retrieve data from Karya's datasets.",
        "Optimized backend SQL execution by introducing caching in PostgreSQL to reduce latency and improve performance.",
        "Implemented a role-based access control (RBAC) system to enforce dataset permissions, ensuring secure and restricted access to sensitive data.",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Decision Factories",
      location: "",
      period: "May 2024 - Aug 2024",
      logo: "/logos/decision-factories-logo.png",
      website: null,
      description: [
        "Built LiveReqs, an LLM-powered application that transforms high-level use case descriptions into detailed specifications, interactive flowcharts, and executable flows. The tool enables real-time validation and structured business feedback, and was presented to potential customers for feedback and refinement.",
        "Designed and developed the company website with a responsive user interface and clear navigation to communicate the company's mission, showcase projects, and feature product demonstrations.",
      ],
    },
  ]

  const projects = [
    {
      title: "EcoNavix",
      category: "MACHINE LEARNING",
      description:
        "AI-driven platform that optimizes supply chain routes using real-time environmental and traffic data, reducing carbon emissions by up to 35% while improving logistical efficiency.",
      technologies: ["Python", "Flask", "React.js"],
      icon: "☁️",
      demo: "https://www.youtube.com/watch?v=j-Y0KCmyz50",
    },
    {
      title: "LiveReqs",
      category: "SOFTWARE DEVELOPMENT",
      description:
        "LLM-powered application that enables Product Managers to convert high-level product requirements into detailed, testable use case documentation with visual flowcharts, executable code, and automated scenario validation.",
      technologies: ["React.js", "Node.js", "REST APIs", "TLDraw", "Claude"],
      icon: "👥",
      demo: "https://drive.google.com/file/d/1vHlgmCA0g7pTzsWpSPBkkDVtMHJ_NYDg/view",
    },
    {
      title: "Camp Starfish",
      category: "Full-Stack Development",
      description:
        "Photo-sharing and scheduling platform for Camp Starfish, a nonprofit serving youth with social-emotional challenges. The system supports over 1,500 photos and 300 camper records each summer, used by 60+ staff to securely manage media and streamline camper scheduling.",
      technologies: ["Firebase", "AWS", "React.js"],
      icon: "⭐",
      demo: "https://docs.google.com/presentation/d/16vBt3v3ev4AX0mnmETDYSM6hhrsJ8w6QKF9zASiV840/edit?usp=sharing",
    },
    {
      title: "CosmoSearch",
      category: "WEB DEVELOPMENT",
      description:
        "Web application that lets users explore NASA's image library. Just enter a space-related term and date range (1920-2025) to browse stunning space images with titles, descriptions, and dates. Designed for quick, engaging cosmic discovery across any device.",
      technologies: ["Machine Learning", "React.js"],
      icon: "🚀",
      demo: "https://space-project-ruddy.vercel.app/",
    },
    {
      title: "Is GPT-3 Smarter Than A Sixth-Grader?",
      category: "AI RESEARCH",
      description:
        "Research study that evaluated the GPT-3 Davinci model's ability to answer middle school science questions from the TQA dataset using zero-shot, few-shot, and fine-tuning approaches to measure performance across different learning setups.",
      technologies: ["Python", "GPT-3", "NLP", "pandas"],
      icon: "🧠",
      demo: "https://independent-project-mentorship.netlify.app/projects/12bafc1b0d40c5efca04d8d8aaef32d3ba22e042.html",
    },
    {
      title: "WAR Prediction",
      category: "MACHINE LEARNING",
      description:
        "Machine learning model built with Python and scikit-learn to predict 2019 MLB player Wins Above Replacement (WAR), a key metric for evaluating player value and informing team decision-making, achieving a 0.87 correlation with actual performance.",
      technologies: ["Python", "scikit-learn", "Linear Regression"],
      icon: "⚾",
      demo: "https://github.com/TejSuklikar/WAR-Prediction",
    },
    {
      title: "How To Get A Good Whiff",
      category: "DATA SCIENCE",
      description:
        "Logistic regression model built in R to predict optimal MLB pitch locations by analyzing swing-and-miss probabilities, achieving 85% accuracy using Statcast data and visualized insights through ggplot2.",
      technologies: ["R", "ggplot2", "dplyr"],
      icon: "🏟️",
      demo: "https://github.com/TejSuklikar/HowToGetAGoodWhiff/blob/main/How%20to%20get%20a%20good%20WHIFF-%20Wharton%20Moneyball%20Academy%20Presentation.pdf",
    },
    {
      title: "Anti Refugee Sentiment Analysis",
      category: "MACHINE LEARNING",
      description:
        "Sentiment analysis model developed in Python using NLP techniques to classify tweets as pro- or anti-refugee, achieving 92.65% accuracy through feature extraction methods like Bag of Words, Tf-idf, and Word2Vec with logistic regression.",
      technologies: ["NLP", "Python", "scikit-learn", "TF-IDF", "Word2Vec"],
      icon: "🐦‍⬛",
      demo: "https://github.com/TejSuklikar/AntiRefugeeSentimentAnalysis/blob/main/Anti-Refugee%20Sentiment%20Analysis.pdf",
    },
  ]

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Java", icon: "/logos/skills/java-logo.png" },
        { name: "Python", icon: "/logos/skills/python-logo.png" },
        { name: "JavaScript/TypeScript", icon: "/logos/skills/typescript-javascript-logo.png" },
        { name: "C", icon: "/logos/skills/c-logo.png" },
        { name: "C++", icon: "/logos/skills/cpp-logo-new.png" },
        { name: "R", icon: "/logos/skills/r-logo.png" },
        { name: "SQL", icon: "/logos/skills/sql-logo.png" },
        { name: "HTML/CSS", icon: "/logos/skills/html-css-logo.png" },
        { name: "OCaml", icon: "/logos/skills/ocaml-logo.png" },
        { name: "Assembly", icon: "/logos/skills/assembly-logo.png" },
      ],
    },
    {
      title: "Frameworks/Libraries",
      skills: [
        { name: "React/Svelte", icon: "/logos/skills/react-svelte-logo.png" },
        { name: "Node.js", icon: "/logos/skills/nodejs-logo.png" },
        { name: "Express.js", icon: "/logos/skills/express-logo.png" },
        { name: "Next.js", icon: "/logos/skills/nextjs-logo.png" },
        { name: "Flask", icon: "/logos/skills/flask-logo.png" },
        { name: "scikit-learn", icon: "/logos/skills/scikit-learn-logo.png" },
        { name: "pandas", icon: "/logos/skills/pandas-logo.png" },
        { name: "TensorFlow", icon: "/logos/skills/tensorflow-logo.png" },
        { name: "PyTorch", icon: "/logos/skills/pytorch-logo.png" },
        { name: "NumPy", icon: "/logos/skills/numpy-logo.png" },
      ],
    },
    {
      title: "Tools/Technologies",
      skills: [
        { name: "AWS", icon: "/logos/skills/aws-logo.png" },
        { name: "Azure", icon: "/logos/skills/azure-logo.png" },
        { name: "Docker", icon: "/logos/skills/docker-logo.png" },
        { name: "Kubernetes", icon: "/logos/skills/kubernetes-logo.png" },
        { name: "MySQL", icon: "/logos/skills/mysql-logo.png" },
        { name: "PostgreSQL", icon: "/logos/skills/postgresql-logo.png" },
        { name: "Jupyter", icon: "/logos/skills/jupyter-logo.png" },
        { name: "MongoDB", icon: "/logos/skills/mongodb-logo.png" },
        { name: "Linux", icon: "/logos/skills/linux-logo.png" },
        { name: "Git", icon: "/logos/skills/git-logo.png" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-blue-600/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8 py-2 sm:py-3 md:py-4 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-300 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-300 hover:text-blue-300 hover:bg-blue-600/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1 lg:col-span-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 tracking-tight">
              Nice to meet you! <span className="inline-block animate-pulse">👋</span>
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-heading">
              <span className="text-white hover:bg-gradient-to-r hover:from-green-400 hover:via-teal-400 hover:to-blue-500 hover:text-transparent hover:bg-clip-text transition-all duration-300 cursor-default">
                I'm Tej
              </span>
            </h1>
            {/* Fixed height container for typewriter to prevent layout shifts and overflow */}
            <div className="h-16 sm:h-20 md:h-24 mb-8 flex items-center justify-center lg:justify-start overflow-hidden">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center max-w-full">
                <span className="mr-2 flex-shrink-0">I'm a</span>
                <div className="relative inline-block min-w-0 flex-1">
                  <span className="text-[#6BB6FF] whitespace-nowrap block overflow-hidden text-ellipsis">
                    {displayText}
                    <span className="inline-block w-0.5 sm:w-1 h-6 sm:h-8 bg-[#6BB6FF] ml-1 animate-pulse"></span>
                  </span>
                  {/* Invisible text to reserve space for longest text */}
                  <span className="absolute top-0 left-0 text-transparent pointer-events-none whitespace-nowrap opacity-0">
                    Full-Stack Developer.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full font-heading text-sm md:text-base flex items-center transition-all duration-300 border border-gray-700 hover:border-gray-600 min-w-[180px] justify-center"
              >
                Contact me here <span className="ml-2">→</span>
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open("https://www.linkedin.com/in/tej-suklikar/", "_blank")}
                  className="bg-white hover:bg-gray-100 p-3 rounded-full transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={() => window.open("https://github.com/TejSuklikar", "_blank")}
                  className="bg-white hover:bg-gray-100 p-3 rounded-full transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2 lg:col-span-1">
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/profile-photo.jpeg"
                  alt="Tej Suklikar"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 5%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight font-heading">
            <span className="text-blue-300">About</span>
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-8">
              I'm a Computer Science and Linguistics student at the University of Maryland, passionate about developing
              innovative software solutions. I focus on leveraging AI, Machine Learning, and Data Science to solve
              complex problems across various industries, and I'm eager to explore new ways these technologies can be
              applied, uncovering creative solutions and pushing technological boundaries. Currently, I'm honing my
              skills as a <span className="font-semibold">Software Engineering Intern</span> at{" "}
              <span className="font-semibold">Anoki AI</span>, where I'm working on their multimodal{" "}
              <span className="font-semibold">ContextIQ</span> platform for contextual video intelligence.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-8">
              <span className="italic">When I'm not coding</span>, I enjoy playing soccer, golfing, working out, and
              spending time with my dog, Beau.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <MapPin className="w-5 h-5" />
              <span className="font-medium text-base">San Francisco, CA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight font-heading">
            <span className="text-blue-300">Experience</span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-blue-600/20 hover:border-blue-600/40 transition-all duration-300"
              >
                <CardHeader className="p-6">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                      <img
                        src={exp.logo || "/placeholder.svg"}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                        style={exp.company === "Decision Factories" ? { filter: "brightness(0) invert(1)" } : {}}
                      />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <CardTitle className="text-xl text-white font-semibold font-heading mb-2">{exp.title}</CardTitle>
                      <CardDescription className="text-blue-300 font-medium font-heading text-base mb-3">
                        {exp.website ? (
                          <button
                            onClick={() => window.open(exp.website, "_blank")}
                            className="hover:text-blue-200 transition-colors cursor-pointer underline decoration-transparent hover:decoration-blue-300"
                          >
                            {exp.company}
                          </button>
                        ) : (
                          exp.company
                        )}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400">
                        {exp.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        )}
                        {exp.period && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-start leading-relaxed text-base">
                        <span className="text-blue-300 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight font-heading">
            <span className="text-blue-300">Projects</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-black/50 border-blue-600/20 hover:border-blue-600/40 transition-all duration-300 group h-full"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{project.icon}</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-300 hover:text-blue-300 p-2"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-300 border-blue-600/30 w-fit font-medium text-sm mb-3">
                    {project.category}
                  </Badge>
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors font-semibold font-heading mb-3">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 font-light leading-relaxed text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-600/10 text-blue-300 font-medium text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight font-heading">
            <span className="text-blue-300">Skills</span>
          </h2>
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 text-center font-heading">{category.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/50 border-blue-600/20 hover:border-blue-600/40 transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4 text-center">
                        {typeof skill.icon === "string" && skill.icon.startsWith("/") ? (
                          <div className="h-16 w-16 mx-auto flex items-center justify-center mb-3 p-1">
                            <img
                              src={skill.icon || "/placeholder.svg"}
                              alt={`${skill.name} logo`}
                              className="max-h-12 max-w-12 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-16 mx-auto flex items-center justify-center mb-3 text-4xl">
                            {skill.icon}
                          </div>
                        )}
                        <p className="text-white font-medium text-sm leading-tight">{skill.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 tracking-tight font-heading">
            <span className="text-blue-300">Get In Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about
            technology. Feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-400 hover:text-blue-500 border-none font-medium font-heading text-base flex items-center justify-center px-8 py-6 min-w-[140px]"
              onClick={() => window.open("mailto:anitej@suklikar.org")}
            >
              <Mail className="w-5 h-5 mr-3" />
              Email Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-400 hover:text-blue-500 border-none font-medium font-heading text-base flex items-center justify-center px-8 py-6 min-w-[140px]"
              onClick={() => window.open("https://www.linkedin.com/in/tej-suklikar/", "_blank")}
            >
              <Linkedin className="w-5 h-5 mr-3" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-400 hover:text-blue-500 border-none font-medium font-heading text-base flex items-center justify-center px-8 py-6 min-w-[140px]"
              onClick={() => window.open("https://github.com/TejSuklikar", "_blank")}
            >
              <Github className="w-5 h-5 mr-3" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-600/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="font-light text-base">
            &copy; Tej Suklikar. All rights reserved. Built with React, Next.js, TypeScript, & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
