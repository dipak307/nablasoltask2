import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateForm()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      console.log('Form data:', formData);
      
      // Redirect or move to next step logic can go here
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
          alert("Data Stored successfully..")
          navigate("/information")

    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="w-full text-white text-xl font-semibold pt-5">
        <div className="flex items-center justify-between">
          <span>Logo</span>
          <span className="absolute left-1/2 transform -translate-x-1/2">Create New Account</span>
          <span>Contact Us</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg mt-10">
        {/* Steps Navigation */}
        <div className="flex justify-between h-14 bg-gray-200 rounded-lg mb-6 ">
          <div className="flex items-center justify-center bg-blue-400 w-1/3 h-14 rounded-tr-3xl rounded-br-3xl">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">1</div>
            <p className="text-white font-semibold ml-2">Your Profile</p>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">2</div>
            <p className="text-gray-400 font-semibold ml-2">Business Information</p>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">3</div>
            <p className="text-gray-400 font-semibold ml-2">Additional Users</p>
          </div>
        </div>

        {/* Form Header */}
        <div className="text-center text-gray-500 mb-8">
          <h2 className="text-2xl text-gray-400">Step 1</h2>
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <p>Enter the login information for your account.</p>
          <p>You will be able to create additional users after registering.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 p-10 gap-y-6 mb-8">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Input Your First Name"
                className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Input Your Last Name"
                className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Input Your Email"
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Input Your Phone Number"
                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-2 text-start">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="relative w-full flex justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 mt-2">
        <a href="/login" className="text-white text-lg">&larr; Back to Login</a>
        <button
          type="submit" // Optional: if you want to treat the button as a submit button
          className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 text-lg"
          onClick={handleSubmit}
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
};

export default CreateAccountForm;
