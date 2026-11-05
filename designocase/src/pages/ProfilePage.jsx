import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Bell,
  PackageCheck,
  Pencil,
  Save,
  LockKeyhole,
  Camera,
} from "lucide-react";

const initialProfile = {
  firstName: "Sushant",
  lastName: "Sharma",
  email: "sushant@example.com",
  phone: "+91 98765 43210",
  dateOfBirth: "1998-06-15",
  gender: "Male",
  address: "123, Green Park",
  city: "New Delhi",
  state: "Delhi",
  postalCode: "110016",
  country: "India",
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-neutral-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-neutral-200 bg-white py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsEditing(false);
    setSaved(true);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
    setSaved(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              My Account
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Personal Information
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Manage your personal details and account information.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-sm">
              <UserRound className="h-7 w-7" />
            </div>

            <div>
              <p className="font-semibold">{profile.firstName} {profile.lastName}</p>
              <p className="text-sm text-neutral-500">Premium Customer</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Profile Form */}
          <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:p-7">
              <div>
                <h2 className="text-lg font-bold">
                  Personal Details
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Update your personal information below.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold transition hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
              {/* Profile Picture */}
              <div className="mb-8 flex items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#f3f0eb] text-neutral-700">
                  <UserRound className="h-10 w-10" />

                  <button
                    type="button"
                    aria-label="Change profile picture"
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-700 text-white"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <p className="font-semibold">Profile Photo</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Your profile picture
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="mb-8">
                <div className="mb-5 flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-emerald-700" />

                  <h3 className="text-sm font-bold">
                    Basic Information
                  </h3>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    icon={Mail}
                    placeholder="Enter email address"
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    icon={Phone}
                    placeholder="Enter phone number"
                  />

                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                  />

                  <div className="space-y-2">
                    <label
                      htmlFor="gender"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-8 border-t border-neutral-100 pt-7">
                <div className="mb-5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-700" />

                  <h3 className="text-sm font-bold">
                    Address Information
                  </h3>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <InputField
                      label="Street Address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="House no., street, area"
                    />
                  </div>

                  <InputField
                    label="City"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />

                  <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={profile.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                  />

                  <InputField
                    label="Country"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                </div>
              </div>

              {/* Form Actions */}
              {isEditing && (
                <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold transition hover:bg-neutral-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              )}

              {saved && (
                <p className="mt-4 text-sm font-medium text-emerald-700">
                  Your profile changes have been saved.
                </p>
              )}
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Account Status */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Account Status</h3>

                <ShieldCheck className="h-5 w-5 text-emerald-700" />
              </div>

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />

                  <p className="text-sm font-semibold text-emerald-800">
                    Account Active
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-700">
                  Your account is active and ready for shopping.
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="text-sm text-neutral-500">
                  Membership
                </span>

                <span className="text-sm font-semibold">
                  Premium
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  Customer Since
                </span>

                <span className="text-sm font-semibold">
                  Jan 2025
                </span>
              </div>
            </div>

            {/* Order Information */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-emerald-700" />

                <h3 className="font-bold">Order Information</h3>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Total Orders
                  </span>

                  <span className="font-bold">12</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Active Orders
                  </span>

                  <span className="font-bold">3</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Completed Orders
                  </span>

                  <span className="font-bold">9</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-emerald-700" />

                <h3 className="font-bold">Account Security</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Keep your account secure by maintaining your contact
                information and password.
              </p>

              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-50"
              >
                Change Password
              </button>
            </div>

            {/* Notifications */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-amber-600" />

                <h3 className="font-bold">Notifications</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Receive updates about your orders, shipping, and
                exclusive offers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}