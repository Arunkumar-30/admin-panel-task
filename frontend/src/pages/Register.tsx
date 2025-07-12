import { useState } from "react";
import { register } from "../servies/userapi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...userData } = user;

    try {
      await register(userData); // send only name, email, password
      alert("Registration Successful!");
      navigate("/");
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration Failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Register
      </h2>

      <input
        placeholder="Name"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Register
      </button>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <a href="/" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
