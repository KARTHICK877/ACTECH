import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 6000); // 7 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <video
        src="intron.mp4"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
}
