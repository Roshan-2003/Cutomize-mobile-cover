import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiUserCheck } from "react-icons/fi";
import { API_BASE_URL } from "../api/apiUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        login(data);
        toast.success("Welcome Back!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-gray-50/50 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 sm:p-10 shadow-xl rounded-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mx-auto mb-3">
            <FiUserCheck size={24} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase tracking-widest">
            Member Sign In
          </h2>
          <p className="text-xs text-gray-500 font-light mt-1">
            Access your order history & saved preferences
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiMail className="text-[#c5a059]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-200 rounded-lg p-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiLock className="text-[#c5a059]" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-lg p-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
            />
          </div>

          <button className="w-full bg-black text-white py-4 text-xs font-extrabold uppercase tracking-[0.25em] rounded-lg hover:bg-[#c5a059] hover:text-black transition-all duration-300 cursor-pointer shadow-lg">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;