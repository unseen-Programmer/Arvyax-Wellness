const MySessions = () => (
  <div className="pt-32 px-8 min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF] font-inter">
    <h2 className="text-4xl font-bold text-[#256363] mb-6">My Sessions 📅</h2>
    <div className="grid gap-4">
      {[
        { title: 'Mindfulness Meditation', date: 'July 28, 5:00 PM', status: 'Completed' },
        { title: 'Stress Management', date: 'July 29, 6:00 PM', status: 'Upcoming' }
      ].map((session, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-white/50 backdrop-blur-lg shadow-lg flex justify-between items-center hover:shadow-2xl transition-all duration-300"
        >
          <div>
            <h4 className="font-bold text-lg">{session.title}</h4>
            <p className="text-gray-600">{session.date}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              session.status === 'Completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {session.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);
