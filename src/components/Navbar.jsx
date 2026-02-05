import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [activeSection, setActiveSection] = useState('');

    const menuItems = [
        { name: 'About', id: 'about' },
        { name: 'Process', id: 'process' },
        { name: 'Portfolio', id: 'portfolio' },
        { name: 'Packages', id: 'packages' },
        { name: 'Reviews', id: 'reviews' },
        { name: 'FAQs', id: 'faq' }
    ];

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        menuItems.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        // Also observe hero/top
        const hero = document.querySelector('section');
        if (hero) observer.observe(hero);

        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };



    return (
        <>
            <motion.nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: isScrolled ? '1rem 0' : '1.5rem 0',
                    zIndex: 100,
                    background: isScrolled ? 'var(--color-bg-primary)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                    transition: 'background 0.3s ease, border-color 0.3s ease, padding 0.3s ease'
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', zIndex: 102 }}>
                        <img
                            src="/logo.svg"
                            alt="Happy Winds"
                            style={{
                                height: '40px',
                                width: 'auto',
                                filter: theme === 'light' ? 'invert(1)' : 'none',
                                transition: 'filter 0.3s ease'
                            }}
                        />
                    </a>

                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ gap: '2rem', alignItems: 'center' }}>
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                style={{
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    color: activeSection === item.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                    position: 'relative',
                                    transition: 'color 0.3s ease',
                                    padding: '0.5rem 0'
                                }}
                            >
                                {item.name}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="navUnderline"
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background: 'var(--color-text-primary)',
                                            borderRadius: '2px'
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}

                        {/* Theme Switcher */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '1rem' }}>
                            <button
                                onClick={toggleTheme}
                                style={{
                                    width: '56px',
                                    height: '22px',
                                    background: 'var(--color-text-primary)',
                                    borderRadius: '999px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px',
                                    cursor: 'pointer'
                                }}
                            >
                                <motion.div
                                    style={{
                                        width: '26px',
                                        height: '18px',
                                        background: 'var(--color-bg-primary)',
                                        borderRadius: '999px',
                                    }}
                                    animate={{ x: theme === 'dark' ? 26 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            </button>

                            <a href="#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
                                Start Now
                            </a>
                        </div>
                    </div>

                    {/* Mobile Toggle Group */}
                    <div className="mobile-toggle-group" style={{ alignItems: 'center', gap: '1.25rem' }}>
                        <button
                            onClick={toggleTheme}
                            style={{
                                width: '48px',
                                height: '20px',
                                background: 'var(--color-text-primary)',
                                borderRadius: '999px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px'
                            }}
                        >
                            <motion.div
                                style={{ width: '22px', height: '16px', background: 'var(--color-bg-primary)', borderRadius: '999px' }}
                                animate={{ x: theme === 'dark' ? 22 : 0 }}
                            />
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{ color: 'var(--color-text-primary)', zIndex: 102 }}
                        >
                            <div style={{ width: 22, height: 1.5, background: 'currentColor', marginBottom: 5 }}></div>
                            <div style={{ width: 14, height: 1.5, background: 'currentColor', marginLeft: 'auto' }}></div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'var(--color-bg-primary)',
                            zIndex: 101, display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '2rem'
                        }}
                    >
                        {menuItems.concat([{ name: 'Contact', id: 'contact' }]).map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 500,
                                    color: activeSection === item.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
