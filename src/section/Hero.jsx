import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { connectWallet } from "../utils/aptosWallets.js";
import WalletModal from "../components/WalletModal.jsx";
import "../index.css";

const Hero = () => {
  const [address, setAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { x: 0, opacity: 0 },
      { x: 50, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  const handleWalletConnect = async (wallet) => {
    const addr = await connectWallet(wallet);
    if (addr) {
      setAddress(addr);
      setShowModal(false); // close popup
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden h-screen w-screen">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/herobg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-5"></div>

      {/* Hero Content */}
      <div className="hero-layout relative z-10">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 h-screen text-white">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>ArtEvo</h1>
              <h1>
                place your art<br /> <i>in correct place</i>
              </h1>
            </div>
          </div>
        </header>

        {/* Image as Wallet Connect Button */}
       <div className="relative flex flex-col items-center">
  {/* Image */}
  <img
    src="/images/ui.png"
    alt="Hero Image"
    className="w-200 h-auto object-cover rounded-lg"
  />

  {/* Button */}
  <a onClick={() => setShowModal(true)}>
    <div className="px-5 py-2 my-20 rounded-lg bg-white text-black 
                    transition-colors duration-300 w-40 text-center mt-4 
                    cursor-pointer flex items-center justify-center 
                    hover:scale-105">
      <span>Connect Wallet</span>
    </div>
  </a>
</div>

        {/* Show Connected Address */}
        {address && (
         
          <p className="mt-4 text-green-400  ">✅ Connected: {address}</p>
        )}
      </div>

      {/* Wallet Modal */}
      {showModal && (
        <WalletModal
          onClose={() => setShowModal(false)}
          onConnect={handleWalletConnect}
        />
      )}
    </section>
  );
};

export default Hero;
