import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
            alt="About Us"
            className="rounded-lg shadow-md w-full object-cover h-[300px]"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            We are a passionate team committed to delivering high-quality
            products and exceptional customer service. Our mission is to
            simplify online shopping by offering a seamless and trustworthy
            experience.
          </p>
          <p className="text-gray-700">
            Since our inception, we’ve helped thousands of customers find
            exactly what they need — fast, affordably, and reliably. We believe
            in innovation, transparency, and user-first design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
