// Home.jsx
const Home = () => (
  <div className="pt-32 px-8 min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF] font-inter">
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-[#256363] animate-fadeInUp">
        Welcome to Arvyax Wellness 🌱
      </h2>
      <p className="text-lg text-gray-600 mt-2 animate-fadeInUp delay-100">
        Experience a personalized path to your mental well-being
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {[
        { title: 'Mindfulness Sessions', desc: 'Daily guided meditation and mindfulness exercises.' },
        { title: 'Progress Tracking', desc: 'Track your wellness journey with interactive stats.' },
        { title: 'Community Support', desc: 'Join a community of people improving together.' }
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/50 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp"
        >
          <h3 className="text-xl font-bold text-[#256363]">{item.title}</h3>
          <p className="text-gray-600 mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);
