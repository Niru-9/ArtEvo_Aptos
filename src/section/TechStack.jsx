import React, { useRef } from 'react';
import { TitleHeader } from "../components/TitleHeader.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants/index.js";


gsap.registerPlugin(ScrollTrigger);

export const TechStack = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const elements = sectionRef.current.querySelectorAll('.animate-item');

        gsap.fromTo(
            elements,
            { opacity: 0, x: 50 }, // start state
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: sectionRef });



    return (
        <div id="skills" ref={sectionRef} className="flex-right section-padding">
            <TitleHeader
                title="start your journey with Artevo "
                sub=" create and explore"
                className="animate-item"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {navLinks.map(({ name1, desc, price, owner }) => (

                    <div className="bg-white  p-10 rounded hover:bg-grey-700 font-semibold"><div><img src="/images/project2.png" alt="Artwork 2" className="rounded-lg animate-item" /></div>
                        <div className=" h-50 w-70 text-black p-5  rounded">
                            <div className=" text-black">
                                <div>Name:<span>{name1}</span></div>
                                <div>Description:<span>{desc}</span></div>
                                <div>price:<span>{price}</span></div>

                                <div>creatorWallet:<span>{owner}</span></div>
                            </div></div><div className="flex">
                            <div className="m-3 mtop-0">
                                <button className="bg-cyan-500 w-30 h-15 hover:bg-cyan-600 p-3 rounded font-semibold animate-item">
                                    Buy
                                </button></div><div className="m-3">
                                <button className="bg-cyan-500 w-30 h-15 hover:bg-cyan-600 p-3 rounded font-semibold animate-item">
                                    Add Cart
                                </button></div></div> </div>))}



            </div>

        </div>
    );
};
