import NewsSection from '../common/NewsSection';
import CategoryPanel from '../components/category_panel/CategoryPanel';
import NewsGridSection from '../components/news_grid_section/NewsGridSection';
import CategoryNews from '../components/News_Grid/CategoryNews';
import FeaturedNews from '../components/News_Grid/FeaturedNews';
import NewsletterSignup from '../components/News_Grid/NewsletterSignup';
import NewsTicker from '../components/News_Grid/NewsTicker';
import StockTicker from '../components/News_Grid/StockTicker';
import styles from './theme/css/HomePage.module.css'

export default function HomePage() {

  const categoryNewsItems = {
    Technology: [
      {
        id: 'tech1',
        image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Technology',
        title: 'Next-Generation AI Tools Transform Software Development',
        description: 'New AI-powered development environments are reducing coding time by up to 70% while improving code quality.',
        author: {
          name: 'David Kumar',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 12, 2025',
      },
      {
        id: 'tech2',
        image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Technology',
        title: 'Quantum Computing Reaches Important Milestone',
        description: 'Researchers achieve quantum advantage in solving complex problems, outperforming traditional supercomputers.',
        author: {
          name: 'Lisa Chen',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 11, 2025',
      },
      {
        id: 'tech3',
        image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Technology',
        title: 'Virtual Reality Goes Mainstream with New Consumer Headsets',
        description: 'Affordable new VR devices are driving record adoption rates as content ecosystem expands dramatically.',
        author: {
          name: 'James Wilson',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 10, 2025',
      },
    ],
    Business: [
      {
        id: 'business1',
        image: 'https://images.pexels.com/photos/7078661/pexels-photo-7078661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Business',
        title: 'Sustainable Startups Attract Record Venture Capital',
        description: 'Green technology and sustainability-focused companies see unprecedented investment levels in first quarter.',
        author: {
          name: 'Maria Rodriguez',
          avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 12, 2025',
      },
      {
        id: 'business2',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Business',
        title: 'Remote Work Transforms Commercial Real Estate Market',
        description: 'Major cities see office space repurposed as hybrid work models become the permanent standard.',
        author: {
          name: 'Thomas Wright',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 11, 2025',
      },
      {
        id: 'business3',
        image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Business',
        title: 'New Trade Agreement Boosts Regional Economic Outlook',
        description: 'Countries finalize terms on comprehensive trade deal expected to increase GDP growth for all participants.',
        author: {
          name: 'Anna Kim',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 10, 2025',
      },
    ],
    Health: [
      {
        id: 'health1',
        image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Health',
        title: 'Revolutionary Gene Therapy Approved for Widespread Use',
        description: 'After successful clinical trials, new treatment offers hope for patients with previously incurable genetic disorders.',
        author: {
          name: 'Dr. Samuel Patel',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 12, 2025',
      },
      {
        id: 'health2',
        image: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Health',
        title: 'Mental Health Services Expand Through Telehealth Innovation',
        description: 'New digital platforms make mental healthcare more accessible and affordable across underserved communities.',
        author: {
          name: 'Dr. Emily Johnson',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 11, 2025',
      },
      {
        id: 'health3',
        image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'Health',
        title: 'Wearable Technology Revolutionizes Preventative Healthcare',
        description: 'Advanced health monitoring devices provide early detection of potential issues before symptoms appear.',
        author: {
          name: 'Dr. Michael Zhang',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        publishedAt: 'May 10, 2025',
      },
    ],
  };

  const newsletterCategories = [
    { id: 'tech', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'science', label: 'Science' },
    { id: 'politics', label: 'Politics' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'world', label: 'World News' },
  ];
  const breakingNewsItems = [
    {
      id: 'breaking1',
      text: 'Global climate summit reaches historic agreement on emissions reduction',
      timestamp: '2h ago',
    },
    {
      id: 'breaking2',
      text: 'Major tech company announces revolutionary quantum computing breakthrough',
      timestamp: '3h ago',
    },
    {
      id: 'breaking3',
      text: 'Stock markets show significant gains following positive economic report',
      timestamp: '4h ago',
    },
    {
      id: 'breaking4',
      text: 'International space mission successfully completes first lunar landing in decades',
      timestamp: '5h ago',
    },
    {
      id: 'breaking5',
      text: 'Healthcare breakthrough promises new treatment for chronic conditions',
      timestamp: '6h ago',
    },
  ];

  return (
    <div>
      <NewsTicker items={breakingNewsItems} />

      <StockTicker stocks={[
        { symbol: 'AAPL', price: 175.43, change: 2.15, changePercent: 1.24 },
        { symbol: 'GOOGL', price: 2847.29, change: -15.32, changePercent: -0.54 },
        { symbol: 'MSFT', price: 342.67, change: 5.78, changePercent: 1.71 },
        { symbol: 'TSLA', price: 248.92, change: -8.45, changePercent: -3.28 }
      ]} />

      <FeaturedNews
        image="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title="Global Climate Summit Results in Historic Agreement"
        description="World leaders commit to ambitious carbon reduction targets and increased funding for renewable energy projects in breakthrough agreement."
        author="Emma Thompson"
        publishedAt="May 12, 2025"
        readTime="5 min read"
        isBreaking={true}
      />
      <NewsSection />
      <div className={styles.categorySignUpWrapper}>
        <div className={styles.categoryNewsContainer}>
          <CategoryNews
            categories={Object.keys(categoryNewsItems)}
            items={categoryNewsItems}
          />
        </div>
        <div className={styles.signUpContainer}>
          <NewsletterSignup
            title="Stay Updated"
            subtitle="Get the latest news delivered directly to your inbox. Select the topics you're interested in."
            categories={newsletterCategories}
          />
        </div>
      </div>
      <CategoryPanel />
      <NewsGridSection />
    </div>
  )
}
