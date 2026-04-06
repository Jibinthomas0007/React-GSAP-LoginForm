import { useState, useRef } from "react";
import { gsap } from "gsap";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const cardRef = useRef(null);

  const handleSwitch = () => {
    const card = cardRef.current;

    // 🔥 STEP 1: Flip OUT
    gsap.to(card, {
      rotateY: 90,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // 🔥 STEP 2: Switch content
        setIsRegister((prev) => !prev);

        // 🔥 STEP 3: Flip IN
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 perspective-[1000px]">
      
      <div
        ref={cardRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        {isRegister ? (
          <RegistrationForm switchToLogin={handleSwitch} />
        ) : (
          <LoginForm switchToRegister={handleSwitch} />
        )}
      </div>

    </div>
  );
}