import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "User";
    setUserName(storedName);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const data = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 3 },
    { day: 'Wed', sessions: 1 },
    { day: 'Thu', sessions: 4 },
    { day: 'Fri', sessions: 2 },
    { day: 'Sat', sessions: 5 },
    { day: 'Sun', sessions: 3 }
  ];

  return (
    <div className="pt-32 px-8 text-dark font-inter min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          {greeting} 🌿, {userName}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          “Your mental wellness is your greatest investment.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Sessions Completed', value: '12' },
          { label: 'Goals Achieved', value: '8' },
          { label: 'Hours Spent', value: '24h' }
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/50 backdrop-blur-lg shadow-lg text-center"
          >
            <h3 className="text-3xl font-bold text-[#256363]">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-10">
        <h3 className="text-xl font-semibold mb-4 text-[#256363]">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sessions" stroke="#256363" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#256363]">Upcoming Sessions</h3>
        <div className="grid gap-4">
          {[
            { title: 'Mindfulness Meditation', time: 'Today, 5:00 PM' },
            { title: 'Stress Management Workshop', time: 'Tomorrow, 6:00 PM' }
          ].map((session, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/50 backdrop-blur-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold text-lg">{session.title}</h4>
                <p className="text-gray-600">{session.time}</p>
              </div>
              <button className="px-4 py-2 bg-[#256363] text-white rounded-lg hover:bg-[#1a4f4f]">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
