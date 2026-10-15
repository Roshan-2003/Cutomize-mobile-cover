import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiUser, FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import { API_BASE_URL } from "../api/apiUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("next");
  const isForCheckout = destination?.includes("checkout") || destination?.includes("cart");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (isSignup) {
        res = await axios.post(`${API_BASE_URL}/auth/register`, {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        });
      } else {
        res = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: email.trim().toLowerCase(),
          password,
        });
      }

      const data = res.data;
      if (data.success && data.token) {
        await login(data);
        toast.success(
          isSignup
            ? "Account created successfully! Welcome."
            : "Welcome back!"
        );

        if (destination && destination.startsWith("/")) {
          navigate(destination);
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      const errMsg =
        err.response?.data?.message ||
        (isSignup ? "Signup failed. Please try again." : "Invalid email or password.");
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50/60 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 shadow-2xl rounded-2xl border border-gray-100">
        {/* Purchase Compulsory Notice */}
        {isForCheckout && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <FiShoppingBag className="text-base text-[#c5a059] shrink-0" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Sign in compulsory:</strong> Please sign in or create an account to proceed with your selected product and complete checkout.
            </p>
          </div>
        )}

        {/* Tab Switcher */}
        {/* <div className="flex border-b border-gray-200 mb-8">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[2px] cursor-pointer ${
              !isSignup
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[2px] cursor-pointer ${
              isSignup
                ? "border-[#c5a059] text-black"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Create Account
          </button>
        </div> */}

        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-black text-gray-900 uppercase tracking-widest">
            {isSignup ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-1.5">
            {isSignup
              ? "Sign up to track orders, save your phone cover selection, and enjoy express checkout."
              : "Sign in with your email and password to continue."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <FiUser className="text-[#c5a059]" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-lg p-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiMail className="text-[#c5a059]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
              className="w-full border border-gray-200 rounded-lg p-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiLock className="text-[#c5a059]" />
              <span>Password</span>
            </label>
            <input
              type="password"
              minLength={6}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimum 6 characters"
              className="w-full border border-gray-200 rounded-lg p-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-black text-white py-4 rounded-lg text-xs font-extrabold uppercase tracking-[0.25em] hover:bg-[#c5a059] hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <span>{isSignup ? "Create Account & Continue" : "Sign In & Continue"}</span>
            )}
          </button>

          <div className="pt-2 text-center text-xs text-gray-600">
            {isSignup ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="auth-switch-button font-bold text-black hover:text-[#c5a059] hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="auth-switch-button font-bold text-black hover:text-[#c5a059] hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            )}
          </div>
        </form>

      
      </div>
    </div>
  );
};

export default Login;
