import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin);

// Create a single timeline for all animations
const masterTimeline = gsap.timeline();
let rafId;

// Cache the selector result
const pathSvgs = Array.from(document.querySelectorAll(".line-pulse"));

// Batch process animations
const createAnimations = () => {
  // Pre-calculate random delays
  const delays = pathSvgs.map(() => gsap.utils.random(0, 1, 0.1));

  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Set opacity once for all elements
    gsap.set(pathSvgs, { opacity: 1 });

    // Create animations in batch
    pathSvgs.forEach((svg, i) => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: delays[i],
        paused: true,
      });

      // Reduce number of tweens by combining properties
      tl.fromTo(
        svg,
        {
          drawSVG: 0,
        },
        {
          drawSVG: "0% 5%",
          ease: "sine.in",
          duration: 1,
        }
      ).to(svg, {
        drawSVG: "100% 100%",
        duration: 3,
      });

      // Add to master timeline with position parameter
      masterTimeline.add(tl.play(), i * 0.1);
    });
  });
};

// Clean up function
const cleanup = () => {
  cancelAnimationFrame(rafId);
  masterTimeline.kill();
  window.removeEventListener("resize", init);
};

// Initialize animations with RAF
const init = () => {
  cleanup(); // Clean up existing animations before reinitializing
  rafId = requestAnimationFrame(createAnimations);
};

// Add event listener for resize
window.addEventListener("resize", init);

// Initialize animations
init();

// Clean up on page unload
window.addEventListener("unload", cleanup);
