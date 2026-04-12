import { useState, useRef } from "react";
import { gsap } from "gsap";

export default function AuthCardSwitcher({
  firstComponent: FirstComponent,
  secondComponent: SecondComponent,
  initial = "first",
}) {
  const [active, setActive] = useState(initial);
  const cardRef = useRef(null);

  const switchView = () => {
    const card = cardRef.current;

    gsap.to(card, {
      rotateY: 90,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActive((prev) => (prev === "first" ? "second" : "first"));

        gsap.fromTo(
          card,
          {
            rotateY: -90,
            opacity: 0,
          },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      },
    });
  };

  const CurrentComponent =
    active === "first" ? FirstComponent : SecondComponent;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 perspective-[1000px]">
      <div
        ref={cardRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <CurrentComponent switchView={switchView} />
      </div>
    </div>
  );
}