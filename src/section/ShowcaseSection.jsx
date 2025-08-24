//make as future section 
import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
export const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);




    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            gsap.fromTo(
                card, {
                y: 50, opacity: 0
            }, {
                y: 0, opacity: 1,
                duration: 1,
                delay: 0.3 * (index + 1),
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100'
                }
            }
            )
        })
        gsap.fromTo(sectionRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5
        })
    }, []);


    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* left*/}
                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className={"image-wrapper"}>
                            <img src="/images/feature1.png" alt="Ryde" />
                        </div>
                        <div className="text-content">
                            <h2>Authenticity & Provenance Tracking</h2>
                            <p className="text-white-50 md:text-xl">
                                Each traditional art piece is stored as an NFT .

                                Smart contract ensures originality and prevents duplication.

                                Provenance  is recorded immutably on-chain.
                            </p>
                        </div>
                    </div>
                    {/*right*/}
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper bg-[#ffefdb]">
                                <img src="/images/feature2.png" alt="Ryde" />
                            </div>
                            <h2>
                                Ownership & Royalties for Artists
                            </h2>
                        </div>

                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper bg-[#ffe7eb]">
                                <img src="/images/feature3.png" alt="Ryde" />
                            </div>
                            <h2>
                                Community Marketplace with Cultural Value
                            </h2>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
