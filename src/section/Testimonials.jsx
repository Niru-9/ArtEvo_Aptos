import React from 'react';
import { TitleHeader } from "../components/TitleHeader.jsx";
import { testimonials } from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";

export const Testimonials = () => {
    return (
        <section id="testimonials" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="what people say about us"
                    sub="client feedback highlight"
                />

                <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
                    {testimonials.map((testimonial, index) => (
                        <GlowCard key={index} card={{ review: testimonial.review }}>
                            <div className="flex item-center gap-3">
                                <div>
                                    <img src={testimonial.imgPath} alt={testimonial.name} />
                                </div>
                              
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-white-50">{testimonial.mentions}</p>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
