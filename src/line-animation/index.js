import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin);

let mm = gsap.matchMedia();

const pathSvgs = document.querySelectorAll(".line-pulse");

pathSvgs.forEach((svg, i) => {
  svg.style.opacity = 1;
  const delay = gsap.utils.random(0, 1, 0.1);
  const tween = gsap.timeline({
    repeat: -1,
    repeatDelay: delay,
  });

  tween
    .fromTo(
      svg,
      {
        ease: "none",
        drawSVG: 0,
        duration: 4,
      },
      { drawSVG: "0% 5%", ease: "sine.in", duration: 1 }
    )
    .to(svg, { drawSVG: "100% 100%", duration: 3 });
  tween.play();
});
