"use client";

import { useEffect, useRef } from "react";
import "./GooCursor.css";

const TAIL_LENGTH = 20;

export default function GooCursor() {
  const cursorRef = useRef(null);
  const circlesRef = useRef([]);
  const historyRef = useRef(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }));
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;

    // create tail circles
    circlesRef.current = [];
    for (let i = 0; i < TAIL_LENGTH; i++) {
      const div = document.createElement("div");
      div.className = "cursor-circle";
      cursor.appendChild(div);
      circlesRef.current.push(div);
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function animate() {
      const history = historyRef.current;
      const circles = circlesRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      history.shift();
      history.push({ x: mouseX, y: mouseY });

      for (let i = 0; i < TAIL_LENGTH; i++) {
        let current = history[i];
        let next = history[i + 1] || history[TAIL_LENGTH - 1];

        let xDiff = next.x - current.x;
        let yDiff = next.y - current.y;

        current.x += xDiff * 0.35;
        current.y += yDiff * 0.35;

        circles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cursor.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* SVG FILTER */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 35 -15
              "
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* CURSOR */}
      <div id="cursor" ref={cursorRef}></div>
    </>
  );
}
