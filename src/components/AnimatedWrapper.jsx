import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animated list item wrapper
export default function AnimatedWrapper() {
  const [order, setOrder] = useState(initialOrder);

  // Shuffle the order every second to trigger the animation
  useEffect(() => {
    const interval = setInterval(() => setOrder(shuffle(order)), 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [order]);

  return (
    <ul style={container}>
      {order.map((backgroundColor) => (
        <motion.li
          key={backgroundColor}
          layout // Animation trigger when layout changes
          transition={spring} // Animation settings
          style={{ ...item, backgroundColor }}
        />
      ))}
    </ul>
  );
}

// Initial order of colors to animate (pastel colors)
const initialOrder = [
  "#ffb3d9",  // Pastel pink
  "#b3d9ff",  // Pastel blue
  "#ffb3ff",  // Soft pink
  "#d0d8ff",  // Soft lavender
];

// Shuffle function to randomize the order
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Transition settings for the motion animation
const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

// Styles for the container and list items
const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 300,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const item = {
  width: 100,
  height: 100,
  borderRadius: "10px",
};
