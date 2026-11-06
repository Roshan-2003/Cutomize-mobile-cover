const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SECRET_KEY";

const normalizeNameParts = (name = "") => {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmedName.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists. Please sign in.",
      });
    }

    const { firstName, lastName } = normalizeNameParts(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      firstName,
      lastName,
      email: cleanEmail,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message || "Login failed" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (email) {
      const cleanEmail = email.trim().toLowerCase();
      const existingUser = await User.findOne({
        email: cleanEmail,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This email is already in use by another account.",
        });
      }

      user.email = cleanEmail;
    }

    const nextFirstName = typeof firstName === "string" ? firstName.trim() : user.firstName || "";
    const nextLastName = typeof lastName === "string" ? lastName.trim() : user.lastName || "";

    user.firstName = nextFirstName;
    user.lastName = nextLastName;
    user.name = [nextFirstName, nextLastName].filter(Boolean).join(" ").trim() || user.name;
    user.phone = typeof phone === "string" ? phone.trim() : user.phone || "";
    user.dateOfBirth = typeof dateOfBirth === "string" ? dateOfBirth : user.dateOfBirth || "";
    user.gender = typeof gender === "string" ? gender.trim() : user.gender || "";
    user.address = typeof address === "string" ? address.trim() : user.address || "";
    user.city = typeof city === "string" ? city.trim() : user.city || "";
    user.state = typeof state === "string" ? state.trim() : user.state || "";
    user.postalCode = typeof postalCode === "string" ? postalCode.trim() : user.postalCode || "";
    user.country = typeof country === "string" ? country.trim() : user.country || "";

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: error.message || "Profile update failed" });
  }
};