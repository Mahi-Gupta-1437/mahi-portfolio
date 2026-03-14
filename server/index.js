require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

const contactLimiter = rateLimit({ windowMs: 15*60*1000, max: 5 });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    }
  } catch (err) { console.error('MongoDB:', err.message); }
};
connectDB();

const Message = mongoose.model('Message', new mongoose.Schema({
  name: String, email: String, subject: String, message: String,
  createdAt: { type: Date, default: Date.now }
}));
const Visitor = mongoose.model('Visitor', new mongoose.Schema({
  count: { type: Number, default: 0 }
}));

app.get('/api/portfolio', (req, res) => res.json({
  name:'Mahi Gupta', role:'Full-Stack Developer & CSE Student',
  email:'mahiiigupta534@gmail.com', phone:'+91-9911787840',
  location:'Punjab, India', university:'Lovely Professional University',
  cgpa:8.51, linkedin:'https://www.linkedin.com/in/ivory-roses/',
  github:'https://github.com/Mahi-Gupta',
  bio:["I'm a B.Tech CSE student at Lovely Professional University with a CGPA of 8.51, passionate about building web applications that solve real problems.","From architecting dissertation platforms to building AI-powered hotel concierge systems, I enjoy working at the intersection of clean backend logic and thoughtful user experience.","Beyond code — cloud computing, MongoDB, prompt engineering for LLMs, and hackathons keep me growing continuously."],
  interests:['🌐 Web Development','☁️ Cloud Computing','🤖 Generative AI','🗄️ Databases','🔐 Cybersecurity','🧩 Problem Solving','📊 Data Visualization','🌸 Open Source'],
  brings:[{icon:'⚡',label:'Fast Learner',sub:'New tech in days'},{icon:'🏗️',label:'System Builder',sub:'Scalable, clean code'},{icon:'🤝',label:'Team Player',sub:'Hackathons & collab'},{icon:'🎯',label:'Detail-Driven',sub:'UX + performance'}]
}));

app.get('/api/skills', (req, res) => res.json([
  { category:'Programming Languages', icon:'fa-code', skills:[{name:'Java',pct:82},{name:'PHP',pct:80},{name:'JavaScript',pct:78},{name:'Python',pct:75},{name:'C / C++',pct:72}] },
  { category:'Frameworks & Tools', icon:'fa-layer-group', skills:[{name:'HTML & CSS',pct:86},{name:'MySQL',pct:82},{name:'Bootstrap',pct:80},{name:'Git & GitHub',pct:78},{name:'MongoDB',pct:70}] },
  { category:'Technical Knowledge', icon:'fa-cloud', skills:[{name:'Cloud Computing',pct:75},{name:'RESTful APIs',pct:72},{name:'Prompt Engineering',pct:68},{name:'Power BI / Excel',pct:70},{name:'Computer Networking',pct:65}] },
  { category:'Soft Skills', icon:'fa-heart', type:'bubbles', skills:[{name:'Problem Solving',icon:'fa-lightbulb'},{name:'Team Collaboration',icon:'fa-users'},{name:'Adaptability',icon:'fa-sync-alt'},{name:'Communication',icon:'fa-comments'},{name:'Time Management',icon:'fa-clock'},{name:'Critical Thinking',icon:'fa-search'},{name:'Leadership',icon:'fa-star'},{name:'Self Learning',icon:'fa-book-open'}] }
]));

