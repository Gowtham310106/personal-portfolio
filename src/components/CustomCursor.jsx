import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  // References for cursor elements
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  useEffect(() => {
    // Check if mobile (moved inside useEffect for SSR compatibility)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    // Get cursor elements
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    // Initial position on screen
    gsap.set([cursor, cursorBorder], {
      xPercent: -50,  // Fixed typo from yPresent to xPercent
      yPercent: -50   // Fixed typo from yPresent to yPercent
    });

    // Variables for cursor position with different speeds
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out"
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out"
    });

    const xToBorder = gsap.quickTo(cursorBorder, "x", {
      duration: 0.5,
      ease: "power3.out"  // Fixed typo from power.out to power3.out
    });
    const yToBorder = gsap.quickTo(cursorBorder, "y", {
      duration: 0.5,
      ease: "power3.out"
    });

    // Mouse move Handler
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };

    // Add mouse move Listener
    window.addEventListener("mousemove", handleMouseMove);

    // Add Click Animation
    const handleMouseDown = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 0.6,
        duration: 0.2
      });
    };

    const handleMouseUp = () => {
      gsap.to([cursor, cursorBorder], {
        scale: 1,
        duration: 0.3  // Fixed duration from 0. to 0.3
      });
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Check if mobile (for initial render)
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Cursor Border */}
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-10 h-10 border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50 transform -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;