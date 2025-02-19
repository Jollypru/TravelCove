import React from "react";
import { motion } from "framer-motion";

const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      description: "The world's longest natural sea beach.",
      image: "https://i.ibb.co.com/yTwmKCx/giant-238266.jpg",
    },
    {
      id: 2,
      name: "Sajek Valley",
      description: "The 'Cloud Kingdom' of Bangladesh.",
      image: "https://i.ibb.co.com/KjGGfskt/Sajek-1024x600-jpg.webp",
    },
    {
      id: 3,
      name: "Sundarbans",
      description: "Home of the Royal Bengal Tiger.",
      image: "https://i.ibb.co.com/ZRYnXcKS/sun.jpg",
    },
    {
      id: 4,
      name: "Saint Martin's Island",
      description: "The only coral island in Bangladesh.",
      image: "https://i.ibb.co.com/pBbcZhFd/masudur-rahman.jpg",
    },
  ];
  
const PopularDestinations = () => {
  return (
    <section className="bg-white py-16">
      <div className=" px-10">
        {/* Section Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 dark:text-black">
          🌍 Popular Destinations
        </h2>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: destination.id * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5 group-hover:bg-opacity-60 transition-all duration-500">
                <h3 className="text-white text-xl font-semibold">
                  {destination.name}
                </h3>
                <p className="text-gray-200 text-sm">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
