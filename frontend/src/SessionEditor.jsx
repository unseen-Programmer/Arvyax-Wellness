// SessionEditor.jsx
const SessionEditor = () => (
  <div className="pt-32 px-8 min-h-screen bg-gradient-to-b from-[#A7D6D0] to-[#F0F4EF] font-inter">
    <h2 className="text-4xl font-bold text-[#256363] mb-6">Session Editor ✏️</h2>
    <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg max-w-2xl">
      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Session Title</span>
        <input
          type="text"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#256363]"
          placeholder="Enter session name"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Description</span>
        <textarea
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#256363]"
          placeholder="Write about the session..."
          rows="4"
        />
      </label>
      <button className="px-6 py-2 bg-[#256363] text-white rounded-lg hover:bg-[#1a4f4f]">
        Save Session
      </button>
    </div>
  </div>
);
