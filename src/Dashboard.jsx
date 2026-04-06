import { useEffect, useState, useRef } from "react";
import Button from "./components/form/Button";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setUser(authData.user);
    }
  }, []);

  // 🔥 Text animation
  useEffect(() => {
    const text = textRef.current;

    if (!text) return;

    // 🔹 Split text into characters
    const chars = text.innerText.split("");
    text.innerHTML = chars
      .map((char) =>
        char === " "
          ? `<span class="inline-block whitespace-pre will-change-transform char">&nbsp;</span>`
          : `<span class="inline-block whitespace-pre will-change-transform char">${char}</span>`
      )
      .join("");

    const charElements = text.querySelectorAll(".char");

    // 🔥 Loop animation
    const animate = () => {
      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          onComplete: () => {
            // 🔁 Repeat after delay
            setTimeout(animate, 1500);
          },
        }
      );
    };

    animate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        
        {/* 🔥 Animated Text */}
        <h2
          ref={textRef}
          className="text-2xl font-semibold mb-2"
        >
          Welcome to the Dashboard User
        </h2>

        <p className="text-gray-600 mb-4">
          {user?.username || "User"}
        </p>

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

    </div>
  );
}