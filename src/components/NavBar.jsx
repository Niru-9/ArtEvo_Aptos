import React, { useEffect, useState } from 'react';
import { navLinks } from "../constants/index.js";
import ProfileModal from "../components/Profile"; 
export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
      const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo" href="#Hero">ArtEvo</a>
                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline" />
                                </a>
                                
                            </li>
                            
                        ))}
                        
                    </ul>
                </nav>
                
                  <a href="#profile" className="contact-btn group">    <button 
          onClick={() => setIsProfileOpen(true)} 
            className="inner"
        >
          Profile
        </button></a>
            </div>
             <ProfileModal
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
        </header>
    );
};
export default NavBar;