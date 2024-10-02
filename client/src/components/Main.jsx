import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../components/CSS/main.css'

export function Main() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ActivityCards />
        <ActivityGraph />
        <Notifications />
      </div>
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src="https://via.placeholder.com/100"
        alt="User Profile"
        className="profile-photo"
      />
      <h2>John Doe</h2>
      <div className="money-earned">
        <span>$50.00</span>
      </div>
      <div className="credit-score">
        <p>Sustainability Score: 850/1000</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: '85%' }}></div>
        </div>
      </div>
    </div>
  );
};

const ActivityCards = () => {
  const activities = [
    { date: 'Sept 28, 2024', plastic: '5 kg', moneyEarned: '$2.50', creditPoints: '+50' },
    { date: 'Sept 27, 2024', plastic: '3 kg', moneyEarned: '$1.80', creditPoints: '+30' },
  ];

  return (
    <div className="activity-cards">
      {activities.map((activity, index) => (
        <div className="activity-card" key={index}>
          <p>{activity.date}</p>
          <p>{activity.plastic} of plastic recycled</p>
          <p>Earned: {activity.moneyEarned}</p>
          <p>Credit Score: {activity.creditPoints}</p>
        </div>
      ))}
    </div>
  );
};

const Notifications = () => {
  const notifications = [
    { message: 'You recycled 3 kg of plastic today!', time: '10 minutes ago' },
    { message: 'New recycling center near you!', time: 'Yesterday' },
  ];

  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div className="notification" key={index}>
          <p>{notification.time}</p>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

const ActivityGraph = () => {
  const data = {
    labels: ['Sept 24', 'Sept 25', 'Sept 26', 'Sept 27', 'Sept 28'],
    datasets: [
      {
        label: 'Plastic Recycled (kg)',
        data: [2, 3, 1, 4, 5],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
      },
      {
        label: 'Money Earned ($)',
        data: [1, 1.5, 0.5, 2, 2.5],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="activity-graph">
      <Line data={data} />
    </div>
  );
};


