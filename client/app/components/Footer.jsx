"use client";
import { FaYoutube, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-violet-700 text-gray-300 py-10 px-6 md:px-20">


      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-green-400">Our Story</a></li>
            <li><a href="/privacy" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="/faqs" className="hover:text-green-400">FAQs</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/courses" className="hover:text-green-400">Courses</a></li>
            <li><a href="/account" className="hover:text-green-400">My Account</a></li>
            <li><a href="/dashboard" className="hover:text-green-400">Course Dashboard</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
          <div className="flex space-x-5 text-xl">
            <a href="#" className="hover:text-red-500"><FaYoutube /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaGithub /></a>
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><MdPhone className="text-green-400" /> 1-885-665-2022</li>
            <li className="flex items-center gap-2"><MdLocationOn className="text-green-400" /> 7011 Vermont Ave, Los Angeles, CA</li>
            <li className="flex items-center gap-2"><MdEmail className="text-green-400" /> hello@learnify.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        Copyright © {new Date().getFullYear()} <span className="text-green-400">Learnify</span> | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
