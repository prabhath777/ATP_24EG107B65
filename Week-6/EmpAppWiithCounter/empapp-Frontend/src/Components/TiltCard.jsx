import { motion } from "framer-motion";
import { useState } from "react";

function TiltCard({ children }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;

    const midX = card.width / 2;
    const midY = card.height / 2;

    const rotateY = ((x - midX) / midX) * 10; // left/right tilt
    const rotateX = -((y - midY) / midY) * 10; // up/down tilt

    setRotate({ x: rotateX, y: rotateY });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  return (
    <div style={{ perspective: 1000 }} className="max-w-3xl mx-auto mt-10 p-6">
      <motion.div

        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white border rounded-2xl p-6 shadow-md"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TiltCard;