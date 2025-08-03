import { useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend does not use fullName yet, but we can send it for later
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registered successfully!");
        setFullName("");
        setEmail("");
        setPassword("");
      } else {
        alert("❌ " + (data.msg || "Registration failed"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#A7D6D0] to-[#D1E8E2] px-4">
      <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md text-center animate-fadeInUp">
        <h2 className="text-3xl font-bold text-[#256363] mb-4">Register</h2>
        <p className="mb-6 text-gray-700">Create your personalized wellness journey.</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#256363]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#256363]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#256363]"
          />
          <button
            type="submit"
            className="bg-[#256363] text-white font-bold py-2 px-6 rounded-full hover:bg-[#1a4f4f] transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
