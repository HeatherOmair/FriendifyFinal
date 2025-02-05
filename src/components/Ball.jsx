import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { damping: 20, stiffness: 300, restDelta: 0.001 };

export default function Ball() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      className="follow-pointer-ball"
      style={{
        x,
        y,
      }}
    />
  );
}

function useFollowPointer(ref) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }) => {
      const element = ref.current;

      // Calculate the center position of the ball
      const ballCenterX = clientX - element.offsetWidth / 2;
      const ballCenterY = clientY - element.offsetHeight / 2;

      // Update motion values to move the ball's center to the cursor position
      xPoint.set(ballCenterX);
      yPoint.set(ballCenterY);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [xPoint, yPoint, ref]); // Add dependencies for xPoint, yPoint, and ref

  return { x, y };
}
