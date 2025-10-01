// app/components/Contact.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEnvelope, FaFacebook, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";

const page = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen text-white p-6 sm:p-12">
      <h1 className="text-4xl font-bold mb-6 text-blue-200">Contact Us</h1>
      <p className="mb-10 text-blue-100 max-w-2xl">
        We’d love to hear from you! Whether you have questions, suggestions, or
        feedback, reach out to us using the details below.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Email */}
        <div className="flex items-start gap-4 bg-blue-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition">
          <FaEnvelope className="text-2xl text-blue-300 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Email</h2>
            <p className="text-blue-100">support@learnify.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 bg-blue-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition">
          <FaPhone className="text-2xl text-blue-300 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Phone</h2>
            <p className="text-blue-100">+91 123 456 7890</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4 bg-blue-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition">
          <FaMapMarkerAlt className="text-2xl text-blue-300 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Address</h2>
            <p className="text-blue-100">
              123 Learnify Street, Knowledge City, India
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-start gap-4 bg-blue-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
            <div className="flex gap-4 text-blue-200 text-lg">
              <FaTwitter />
              <FaLinkedin />
              <FaFacebook />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default page;
