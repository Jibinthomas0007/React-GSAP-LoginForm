import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export const useGsapTextAnimation = (ref, options = {}) => {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const chars = ref.current.querySelectorAll(".char");

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: options.repeatDelay || 1,
        defaults: { ease: "power3.out" },
      });

      tl.from(chars, {
        y: options.y || 40,
        opacity: 0,
        scale: options.scale || 0.9,
        stagger: options.stagger || 0.04,
        duration: options.duration || 0.5,
      }).to(chars, {
        opacity: 0,
        y: options.exitY || -20,
        stagger: options.exitStagger || 0.03,
        duration: options.exitDuration || 0.4,
      });

    }, ref);

    return () => ctx.revert(); 
  }, [ref, options]);
};