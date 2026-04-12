import { useEffect, useState, useRef, useMemo } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useGsapTextAnimation } from "../hooks/useGsapTextAnimation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const textRef = useRef(null);

  // Dynamic text
  const text = `Welcome, ${user?.username || "User"}`;

  // Memoized split (updates when text changes)
  const splitText = useMemo(() => {
    return text.split("");
  }, [text]);

  // GSAP animation hook (configurable)
  useGsapTextAnimation(textRef, {
    y: 60,
    duration: 0.7,
    stagger: 0.05,
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setUser(authData.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        
        {/* Animated Text */}
        <h2 ref={textRef} className="text-2xl font-semibold mb-2">
          {splitText.map((char, i) => (
            <span
              key={i}
              className="inline-block char whitespace-pre will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
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