import React, { useState, useEffect } from 'react';

// Profile Component (Left Sidebar)
export const Profile = () => {
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

// Animated Recycling Counter Component
export const RecyclingCounter = () => {
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

// Activity & Notifications Component (Main Content)
export const ActivityAndNotifications = () => {
  return (
    <main style={styles.mainContent}>
      <RecyclingCounter />
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
export const Leaderboard = () => {
  return (
    <aside style={styles.sidebarRight}>
      <h3>Leaderboard</h3>
      <ul style={styles.leaderboard}>
        <li style={styles.leaderboardItem}>
          <span>1.</span> Alice - 1800 points
        </li>
        <li style={styles.leaderboardItem}>
          <span>2.</span> Bob - 1750 points
        </li>
        <li style={styles.leaderboardItem}>
          <span>3.</span> Charlie - 1650 points
        </li>
        <li style={styles.leaderboardItem}>
          <span>4.</span> Dave - 1600 points
        </li>
      </ul>
    </aside>
  );
};

// Main Layout Component
export const Main = () => {
  return (
    <div style={styles.container}>
      <Profile />
      <ActivityAndNotifications />
      <Leaderboard />
    </div>
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
    backgroundColor: '#e0f7fa',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  contributionScore: {
    fontWeight: 'bold',
  },
  creditScore: {
    fontWeight: 'bold',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  activitySection: {
    marginBottom: '20px',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  notificationSection: {
    marginBottom: '20px',
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sidebarRight: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
  },
  leaderboard: {
    listStyleType: 'none',
    padding: 0,
  },
  leaderboardItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  recyclingCounter: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  counterDisplay: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    position: 'relative',
  },
  plasticItem: {
    fontSize: '30px',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bin: {
    fontSize: '40px',
    marginTop: '60px',
    textAlign: 'center',
  },
};

export default Main;
