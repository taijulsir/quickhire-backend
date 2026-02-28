require('dotenv').config();
const mongoose = require('mongoose');
const { Job } = require('./models');

const jobs = [
  {
    title: 'Email Marketing',
    company: 'Revolut',
    location: 'Madrid, Spain',
    category: 'Marketing',
    type: 'Full Time',
    description: 'Revolut is looking for Email Marketing to help team manage and optimize email marketing campaigns. You will be responsible for creating engaging email content, managing subscriber lists, and analyzing campaign performance.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    category: 'Design',
    type: 'Full Time',
    description: 'Dropbox is looking for Brand Designer to help the team design and develop brand identity. You will work closely with the marketing team to create visual assets for various campaigns.',
    tags: ['Design', 'Business'],
    companyLogo: ''
  },
  {
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    category: 'Marketing',
    type: 'Full Time',
    description: 'Pitch is looking for Customer Manager to join marketing team. You will be responsible for developing and executing email marketing strategies to drive customer engagement.',
    tags: ['Marketing'],
    companyLogo: ''
  },
  {
    title: 'Visual Designer',
    company: 'Blinklist',
    location: 'Granada, Spain',
    category: 'Design',
    type: 'Full Time',
    description: 'Blinklist is looking for Visual Designer to help team design user interfaces and visual elements for our products.',
    tags: ['Design'],
    companyLogo: ''
  },
  {
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    category: 'Design',
    type: 'Full Time',
    description: 'ClassPass is looking for Product Designer to help us create exceptional user experiences for our fitness platform.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    category: 'Design',
    type: 'Full Time',
    description: 'Canva is looking for Lead Engineer to help develop new features and improve existing ones on our design platform.',
    tags: ['Design', 'Business'],
    companyLogo: ''
  },
  {
    title: 'Brand Strategist',
    company: 'GoDaddy',
    location: 'Marseille, France',
    category: 'Marketing',
    type: 'Full Time',
    description: 'GoDaddy is looking for Brand Strategist to join the team and develop brand strategies for our diverse client base.',
    tags: ['Marketing'],
    companyLogo: ''
  },
  {
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    category: 'Technology',
    type: 'Full Time',
    description: 'Twitter is looking for Data Analyst to help team analyze large datasets and provide actionable insights.',
    tags: ['Technology'],
    companyLogo: ''
  },
  {
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    category: 'Marketing',
    type: 'Full Time',
    description: 'Nomad is looking for Social Media Assistant to manage and grow our social media presence across multiple platforms.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Social Media Assistant',
    company: 'Netlify',
    location: 'Paris, France',
    category: 'Marketing',
    type: 'Full Time',
    description: 'Netlify is looking for Social Media Assistant to help manage our online community and social media accounts.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Brand Designer',
    company: 'Maze',
    location: 'San Francisco, USA',
    category: 'Design',
    type: 'Full Time',
    description: 'Maze is looking for Brand Designer to create compelling visual identities and brand assets.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    category: 'Engineering',
    type: 'Full Time',
    description: 'Terraform is looking for Interactive Developer to build engaging web experiences and interactive applications.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'Interactive Developer',
    company: 'Udacity',
    location: 'Hamburg, Germany',
    category: 'Engineering',
    type: 'Full Time',
    description: 'Udacity is looking for Interactive Developer to create innovative educational experiences.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'HR Manager',
    company: 'Packer',
    location: 'Lucern, Switzerland',
    category: 'Human Resource',
    type: 'Full Time',
    description: 'Packer is looking for HR Manager to oversee recruitment, employee relations, and HR operations.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  },
  {
    title: 'HR Manager',
    company: 'Webflow',
    location: 'Lucern, Switzerland',
    category: 'Human Resource',
    type: 'Full Time',
    description: 'Webflow is looking for HR Manager to manage talent acquisition and employee engagement.',
    tags: ['Marketing', 'Design'],
    companyLogo: ''
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    await Job.insertMany(jobs);
    console.log('Seeded jobs successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
