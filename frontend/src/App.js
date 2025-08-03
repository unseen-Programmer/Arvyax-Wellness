import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://arvyax-wellness.onrender.com"; 


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

    <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
      {[
        { title: "Yoga", emoji: "🧘‍♀️", desc: "Improve flexibility & balance." },
        { title: "Meditation", emoji: "🧠", desc: "Find your inner peace." },
        { title: "Breathing", emoji: "🌬️", desc: "Boost focus & energy." },
        { title: "Nutrition", emoji: "🥗", desc: "Fuel your body right." }
      ].map((item, i) => (
        <motion.div
          key={i}
          className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl">{item.emoji}</div>
          <h3 className="text-xl font-semibold text-[#256363] mt-3">{item.title}</h3>
          <p className="text-gray-600 mt-2">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

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

const SessionEditor = () => {
  const activities = [
    { title: "🧘 Yoga", desc: "Boost flexibility & inner peace", color: "from-[#FDE68A] to-[#FCA5A5]" },
    { title: "🧠 Meditation", desc: "Calm your mind and focus", color: "from-[#A7F3D0] to-[#6EE7B7]" },
    { title: "🌬️ Breathing", desc: "Increase focus & reduce stress", color: "from-[#BFDBFE] to-[#93C5FD]" },
    { title: "🏃 Running", desc: "Improve stamina & health", color: "from-[#FBCFE8] to-[#F9A8D4]" },
  ];

  const [plan, setPlan] = useState([]);
  const addToPlan = (activity) => !plan.includes(activity) && setPlan([...plan, activity]);
  const removeFromPlan = (activity) => setPlan(plan.filter((item) => item !== activity));

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF] px-6 font-inter">
      <motion.h2
        className="text-4xl font-bold text-center text-[#256363] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✏️ Build Your Wellness Session
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold text-[#256363] mb-4">Choose Activities</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {activities.map((act, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl shadow-lg cursor-pointer bg-gradient-to-r ${act.color} text-white hover:scale-105`}
                whileHover={{ rotate: 2, scale: 1.05 }}
                onClick={() => addToPlan(act)}
              >
                <div className="text-4xl">{act.title.split(" ")[0]}</div>
                <h4 className="mt-2 text-lg font-bold">{act.title.split(" ")[1]}</h4>
                <p className="text-sm opacity-90">{act.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#256363] mb-4">Your Session Plan</h3>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 min-h-[250px]">
            {plan.length === 0 ? (
              <p className="text-gray-500 text-center">No activities yet. Click an activity to add it here.</p>
            ) : (
              <ul className="space-y-4">
                {plan.map((act, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#7BC6C4] to-[#A7D6D0] text-[#256363] font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {act.title}
                    <button
                      onClick={() => removeFromPlan(act)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//  Login
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        setTimeout(() => { navigate('/dashboard'); }, 1000);
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

//  Register
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        localStorage.setItem('token', data.token);
        setMessage('✅ Registration successful! Redirecting...');
        setTimeout(() => { navigate('/dashboard'); }, 1000);
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


const AuthPage = ({ title, subtitle, formData, setFormData, message, handleSubmit, isRegister }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#A7D6D0] via-[#7BC6C4] to-[#256363]">
    <motion.div className="absolute w-96 h-96 bg-[#ffffff33] rounded-full blur-3xl"
      animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
      transition={{ repeat: Infinity, duration: 6 }}
      style={{ top: "-100px", left: "-100px" }}
    />
    <motion.div className="absolute w-[500px] h-[500px] bg-[#ffffff22] rounded-full blur-3xl"
      animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
      transition={{ repeat: Infinity, duration: 8 }}
      style={{ bottom: "-150px", right: "-150px" }}
    />
    <motion.form
      onSubmit={handleSubmit}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px] border border-white/40"
    >
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#256363] to-[#7BC6C4] bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      <p className="text-center text-gray-600 mb-8">{subtitle}</p>
      {isRegister && (
        <motion.input whileFocus={{ scale: 1.02 }} type="text" name="name" placeholder="Name"
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 mb-5 border rounded-lg outline-none focus:ring-2 focus:ring-[#256363]" />
      )}
      <motion.input whileFocus={{ scale: 1.02 }} type="email" name="email" placeholder="Email"
        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-3 mb-5 border rounded-lg outline-none focus:ring-2 focus:ring-[#256363]" />
      <motion.input whileFocus={{ scale: 1.02 }} type="password" name="password" placeholder="Password"
        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-3 mb-5 border rounded-lg outline-none focus:ring-2 focus:ring-[#256363]" />
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#256363] to-[#7BC6C4] text-white rounded-lg shadow-lg font-semibold">
        {isRegister ? "Register" : "Login"}
      </motion.button>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </motion.form>
  </div>
);


function Navbar() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/my-sessions', label: 'My Sessions' },
    { to: '/session-editor', label: 'Session Editor' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];
  return (
    <nav className="w-full bg-gradient-to-r from-[#A7D6D0] to-[#D1E8E2] shadow-md px-8 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/hero.svg" alt="Logo" className="w-8 h-8" />
        <span className="text-2xl font-extrabold text-[#256363] tracking-tight font-[Inter]">
          Arvyax Wellness
        </span>
      </div>
      <div className="flex gap-6">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-[#7BC6C4] to-[#A7D6D0] text-[#256363] shadow-md'
                : 'text-[#256363] hover:bg-gradient-to-r hover:from-[#A7D6D0] hover:to-[#D1E8E2] hover:shadow-lg'
              }`
            }
          >
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
      <div className="font-inter min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-sessions" element={<MySessions />} />
          <Route path="/session-editor" element={<SessionEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
