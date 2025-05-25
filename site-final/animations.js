document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about-primebakery",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        defaults: { duration: 1, ease: "power2.out" }
    });

    tl.from(".floating-img", {
        y: -50,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
    }, 0)


        .from(".split-right h1", {
            x: 50,
            opacity: 0
        }, 0.4)

        .from(".split-right p", {
            x: 50,
            opacity: 0,
            stagger: 0.2
        }, 0.6)

});

  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".icons .items", {
      scrollTrigger: {
        trigger: ".icons",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out"
    });
  });