app.get('/api/projects', (req, res) => res.json([
  { id:1, featured:true, emoji:'🏨', title:'Aetheria Heights', subtitle:'Luxury Hospitality Management Platform', desc:'A full-scale hotel management platform with dual-portal architecture, AI-powered concierge system, real-time room booking, and secure role-based access control.', highlights:[{icon:'🤖',text:'AI-powered concierge for personalized guest interactions'},{icon:'🔐',text:'Dual-portal architecture with secure RBAC'},{icon:'🎨',text:'Luxury-themed responsive UI'},{icon:'📅',text:'Real-time room booking & reservation management'}], tech:['HTML/CSS','JavaScript','Bootstrap','PHP','MySQL','AI Concierge','RBAC'], github:'https://github.com/Mahi-Gupta', period:'2025', showcaseUrl:'showcases/aetheria-admin-showcase.html', showcaseLabel:'Admin Portal', showcaseUrl2:'showcases/aetheria-user-showcase.html', showcaseLabel2:'User Portal' },
  { id:2, featured:false, emoji:'📚', title:'ThesisEase', subtitle:'PG Dissertation Management System', desc:'Full-stack dissertation management system centralizing workflows for 100+ users with RBAC and real-time milestone tracking.', highlights:['Eliminated 80%+ of manual submission tasks','Secure document upload + RBAC + milestone tracking','Modular PHP-MySQL backend with session management'], tech:['HTML/CSS','JS','Bootstrap','PHP','MySQL','RBAC'], github:'https://github.com/Mahi-Gupta', period:'Mar – May 2025', showcaseUrl:'showcases/thesisease-pgdissertation-showcase.html', showcaseLabel:'View Showcase' },
  { id:3, featured:false, emoji:'🔧', title:'File Recovery System', subtitle:'OS-Level Recovery & Optimization Tool', desc:'OS-level file recovery tool supporting NTFS, FAT32, and ext4 with real-time monitoring and AI-driven disk optimization.', highlights:['90% recovery rate on damaged files across 3 file systems','65% faster anomaly response via automated alerts','50% faster file access via AI-driven defragmentation'], tech:['HTML/CSS','JS','Bootstrap','PHP','MySQL','NTFS'], github:'https://github.com/Mahi-Gupta', period:'Mar – Apr 2025', showcaseUrl:'showcases/filerecovery-showcase.html', showcaseLabel:'View Showcase' },
  { id:4, featured:false, emoji:'📊', title:'Acadex', subtitle:'Academic Monitoring Platform', desc:'Real-time academic monitoring with SPI model tracking attendance and scores across 5+ university departments.', highlights:['SPI model across 5+ departments','40% reduction in faculty workload','60% faster response on 1000+ records'], tech:['PHP','MySQL','JS','Bootstrap','SPI Model'], github:'https://github.com/Mahi-Gupta', period:'Jun – Jul 2025', showcaseUrl:'showcases/acadex-showcase.html', showcaseLabel:'View Showcase' }
]));

