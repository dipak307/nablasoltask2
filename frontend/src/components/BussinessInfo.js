import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BussinessInfo = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    taxId: '',
    documentSigned: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    for (const key in formData) {
      if (!formData[key] && key !== 'documentSigned') { // Allow checkbox to be unchecked
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!validateForm()) {
      // Show validation errors
      return; // Exit the function if validation fails
    }

    // Save form data to localStorage if validation passes
    localStorage.setItem('formData', JSON.stringify(formData));
    setFormData({
      brandName: '',
      brandType:'',
      streetAddress: '',
      zipCode: '',
      city: '',
      taxId: '',
      documentSigned: false,
    });
    alert('Data Stored successfully');
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
        <div className="flex justify-between h-14 bg-gray-200 rounded-lg mb-6">
          <div className="flex items-center justify-center bg-blue-400 w-1/3 h-14">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">1</div>
            <p className="text-white font-semibold ml-2">Your Profile</p>
          </div>
          <div className="flex items-center justify-center bg-blue-400 w-1/3 rounded-tr-3xl rounded-br-3xl">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">2</div>
            <p className="text-white font-semibold ml-2">Business Information</p>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <div className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">3</div>
            <p className="text-gray-400 font-semibold ml-2">Additional Users</p>
          </div>
        </div>

        {/* Form Header */}
        <div className="text-center text-gray-500 mb-8 px-4">
          <h2 className="text-2xl text-gray-400">Step 2</h2>
          <h2 className="text-2xl font-bold">Business Information</h2>
          <p>Please, enter information about your company.</p>
        </div>

        {/* Form Fields */}
        <div className="block text-blue-700 text-start mb-2 px-4 md:px-10">GENERAL INFORMATION</div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 px-4 md:px-10 gap-y-6 mb-8">
            {/* Input Fields */}
            {['brandName','brandType', 'streetAddress', 'city', 'zipCode', 'taxId'].map((field, index) => (
              <div className="flex flex-col" key={index}>
                <label className="block text-gray-700 mb-2 text-start">
                  {field.split(/(?=[A-Z])/).join(' ').replace(/^\w/, (c) => c.toUpperCase())}*
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Input ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
                  className={`w-full px-4 py-3 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="mb-6 px-4 md:px-10">
            <h2 className="block text-blue-700 text-start mb-2">DOCUMENTS</h2>
            <p className="text-gray-500 mb-4 text-start">
              Once the following documents are signed, you'll be ready to get started.
            </p>

            {/* Document Rows */}
            {[
              { label: 'Electronically sign the agreement(s)', status: true },
              { label: 'Non adult beverage Kroger market supplier waiver and release', status: false },
            ].map((doc, index) => (
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-2" key={index}>
                <div className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-6 py-3">
                  <p className="text-gray-800 font-medium">{doc.label}</p>
                  <span className={`text-xl font-bold ${doc.status ? 'text-green-500' : 'text-red-500'}`}>
                    {doc.status ? '✔️' : '❌'}
                  </span>
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  &lt;
                </button>
              </div>
            ))}
          </div>

          {/* COI PDF Upload Section */}
          <div className="mb-6 px-4 md:px-10">
            <h2 className="text-blue-700 mb-2 text-start">COI PDF UPLOAD</h2>
            <p className="text-gray-500 mb-4 text-start">
              Once the following documents are signed, you'll be ready to get started.
            </p>

            {/* COI Upload Row */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-2">
              <div className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-6 py-3">
                <p className="text-gray-800 font-medium">Electronically sign the agreement(s)</p>
                <span className="text-green-500 text-xl font-bold">✔️</span>
              </div>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                &lt;
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 mt-2">
            {/* Back to Login Link */}
            <a href="/login" className="text-white text-lg">&larr; Back to Login</a>

            {/* Buttons Container for Previous and Next */}
            <div className="flex space-x-4">
             <button
                type="button"
                className="bg-blue-300 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 text-lg"
              >
              <Link to="/">  &larr; Previous Step </Link>
              </button> <Link/>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 text-lg"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BussinessInfo;
