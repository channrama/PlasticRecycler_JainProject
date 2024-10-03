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

ChartJS.register(
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export const Main = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch user data after login
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log("Token retrieved:", storedToken); // Log the token for debugging
      fetchUser(storedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data); // Log the API response to inspect the data

      if (data.user) {
        setUser(data.user);
        setToken(token);
      } else {
        console.log("User data not found in API response.");
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message); // Log the error message for debugging
    }
  };

  return (
    <div style={styles.container}>
      {user ? (
        <>
          <Profile user={user} />
          <ActivityAndNotifications user={user} />
          <Leaderboard />
        </>
      ) : (
        <p>Loading user data...</p>  // Loading message while waiting for user data
      )}
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <aside style={styles.sidebarLeft}>
      <div style={styles.profile}>
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          style={styles.profilePicture}
        />
        <h2 style={styles.name}>{user.username}</h2>
        <h4 style={styles.email}>{user.email}</h4>
        <p style={styles.place}>Phone: {user.phone}</p>
        <p style={styles.place}>Aadhar: {user.aadhar}</p>
        <div style={styles.scoreBox}>
          <p style={styles.contributionScore}>Plastic Items: {user.plasticHistory.length}</p>
        </div>
      </div>
    </aside>
  );
};

const RecyclingCounter = ({ user }) => {
  const [recycledCount, setRecycledCount] = useState(user.plasticHistory.length);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecycledCount((prev) => prev + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

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

const DonutChart = ({ user }) => {
  const data = {
    labels: ['Recycled', 'Remaining'],
    datasets: [
      {
        data: [user.plasticHistory.length, 100 - user.plasticHistory.length],
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

const ActivityAndNotifications = ({ user }) => {
  return (
    <main style={styles.mainContent}>
      <RecyclingCounter user={user} />
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
    borderRadius: '8px',
    padding: '20px',
  },
  profile: {
    textAlign: 'center',
  },
  profilePicture: {
    borderRadius: '50%',
  },
  name: {
    fontSize: '24px',
    margin: '10px 0',
  },
  email: {
    fontSize: '16px',
    margin: '5px 0',
  },
  place: {
    margin: '5px 0',
  },
  scoreBox: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e1f5fe',
    borderRadius: '5px',
  },
  contributionScore: {
    fontWeight: 'bold',
  },
  recyclingCounter: {
    padding: '20px',
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
  },
  counterDisplay: {
    fontSize: '20px',
    textAlign: 'center',
  },
  plasticItem: {
    position: 'absolute',
    fontSize: '50px',
    transition: 'transform 1s ease, opacity 1s ease',
  },
  bin: {
    fontSize: '50px',
  },
  productShowcase: {
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  productCard: {
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  productName: {
    fontWeight: 'bold',
  },
  redeemButton: {
    padding: '5px 10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  donutChart: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
  chartContainer: {
    padding: '20px',
    backgroundColor: '#f3e5f5',
    borderRadius: '8px',
  },
  badges: {
    padding: '20px',
    backgroundColor: '#fff3e0',
    borderRadius: '8px',
  },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  badgeCard: {
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  mainContent: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  activitySection: {
    marginTop: '20px',
  },
  activityCard: {
    padding: '10px',
    backgroundColor: '#e3f2fd',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  notificationSection: {
    marginTop: '20px',
  },
  notificationCard: {
    padding: '10px',
    backgroundColor: '#ffe0b2',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  sidebarRight: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
  },
  leaderboardContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  leaderboard: {
    listStyleType: 'none',
    padding: 0,
  },
  leaderboardItem: {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
  },
};