app.get('/api/certifications', (req, res) => res.json([
  {id:1,group:'ai',title:'ChatGPT-4 Prompt Engineering',platform:'Infosys Springboard',date:'Aug 2025',emoji:'🤖',file:'1-e892b5ce-154d-46b3-b028-de8d30348291.pdf'},
  {id:2,group:'ai',title:'Build Generative AI Apps with No-Code Tools',platform:'Infosys Springboard',date:'Aug 2025',emoji:'✨',file:'1-aac980b1-be3e-4ed3-a14d-58ff567e57ad.pdf'},
  {id:3,group:'ai',title:'Cloud Computing — Elite Certification',platform:'NPTEL · IIT Kharagpur',date:'Jan–Apr 2025',emoji:'☁️',file:'Cloud_Computing.pdf'},
  {id:4,group:'ai',title:'Computational Theory: Language Principle & Finite Automata',platform:'Infosys Springboard',date:'Aug 2025',emoji:'🔬',file:'Computational_Theory__Language_Principle___Finite_Automata_Theory.pdf'},
  {id:5,group:'db',title:'CRUD Operations',platform:'MongoDB',date:'Jun 2025',emoji:'🍃',file:'mahi-gupta-b650b77d-9491-4b15-94e1-fbef0561b1e5-certificate.pdf'},
  {id:6,group:'db',title:'Relational to Document Model',platform:'MongoDB',date:'Jun 2025',emoji:'🔄',file:'mahi-gupta-56a24524-3b6b-4e40-8023-80842c18f488-certificate.pdf'},
  {id:7,group:'db',title:'Fundamentals of Data Transformation',platform:'MongoDB',date:'Jun 2025',emoji:'⚙️',file:'mahi-gupta-23b9a42a-8a2a-4283-880d-9a762b1339c5-certificate.pdf'},
  {id:8,group:'prog',title:'PHP with Laravel — Master Laravel (43 hrs)',platform:'Udemy',date:'Jan 2026',emoji:'🐘',file:'UdemyEdurev.pdf'},
  {id:9,group:'prog',title:'100 Days of Code: Python Pro Bootcamp (58 hrs)',platform:'Udemy',date:'Dec 2023',emoji:'🐍',file:'python_mooc_certificate_udemy__1_.pdf'},
  {id:10,group:'prog',title:'C++ Skill Up Course',platform:'GeeksforGeeks',date:'2024',emoji:'⚡',file:'gfgCert.pdf'},
  {id:11,group:'prog',title:'Power BI for Beginners',platform:'Simplilearn SkillUP',date:'Nov 2023',emoji:'📊',file:'5830868_Power_BI_for_Beginners_4643408.pdf'},
  {id:12,group:'net',title:'The Bits and Bytes of Computer Networking',platform:'Google via Coursera',date:'Sep 2024',emoji:'🔗',file:'CSE306_CERTIFICATE1__1_.pdf'},
  {id:13,group:'net',title:'Introduction to Hardware and Operating Systems',platform:'IBM via Coursera',date:'Sep 2024',emoji:'💾',file:'CSE211_CERTIFICATE1__1_.pdf'},
  {id:14,group:'soft',title:'Communication in the 21st Century Workplace',platform:'Coursera · UC Irvine',date:'Feb 2026',emoji:'💬',file:'Coursera_soft_skills.pdf'},
  {id:15,group:'soft',title:'Microsoft Excel — Beginner to Advanced (21 hrs)',platform:'Udemy',date:'Dec 2023',emoji:'📋',file:'excel_mooc_certificate_udemy__1_.pdf'}
]));

app.get('/api/education', (req, res) => res.json([
  {id:1,period:'Jun – Jul 2025',title:'Summer Training — LPU',subtitle:'Built Acadex: Real-Time Academic Monitoring Platform',desc:'Full-stack experience, database optimization, data-driven systems across 5+ departments.',emoji:'💼',color:'#e07fa3'},
  {id:2,period:'Jul 2023 – Present',title:'B.Tech Computer Science & Engineering',subtitle:'Lovely Professional University, Punjab',score:'CGPA: 8.51',emoji:'🎓',color:'#7c5cbf'},
  {id:3,period:'November 2025',title:'Cybersecurity Workshop — AWS',subtitle:'Industry workshop on cloud security & best practices',emoji:'☁️',color:'#ff9900'},
  {id:4,period:'March 2024',title:'Code-A-Haunt Hackathon',subtitle:'24-Hour Web Development Hackathon',desc:'Collaborated in a team to build and deploy a web project under 24-hour pressure.',emoji:'🏆',color:'#e07fa3'},
  {id:5,period:'2020 – 2022',title:'Intermediate (Class XII)',subtitle:'City Montessori School, Aliganj, Lucknow',score:'94.3%',emoji:'🏫',color:'#85b8c8'},
  {id:6,period:'2018 – 2020',title:'Matriculation (Class X)',subtitle:'City Montessori School, Aliganj, Lucknow',score:'95.6%',emoji:'🏅',color:'#c9a84c'}
]));

