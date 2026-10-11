// Edit this file to match your board's syllabus (subjects) and to add YouTube videos.

export const BRANCHES = ["Computer", "Civil", "Electrical", "Electronics", "Mechanical", "Chemical"];
export const SEMESTERS = [1, 2, 3, 4, 5, 6];

const thisYear = new Date().getFullYear();
export const YEARS = Array.from({ length: 8 }, (_, i) => thisYear - i);

// Semester 1 and 2 are common for all branches.
const FIRST_YEAR = {
  1: ["Basic Mathematics", "Basic Physics", "Basic Chemistry", "English", "Engineering Graphics"],
  2: ["Applied Mathematics", "Applied Science", "Environmental Studies", "Basics of Programming", "Workshop Practice"],
};

const LATER = {
  Computer: {
    3: ["Data Structures using C", "Database Management System", "Digital Techniques", "Object Oriented Programming using C++", "Computer Graphics"],
    4: ["Java Programming", "Data Communication and Computer Network", "Microprocessor", "Software Engineering", "Python Programming"],
    5: ["Operating System", "Software Testing", "Advanced Java Programming", "Mobile Computing", "Web Technologies"],
    6: ["Cloud Computing", "Network and Information Security", "Mobile App Development", "Emerging Trends in Computer Engineering", "Project"],
  },
  Civil: {
    3: ["Mechanics of Structures", "Surveying", "Building Construction", "Highway Engineering", "Concrete Technology"],
    4: ["Theory of Structures", "Hydraulics", "Geotechnical Engineering", "Transportation Engineering", "Estimating and Costing"],
    5: ["Design of RCC Structures", "Water Supply Engineering", "Environmental Engineering", "Construction Management", "Quantity Surveying"],
    6: ["Design of Steel Structures", "Irrigation Engineering", "Advanced Surveying", "Project Management", "Project"],
  },
  Electrical: {
    3: ["Electrical Circuits", "Electrical Machines I", "Electrical Measurements", "Analog Electronics", "Electrical Materials"],
    4: ["AC Machines", "Power Systems I", "Power Electronics", "Digital Electronics", "Microcontroller"],
    5: ["Switchgear and Protection", "Utilization of Electrical Energy", "Industrial Automation", "Electrical Design", "Power Systems II"],
    6: ["Control Systems", "Energy Audit", "Electrical Drives", "Renewable Energy", "Project"],
  },
  Electronics: {
    3: ["Electronic Devices and Circuits", "Digital Techniques", "Electrical Circuits", "Electronic Measurements", "Principles of Communication"],
    4: ["Linear Integrated Circuits", "Microcontroller", "Communication Systems", "Power Electronics", "Network Theory"],
    5: ["Embedded Systems", "Consumer Electronics", "Industrial Automation", "Mobile Communication", "Computer Networks"],
    6: ["Optical Fibre Communication", "Advanced Microcontroller", "VLSI Basics", "Entrepreneurship Development", "Project"],
  },
  Mechanical: {
    3: ["Strength of Materials", "Thermodynamics", "Fluid Mechanics", "Manufacturing Processes", "Machine Drawing"],
    4: ["Theory of Machines", "Machine Tools", "Fluid Machinery", "Metrology", "Thermal Engineering"],
    5: ["Design of Machine Elements", "Industrial Engineering", "CAD/CAM", "Refrigeration and Air Conditioning", "Power Plant Engineering"],
    6: ["Mechatronics", "Maintenance Engineering", "Production Planning", "Automobile Engineering", "Project"],
  },
  Chemical: {
    3: ["Chemical Process Calculations", "Fluid Flow Operations", "Organic Chemistry", "Physical Chemistry", "Mechanical Operations"],
    4: ["Heat Transfer", "Mass Transfer I", "Inorganic Chemical Technology", "Process Instrumentation", "Chemical Engineering Thermodynamics"],
    5: ["Mass Transfer II", "Chemical Reaction Engineering", "Organic Process Technology", "Process Control", "Industrial Safety"],
    6: ["Plant Design", "Environmental Engineering", "Petroleum Refining", "Project Management", "Project"],
  },
};

export const subjectsFor = (branch, sem) => (sem <= 2 ? FIRST_YEAR[sem] : LATER[branch][sem]);

// Add your YouTube videos here. branch: one of BRANCHES.
export const VIDEOS = [
  // { title: "Data Structures: Linked List", branch: "Computer", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
];
