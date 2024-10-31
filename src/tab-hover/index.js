let mm = gsap.matchMedia();
const tabsMenu = document.querySelector(".assets_tabs-menu");
const tabs = document.querySelectorAll(".button.is-tab");
const tabShape = document.querySelector(".tab-shape");
mm.add("(hover:hover)", () => {
  tabs.forEach(function (tab) {
    tab.addEventListener("mouseenter", function () {
      const state = Flip.getState(tabShape, {
        props: "opacity",
        simple: true,
      });

      this.appendChild(tabShape);

      Flip.from(state, {
        absolute: true,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
  tabsMenu.addEventListener("mouseleave", function () {
    document.querySelector(".button.is-tab.w--current").appendChild(tabShape);
    const state = Flip.getState(tabShape, {
      props: "opacity",
      simple: true,
    });
    Flip.from(state, {
      absolute: true,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

const heroMockupTl = gsap.timeline({});
heroMockupTl.to(".home-hero_image-wrapper", {
  scale: 1.2,
});

ScrollTrigger.create({
  trigger: ".section_home-hero",
  start: "top top",
  end: "bottom top",
  scrub: 1.2,
  animation: heroMockupTl,
});
