import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

// Main Component
export const Main = () => {
  return (
    <div style={styles.container}>
      <Profile />
      <ActivityAndNotifications />
      <Leaderboard />
    </div>
  );
};

// Profile Component (Left Sidebar)
const Profile = () => {
  return (
    <aside style={styles.sidebarLeft}>
      <div style={styles.profile}>
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          style={styles.profilePicture}
        />
        <h2 style={styles.name}>John Doe</h2>
        <h4 style={styles.username}>@john_doe</h4>
        <p style={styles.place}>New York, USA</p>
        <div style={styles.scoreBox}>
          <p style={styles.contributionScore}>Contribution Score: 1200</p>
        </div>
        <div style={styles.scoreBox}>
          <p style={styles.creditScore}>Credit Score: 750</p>
        </div>
      </div>
    </aside>
  );
};

// Recycling Counter Component
const RecyclingCounter = () => {
  const [recycledCount, setRecycledCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate recycling count update every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRecycledCount((prev) => prev + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // End animation after 1 second
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.recyclingCounter}>
      <h3>Live Recycling Counter</h3>
      <div style={styles.counterDisplay}>
        {recycledCount} Items Recycled
        <div style={{ position: 'relative' }}>
          <div
            style={{
              ...styles.plasticItem,
              transform: isAnimating ? 'translateY(0px)' : 'translateY(-200px)',
              opacity: isAnimating ? 1 : 0,
              transition: 'transform 1s ease, opacity 1s ease',
            }}
          >
            ♻️
          </div>
          <div style={styles.bin}>🗑️</div>
        </div>
      </div>
    </div>
  );
};

// Eco-Friendly Product Showcase Component
const EcoFriendlyProductShowcase = () => {
  const products = [
    { id: 1, name: 'Reusable Water Bottle', points: 200 },
    { id: 2, name: 'Bamboo Toothbrush', points: 150 },
    { id: 3, name: 'Eco-Friendly Bag', points: 100 },
    { id: 4, name: 'Compostable Plates', points: 250 },
  ];

  return (
    <div style={styles.productShowcase}>
      <h3>Eco-Friendly Products</h3>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <p style={styles.productName}>{product.name}</p>
            <p>Cost: {product.points} points</p>
            <button style={styles.redeemButton}>Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Donut Chart Component
const DonutChart = () => {
  const data = {
    labels: ['Recycled', 'Remaining'],
    datasets: [
      {
        data: [70, 30], // Example data
        backgroundColor: ['#4caf50', '#e0e0e0'],
        hoverBackgroundColor: ['#66bb6a', '#cfd8dc'],
      },
    ],
  };

  return (
    <div style={styles.donutChart}>
      <h3>Recycling Progress</h3>
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

// Audience Growth Line Chart Component
const AudienceGrowth = () => {
  const data = {
    labels: ['1 Feb', '2 Feb', '3 Feb', '4 Feb', '5 Feb', '6 Feb', '7 Feb'],
    datasets: [
      {
        label: 'Organic Page Likes',
        data: [12, 10, 14, 15, 18, 20, 25],
        borderColor: '#FF6600',
        fill: false,
      },
      {
        label: 'Paid Page Likes',
        data: [8, 9, 10, 12, 14, 16, 18],
        borderColor: '#6610f2',
        fill: false,
      },
      {
        label: 'Page Unlikes',
        data: [5, 4, 6, 5, 7, 8, 9],
        borderColor: '#999999',
        fill: false,
      },
    ],
  };

  return (
    <div style={styles.chartContainer}>
      <h3>Audience Growth</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

// Achievement Badges Component
const AchievementBadges = () => {
  const badges = [
    { id: 1, name: 'Recycling Rookie', milestone: '5 items recycled' },
    { id: 2, name: 'Eco Warrior', milestone: '50 items recycled' },
    { id: 3, name: 'Sustainability Champion', milestone: '100 items recycled' },
  ];

  return (
    <div style={styles.badges}>
      <h3>Achievement Badges</h3>
      <div style={styles.badgeGrid}>
        {badges.map((badge) => (
          <div key={badge.id} style={styles.badgeCard}>
            <p>{badge.name}</p>
            <p>{badge.milestone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity & Notifications Component (Main Content)
const ActivityAndNotifications = () => {
  return (
    <main style={styles.mainContent}>
      <RecyclingCounter />
      <EcoFriendlyProductShowcase />
      <AchievementBadges />
      <AudienceGrowth />
      <section style={styles.activitySection}>
        <h3>Recent Activity</h3>
        <div style={styles.activityCard}>Posted an article - 2 hours ago</div>
        <div style={styles.activityCard}>Commented on a discussion - 1 day ago</div>
        <div style={styles.activityCard}>Upvoted a post - 3 days ago</div>
      </section>
      <section style={styles.notificationSection}>
        <h3>Notifications</h3>
        <div style={styles.notificationCard}>You have 3 new comments</div>
        <div style={styles.notificationCard}>Your post was upvoted by 5 people</div>
      </section>
    </main>
  );
};

// Leaderboard Component (Right Sidebar)
const Leaderboard = () => {
  return (
    <aside style={styles.sidebarRight}>
      <h3>Leaderboard</h3>
      <div style={styles.leaderboardContainer}>
        <ul style={styles.leaderboard}>
          {Array.from({ length: 50 }).map((_, index) => (
            <li key={index} style={styles.leaderboardItem}>
              <span>{index + 1}.</span> User {index + 1} - {Math.floor(Math.random() * 2000)} points
            </li>
          ))}
        </ul>
      </div>
      <DonutChart />
    </aside>
  );
};

// Inline Styles
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '20px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  sidebarLeft: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
  },
  profile: {
    textAlign: 'center',
  },
  profilePicture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  username: {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '5px',
  },
  place: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '20px',
  },
  scoreBox: {
    marginBottom: '15px',
  },
  contributionScore: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  creditScore: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  recyclingCounter: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  counterDisplay: {
    fontSize: '24px',
    fontWeight: 'bold',
    position: 'relative',
  },
  plasticItem: {
    fontSize: '50px',
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'transform 1s ease, opacity 1s ease',
  },
  bin: {
    fontSize: '50px',
  },
  productShowcase: {
    marginTop: '20px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
  },
  productName: {
    fontWeight: 'bold',
  },
  redeemButton: {
    marginTop: '5px',
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  donutChart: {
    marginTop: '20px',
    width: '150px',
    height: '150px',
  },
  chartContainer: {
    marginTop: '20px',
  },
  badges: {
    marginTop: '20px',
  },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  badgeCard: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
  },
  mainContent: {
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    margin: '20px 0',
  },
  activitySection: {
    marginTop: '20px',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '10px',
  },
  notificationSection: {
    marginTop: '20px',
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '10px',
  },
  sidebarRight: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    height: '100vh', // Adjust to fit the height
    overflowY: 'auto', // Enable scrolling for the leaderboard
  },
  leaderboardContainer: {
    maxHeight: '400px', // Set a max height for the leaderboard to enable scrolling
    overflowY: 'auto',
  },
  leaderboard: {
    listStyle: 'none',
    padding: 0,
  },
  leaderboardItem: {
    padding: '5px 0',
    borderBottom: '1px solid #ccc',
  },
};