app.get('/api/documents', (req, res) => res.json([
  {id:'cv',name:'Mahi Gupta — Curriculum Vitae',meta:'Full Resume · Skills, Projects & Certificates',emoji:'📄',file:'MyFinalCV.pdf',featured:true},
  {id:'cert1',name:'ChatGPT-4 Prompt Engineering',meta:'Infosys Springboard · Aug 2025',emoji:'🤖',file:'1-e892b5ce-154d-46b3-b028-de8d30348291.pdf'},
  {id:'cert2',name:'Build Generative AI Apps with No-Code Tools',meta:'Infosys Springboard · Aug 2025',emoji:'✨',file:'1-aac980b1-be3e-4ed3-a14d-58ff567e57ad.pdf'},
  {id:'cert3',name:'Computational Theory: Language Principle & Finite Automata',meta:'Infosys Springboard · Aug 2025',emoji:'🔬',file:'Computational_Theory__Language_Principle___Finite_Automata_Theory.pdf'},
  {id:'cert4',name:'Computational Theory (Wingspan Certificate)',meta:'Infosys Springboard · Dec 2025',emoji:'💡',file:'1-dc0f9f77-c7bf-4bf6-a9a2-4159138deffa.pdf'},
  {id:'cert5',name:'Cloud Computing — Elite Certification',meta:'NPTEL · IIT Kharagpur · Jan–Apr 2025',emoji:'☁️',file:'Cloud_Computing.pdf'},
  {id:'cert6',name:'PHP with Laravel — Master Laravel',meta:'Udemy · 43 hrs · Jan 2026',emoji:'🐘',file:'UdemyEdurev.pdf'},
  {id:'cert7',name:'Communication in the 21st Century Workplace',meta:'Coursera · UC Irvine · Feb 2026',emoji:'💬',file:'Coursera_soft_skills.pdf'},
  {id:'cert8',name:'MongoDB: CRUD Operations',meta:'MongoDB · Jun 2025',emoji:'🍃',file:'mahi-gupta-b650b77d-9491-4b15-94e1-fbef0561b1e5-certificate.pdf'},
  {id:'cert9',name:'MongoDB: Relational to Document Model',meta:'MongoDB · Jun 2025',emoji:'🔄',file:'mahi-gupta-56a24524-3b6b-4e40-8023-80842c18f488-certificate.pdf'},
  {id:'cert10',name:'MongoDB: Fundamentals of Data Transformation',meta:'MongoDB · Jun 2025',emoji:'⚙️',file:'mahi-gupta-23b9a42a-8a2a-4283-880d-9a762b1339c5-certificate.pdf'},
  {id:'cert11',name:'C++ Skill Up Course',meta:'GeeksforGeeks · 2024',emoji:'⚡',file:'gfgCert.pdf'},
  {id:'cert12',name:'100 Days of Code: Python Pro Bootcamp',meta:'Udemy · 58 hrs · Dec 2023',emoji:'🐍',file:'python_mooc_certificate_udemy__1_.pdf'},
  {id:'cert13',name:'Microsoft Excel — Beginner to Advanced',meta:'Udemy · 21 hrs · Dec 2023',emoji:'📋',file:'excel_mooc_certificate_udemy__1_.pdf'},
  {id:'cert14',name:'Power BI for Beginners',meta:'Simplilearn SkillUP · Nov 2023',emoji:'📊',file:'5830868_Power_BI_for_Beginners_4643408.pdf'},
  {id:'cert15',name:'Introduction to Hardware and Operating Systems',meta:'IBM via Coursera · Sep 2024',emoji:'💾',file:'CSE211_CERTIFICATE1__1_.pdf'},
  {id:'cert16',name:'The Bits and Bytes of Computer Networking',meta:'Google via Coursera · Sep 2024',emoji:'🔗',file:'CSE306_CERTIFICATE1__1_.pdf'}
]));

app.get('/api/visitors', async (req, res) => {
  try {
    let v = await Visitor.findOne();
    if (!v) v = await Visitor.create({ count: 0 });
    v.count += 1; await v.save();
    res.json({ count: v.count });
  } catch { res.json({ count: 247 }); }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required.' });
    if (mongoose.connection.readyState === 1) await Message.create({ name, email, subject, message });

    // Send the email to the owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ivory.roses.1437@gmail.com',
      subject: `New Portfolio Message from ${name} - ${subject || 'No Subject'}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'None'}\n\nMessage:\n${message}\n\n---\nReply directly to ${email} to answer this message.`
    };
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("Error sending email:", error);
      });
    } else {
      console.warn("Email variables (EMAIL_USER or EMAIL_PASS) are not set. Message saved to DB but no email sent.");
    }

    res.json({ success: true, message: "Message sent! I'll get back to you soon 💜" });
  } catch (err) { 
    console.error("Contact Form Error:", err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' }); 
  }
});

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
