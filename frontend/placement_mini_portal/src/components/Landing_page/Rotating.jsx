import React from "react";
import { motion } from "framer-motion";

export default function FlipText({
  text = "",
  href = "#",
  duration = 0.25,
  stagger = 0.025,
  style = {},
  charStyle = {},
  containerStyle = {},
  as = "a", // allows using <span> or <div> as well
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="initial"
      whileHover="hovered"
      href={as === "a" ? href : undefined}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        cursor: "pointer",
        fontWeight: 900,
        textTransform: "uppercase",
        lineHeight: 1,
        ...containerStyle,
        ...style,
      }}
    >
      {/* Top Layer */}
      <div>
        {text.split("").map((char, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            style={{
              display: "inline-block",
              ...charStyle,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Bottom Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={`bottom-${i}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            style={{
              display: "inline-block",
              ...charStyle,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </MotionTag>
  );
}
