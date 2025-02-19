import React from "react";
import { motion } from "framer-motion";

const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      description: "The world's longest natural sea beach.",
      image: "https://source.unsplash.com/600x400/?beach,sunset,sea",
    },
    {
      id: 2,
      name: "Sajek Valley",
      description: "The 'Cloud Kingdom' of Bangladesh.",
      image: "https://source.unsplash.com/600x400/?mountains,clouds",
    },
    {
      id: 3,
      name: "Sundarbans",
      description: "Home of the Royal Bengal Tiger.",
      image: "https://source.unsplash.com/600x400/?forest,river",
    },
    {
      id: 4,
      name: "Saint Martin's Island",
      description: "The only coral island in Bangladesh.",
      image: "https://source.unsplash.com/600x400/?island,sea",
    },
  ];
  
const PopularDestinations = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-10">
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
