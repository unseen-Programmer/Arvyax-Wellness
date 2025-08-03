import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const API_URL = "https://arvyax-wellness.onrender.com"; // Render backend URL

// 🌟 Home Page
const Home = () => (
  <div className="pt-32 min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF] font-inter relative overflow-hidden">
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#7BC6C4] rounded-full blur-3xl opacity-30 animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#256363] rounded-full blur-3xl opacity-20 animate-pulse"></div>

    <motion.div
      className="max-w-4xl mx-auto text-center px-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#256363] to-[#7BC6C4]">
        Welcome to Arvyax Wellness 🌿
      </h1>
      <p className="mt-4 text-lg text-gray-700">Your personalized journey towards a healthier mind & body.</p>
      <NavLink to="/register">
        <button className="mt-6 px-8 py-3 bg-gradient-to-r from-[#256363] to-[#7BC6C4] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Get Started
        </button>
      </NavLink>
    </motion.div>
  </div>
);

// 📊 My Sessions
const MySessions = () => {
  const data = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 3 },
    { day: 'Wed', sessions: 1 },
    { day: 'Thu', sessions: 4 },
    { day: 'Fri', sessions: 2 },
    { day: 'Sat', sessions: 3 },
    { day: 'Sun', sessions: 5 },
  ];

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-[#F0F4EF] to-[#A7D6D0] px-6 font-inter">
      <motion.h2
        className="text-4xl font-bold text-center text-[#256363] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📅 My Sessions
      </motion.h2>
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sessions" stroke="#256363" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 🛠 Login
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Logging in...");
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch {
      setMessage('⚠️ Unable to connect to server.');
    }
  };

  return (
    <AuthPage
      title="Welcome Back"
      subtitle="Login to continue your wellness journey 🌿"
      formData={formData}
      setFormData={setFormData}
      message={message}
      handleSubmit={handleSubmit}
      isRegister={false}
    />
  );
};

// 🛠 Register
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Registering...");
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Registration successful! You can now login.');
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch {
      setMessage('⚠️ Unable to connect to server.');
    }
  };

  return (
    <AuthPage
      title="Create Account"
      subtitle="Join us and start your wellness journey 🌟"
      formData={formData}
      setFormData={setFormData}
      message={message}
      handleSubmit={handleSubmit}
      isRegister={true}
    />
  );
};

// 🔹 Auth Page Component
const AuthPage = ({ title, subtitle, formData, setFormData, message, handleSubmit, isRegister }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#A7D6D0] via-[#7BC6C4] to-[#256363]">
    <motion.form
      onSubmit={handleSubmit}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px]"
    >
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#256363] to-[#7BC6C4] bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      <p className="text-center text-gray-600 mb-8">{subtitle}</p>
      {isRegister && (
        <input type="text" placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 mb-5 border rounded-lg" />
      )}
      <input type="email" placeholder="Email" value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-3 mb-5 border rounded-lg" />
      <input type="password" placeholder="Password" value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-3 mb-5 border rounded-lg" />
      <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#256363] to-[#7BC6C4] text-white rounded-lg">
        {isRegister ? "Register" : "Login"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </motion.form>
  </div>
);

// Navbar
function Navbar() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/my-sessions', label: 'My Sessions' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];
  return (
    <nav className="w-full bg-gradient-to-r from-[#A7D6D0] to-[#D1E8E2] shadow-md px-8 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-[#256363]">Arvyax Wellness</span>
      </div>
      <div className="flex gap-6">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} className="px-4 py-2">
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
