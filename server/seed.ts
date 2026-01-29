import { db } from "./db";
import { blogPosts } from "@shared/schema";
import { randomUUID } from "crypto";

const blogContentPool = [
  {
    category: "Artificial Intelligence",
    title: "The Future of AI-Powered Business Solutions in 2025",
    excerpt: "Explore how artificial intelligence is transforming the way businesses operate, from automated workflows to intelligent decision-making systems that drive unprecedented efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=3840&q=80",
    featured: true,
  },
  {
    category: "Startups",
    title: "From Idea to Launch: A Complete Guide for First-Time Founders",
    excerpt: "Everything you need to know about validating your startup idea, building an MVP, and securing your first customers in today's competitive market.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=3840&q=80",
    featured: false,
  },
  {
    category: "Innovation",
    title: "How Tech Leaders Are Connecting Visionaries with Solutions",
    excerpt: "Discover the platforms that match entrepreneurs with experienced technology officers to bring groundbreaking ideas to life faster than ever.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=3840&q=80",
    featured: false,
  },
  {
    category: "E-Commerce",
    title: "Why Zero-Commission Marketplaces Are the Future of Online Selling",
    excerpt: "Learn how innovative marketplace platforms are revolutionizing e-commerce by eliminating fees and empowering sellers worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=3840&q=80",
    featured: false,
  },
  {
    category: "Machine Learning",
    title: "Deep Learning Breakthroughs Reshaping Healthcare Diagnostics",
    excerpt: "How neural networks are achieving superhuman accuracy in detecting diseases, from cancer screening to rare genetic conditions.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=3840&q=80",
    featured: true,
  },
  {
    category: "Cybersecurity",
    title: "Zero Trust Architecture: The New Standard for Enterprise Security",
    excerpt: "Understanding why traditional perimeter-based security is obsolete and how organizations are adopting zero trust frameworks.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=3840&q=80",
    featured: false,
  },
  {
    category: "Cloud Computing",
    title: "Multi-Cloud Strategies: Balancing Performance and Cost",
    excerpt: "Enterprise architects reveal their approaches to leveraging multiple cloud providers while avoiding vendor lock-in.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=3840&q=80",
    featured: false,
  },
  {
    category: "Blockchain",
    title: "Enterprise Blockchain Adoption Reaches Critical Mass",
    excerpt: "Fortune 500 companies are finally moving beyond pilots to production-grade blockchain implementations for supply chain and finance.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3840&q=80",
    featured: false,
  },
  {
    category: "Fintech",
    title: "The Rise of Embedded Finance in SaaS Platforms",
    excerpt: "How software companies are integrating financial services directly into their products, creating new revenue streams.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=3840&q=80",
    featured: true,
  },
  {
    category: "Remote Work",
    title: "Async-First Culture: Building High-Performance Distributed Teams",
    excerpt: "The strategies top remote companies use to maintain productivity and culture without constant video meetings.",
    imageUrl: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=3840&q=80",
    featured: false,
  },
  {
    category: "Data Science",
    title: "Real-Time Analytics at Scale: Modern Data Pipeline Architecture",
    excerpt: "Engineering teams share their approaches to processing millions of events per second with sub-second latency.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=3840&q=80",
    featured: false,
  },
  {
    category: "DevOps",
    title: "Platform Engineering: The Evolution Beyond DevOps",
    excerpt: "How internal developer platforms are reducing cognitive load and accelerating software delivery at enterprise scale.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=3840&q=80",
    featured: false,
  },
  {
    category: "Quantum Computing",
    title: "Quantum Advantage Achieved: What It Means for Industry",
    excerpt: "Recent breakthroughs in quantum error correction are bringing practical quantum computing closer to reality.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=3840&q=80",
    featured: true,
  },
  {
    category: "Sustainability",
    title: "Green Tech: Carbon-Neutral Data Centers Lead the Way",
    excerpt: "Major cloud providers reveal their roadmaps to achieving net-zero emissions across global infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=3840&q=80",
    featured: false,
  },
  {
    category: "Mobile Development",
    title: "Cross-Platform Frameworks: React Native vs Flutter in 2025",
    excerpt: "A comprehensive comparison of the leading mobile development frameworks based on performance, developer experience, and ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=3840&q=80",
    featured: false,
  },
  {
    category: "Automation",
    title: "Intelligent Process Automation Transforms Back-Office Operations",
    excerpt: "How RPA combined with AI is eliminating manual data entry and reducing processing times by 90%.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=3840&q=80",
    featured: false,
  },
  {
    category: "AI Ethics",
    title: "Responsible AI: Building Fairness Into Machine Learning Models",
    excerpt: "Techniques for detecting and mitigating bias in AI systems before they impact real-world decisions.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=3840&q=80",
    featured: true,
  },
  {
    category: "Edge Computing",
    title: "5G and Edge: Enabling Real-Time AI at the Network Edge",
    excerpt: "How telecom companies are deploying AI inference capabilities closer to users for ultra-low latency applications.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=3840&q=80",
    featured: false,
  },
  {
    category: "API Economy",
    title: "GraphQL Federation: Scaling API Architecture for Microservices",
    excerpt: "Large organizations share their experiences implementing federated GraphQL across hundreds of services.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=3840&q=80",
    featured: false,
  },
  {
    category: "Venture Capital",
    title: "AI Startups Lead Q4 Funding Despite Market Uncertainty",
    excerpt: "Analysis of venture capital trends shows continued strong investment in artificial intelligence and automation.",
    imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=3840&q=80",
    featured: false,
  },
  {
    category: "Digital Transformation",
    title: "Legacy Modernization: Strategies for Migrating Mainframe Systems",
    excerpt: "Banks and insurers share lessons learned from decades-long efforts to modernize core systems.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=3840&q=80",
    featured: true,
  },
  {
    category: "IoT",
    title: "Industrial IoT Security: Protecting Connected Manufacturing",
    excerpt: "Best practices for securing operational technology networks against increasingly sophisticated threats.",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=3840&q=80",
    featured: false,
  },
  {
    category: "SaaS",
    title: "Product-Led Growth: The New Playbook for B2B Software",
    excerpt: "How successful SaaS companies are using free trials and self-service to drive adoption at scale.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=3840&q=80",
    featured: false,
  },
  {
    category: "Robotics",
    title: "Warehouse Automation: Robots and Humans Working Together",
    excerpt: "Inside Amazon and Walmart's next-generation fulfillment centers where collaborative robots boost efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=3840&q=80",
    featured: false,
  },
  {
    category: "Natural Language",
    title: "Large Language Models Transform Enterprise Knowledge Management",
    excerpt: "How companies are using GPT and similar models to unlock value from unstructured corporate data.",
    imageUrl: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=3840&q=80",
    featured: true,
  },
  {
    category: "Web3",
    title: "Decentralized Identity: The Future of Digital Authentication",
    excerpt: "Self-sovereign identity solutions promise to give users control over their personal data across platforms.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=3840&q=80",
    featured: false,
  },
  {
    category: "AR/VR",
    title: "Spatial Computing: Apple Vision Pro Sparks Enterprise Interest",
    excerpt: "Early adopters in healthcare, manufacturing, and design share their experiences with spatial computing.",
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=3840&q=80",
    featured: false,
  },
  {
    category: "Observability",
    title: "OpenTelemetry Becomes the Standard for Distributed Tracing",
    excerpt: "The open-source observability framework reaches production maturity as cloud-native adoption accelerates.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=3840&q=80",
    featured: false,
  },
  {
    category: "AI Infrastructure",
    title: "GPU Shortage Drives Innovation in AI Hardware Alternatives",
    excerpt: "Startups develop specialized chips and novel architectures to meet surging demand for AI compute.",
    imageUrl: "https://images.unsplash.com/photo-1591238372338-22d30c883a86?w=3840&q=80",
    featured: true,
  },
  {
    category: "Privacy Tech",
    title: "Privacy-Preserving AI: Federated Learning Goes Mainstream",
    excerpt: "Healthcare and finance sectors adopt techniques that enable AI training without exposing sensitive data.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=3840&q=80",
    featured: false,
  },
  {
    category: "Developer Tools",
    title: "AI Coding Assistants Boost Developer Productivity by 40%",
    excerpt: "Studies confirm that GitHub Copilot and similar tools significantly accelerate software development.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=80",
    featured: false,
  },
  {
    category: "Digital Payments",
    title: "Central Bank Digital Currencies: Global Adoption Accelerates",
    excerpt: "Over 100 countries now exploring CBDCs as the future of money takes shape.",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=3840&q=80",
    featured: false,
  },
];

function getDailyPosts() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const startIndex = (dayOfYear * 4) % blogContentPool.length;
  const posts = [];
  
  for (let i = 0; i < 4; i++) {
    const index = (startIndex + i) % blogContentPool.length;
    posts.push({
      ...blogContentPool[index],
      featured: i === 0,
    });
  }
  
  return posts;
}

function generateRandomStats() {
  return {
    likes: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 50) + 10,
  };
}

export async function seedDatabase() {
  try {
    await db.delete(blogPosts);
    
    const dailyPosts = getDailyPosts();
    const today = new Date();
    
    const postsToInsert = dailyPosts.map((post, index) => {
      const daysAgo = index * 2;
      const publishDate = new Date(today);
      publishDate.setDate(publishDate.getDate() - daysAgo);
      const stats = generateRandomStats();
      
      return {
        id: randomUUID(),
        category: post.category,
        title: post.title,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        likes: stats.likes,
        comments: stats.comments,
        featured: post.featured,
        publishedAt: publishDate,
      };
    });

    await db.insert(blogPosts).values(postsToInsert);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
