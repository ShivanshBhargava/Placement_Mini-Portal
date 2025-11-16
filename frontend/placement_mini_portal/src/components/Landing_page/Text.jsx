import { motion } from "framer-motion";

export default function TextonLanding() {
  return (
    <motion.div
      style={{
        maxWidth: "40vw",
        marginTop: "15vh",
        textAlign: "left",
        padding: "0 5vw",
        marginLeft:"-5vw",
        zIndex: 3,
        textShadow: "0.3vw 0.3vw 0.8vw rgba(0, 0, 0, 0.7)",

      }}
      initial={{ opacity: 0, x: "-10vw", filter: "blur(12px)" }}
      animate={{ opacity: 1, x: "-23vw", filter: "blur(0px)" }}
      transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
    >
      <h3
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "4vw",
          fontWeight: "bold",
          marginBottom: "1vh",
          color: "#fcffe8ff",
          lineHeight: 1.1,
        //   mixBlendMode:"color",
        }}
      >
        Leap Ahead
      </h3>

      <p
        style={{
          fontSize: "1.2vw",
          color: "#d7d7d7ff",
          marginBottom: "0.8vh",
          fontFamily: "Roboto, sans-serif",
          maxWidth: "90%",
        }}
      >
        Step into a world where opportunities are always within reach.
      </p>

      <p
        style={{
          fontSize: "1.1vw",
          color: "#d7d7d7ff",
          fontFamily: "Roboto, sans-serif",
          mixBlendMode: "difference",
          maxWidth: "95%",
          lineHeight: 1.5,
        }}
      >
        <strong>LeapIn</strong> is your personal gateway to internships,
        full time roles, and exciting career paths. 
        Explore curated opportunities, apply effortlessly, and follow your journey all through a single platform.
      </p>
    </motion.div>
  );
}


