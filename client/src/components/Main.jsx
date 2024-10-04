import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

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
        <h2 style={styles.name}>channarama</h2>
        <h4 style={styles.username}>@channarama</h4>
        <p style={styles.place}>Tumkur,india</p>
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

// Audience Growth Line Chart Component (Updated to show plastic recycled and amount earned)
const PlasticRecyclingGraph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Plastic Recycled (kg)',
        data: [5, 12, 8, 18, 15, 9, 20],
        borderColor: '#4caf50',
        fill: false,
      },
      {
        label: 'Amount Earned ($)',
        data: [50, 120, 80, 180, 150, 90, 200],
        borderColor: '#FF6600',
        fill: false,
      },
    ],
  };

  return (
    <div style={styles.chartContainer}>
      <h3>Recycling Overview</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

// Activity & Notifications Component (Main Content)
const ActivityAndNotifications = () => {
  return (
    <main style={styles.mainContent}>
      <AchievementBadges />
      <EcoFriendlyProductShowcase />
      <PlasticRecyclingGraph />
      <section style={styles.notificationSection}>
        <h3>Notifications</h3>
        <div style={styles.notificationCard}>You have 3 new comments</div>
        <div style={styles.notificationCard}>Your post was upvoted by 5 people</div>
        <div style={styles.notificationCard}>You earned 200 points for recycling</div>
        <div style={styles.notificationCard}>New badge: Eco Warrior unlocked!</div>
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
  chartContainer: {
    marginTop: '20px',
  },
  mainContent: {
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    margin: '20px 0',
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
    overflowY: 'scroll',
  },
  leaderboard: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  leaderboardItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Main;
