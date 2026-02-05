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
                    zIndex: isMobileMenuOpen ? 110 : 100,
                    background: isScrolled || isMobileMenuOpen ? 'var(--color-bg-primary)' : 'transparent',
                    backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(12px)' : 'none',
                    borderBottom: (isScrolled || isMobileMenuOpen) ? '1px solid var(--color-border)' : '1px solid transparent',
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
                                    width: '44px',
                                    height: '24px',
                                    background: 'var(--color-text-primary)',
                                    borderRadius: '100px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            >
                                <motion.div
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        background: 'var(--color-bg-primary)',
                                        borderRadius: '50%',
                                    }}
                                    animate={{ x: theme === 'dark' ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
                                width: '44px',
                                height: '24px',
                                background: 'var(--color-text-primary)',
                                borderRadius: '100px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '3px',
                                border: 'none',
                                outline: 'none'
                            }}
                        >
                            <motion.div
                                style={{ width: '18px', height: '18px', background: 'var(--color-bg-primary)', borderRadius: '50%' }}
                                animate={{ x: theme === 'dark' ? 20 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{
                                color: 'var(--color-text-primary)',
                                zIndex: 102,
                                width: '30px',
                                height: '30px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: isMobileMenuOpen ? 45 : 0,
                                    y: isMobileMenuOpen ? 3 : 0,
                                    width: 22
                                }}
                                style={{ height: 2, background: 'currentColor', marginBottom: isMobileMenuOpen ? 0 : 5, borderRadius: 2 }}
                            />
                            <motion.div
                                animate={{
                                    rotate: isMobileMenuOpen ? -45 : 0,
                                    y: isMobileMenuOpen ? -3 : 0,
                                    width: isMobileMenuOpen ? 22 : 14
                                }}
                                style={{ height: 2, background: 'currentColor', marginLeft: isMobileMenuOpen ? 0 : 'auto', borderRadius: 2 }}
                            />
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
