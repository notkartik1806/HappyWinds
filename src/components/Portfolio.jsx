import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

const projects = [
    { title: 'O3 Physio', category: 'Medical Logo', image: '/portfolio/o3-physio.png' },
    { title: 'Dinner Bell', category: 'Restaurant Identity', image: '/portfolio/dinner-bell.png' },
    { title: 'Evaluation Expertz', category: 'Corporate Mark', image: '/portfolio/evaluation-expertz.png' },
    { title: 'Navkar Builders', category: 'Real Estate', image: '/portfolio/navkar-builders.png' },
    { title: 'Nirja Gruh Udhyog', category: 'Local Brand', image: '/portfolio/nirja-gruh.png' },
    { title: 'Tech Pulse', category: 'Tech Startup', image: '/portfolio/tech-pulse.png' },
    { title: 'Green Earth', category: 'Eco Initiative', image: '/portfolio/green-earth.png' },
    { title: 'Skyline Ventures', category: 'Real Estate', image: '/portfolio/skyline.png' },
    { title: 'Blue Ocean', category: 'Marine Solutions', image: '/portfolio/blue-ocean.png' },
    { title: 'Pure Health', category: 'Healthcare', image: '/portfolio/pure-health.png' },
    { title: 'Swift Logistics', category: 'Transportation', image: '/portfolio/swift.png' },
    { title: 'Urban Living', category: 'Interior Design', image: '/portfolio/urban.png' },
    { title: 'Vantage Point', category: 'Consulting', image: '/portfolio/vantage.png' },
    { title: 'Zenith Tech', category: 'Software Development', image: '/portfolio/zenith.png' },
    { title: 'Amber Glow', category: 'Wellness Spa', image: '/portfolio/amber.png' },
    { title: 'Nova Solar', category: 'Renewable Energy', image: '/portfolio/nova.png' },
    { title: 'Peak Performance', category: 'Sports Branding', image: '/portfolio/peak.png' },
    { title: 'Terra Firma', category: 'Construction', image: '/portfolio/terra.png' },
    { title: 'Velvet Rose', category: 'Fashion Boutique', image: '/portfolio/velvet.png' },
    { title: 'Wild Root', category: 'Organic Goods', image: '/portfolio/wild.png' },
];

const Portfolio = () => {
    const [width, setWidth] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const containerRef = useRef();
    const carouselRef = useRef();
    const controls = useAnimation();
    const x = useMotionValue(0);

    // Double the projects for a seamless loop
    const loopedProjects = [...projects, ...projects];

    React.useEffect(() => {
        if (carouselRef.current) {
            const scrollWidth = carouselRef.current.scrollWidth;
            const offsetWidth = carouselRef.current.offsetWidth;
            setWidth(scrollWidth / 2); // Limit scroll to half (one full set)
        }
    }, [projects]);

    const startAutoMove = async () => {
        await controls.start({
            x: -width,
            transition: {
                duration: 30, // Adjust speed here
                ease: "linear",
                repeat: Infinity
            }
        });
    };

    React.useEffect(() => {
        if (!isPaused && width > 0) {
            startAutoMove();
        } else {
            controls.stop();
        }
    }, [isPaused, width]);

    return (
        <section id="portfolio" className="section" style={{ background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem' }}
                >
                    <h2>Our Portfolio</h2>
                    <p>Recent crafts for visionary brands.</p>
                </motion.div>
            </div>

            <div
                className="carousel-container"
                ref={carouselRef}
                style={{ overflow: 'hidden', cursor: 'grab', padding: '0 2rem' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragElastic={0.1}
                    style={{ display: 'flex', gap: '2rem', width: 'max-content', x }}
                    animate={controls}
                    dragConstraints={{ left: -width, right: 0 }}
                    onDragStart={() => setIsPaused(true)}
                    onDragEnd={() => setIsPaused(false)}
                    whileTap={{ cursor: "grabbing" }}
                    onUpdate={(latest) => {
                        // Ring effect logic: if it goes beyond the width, reset to start seamlessly
                        if (latest.x <= -width) {
                            x.set(0);
                        } else if (latest.x > 0) {
                            x.set(-width);
                        }
                    }}
                >
                    {loopedProjects.map((proj, index) => (
                        <motion.div
                            key={index}
                            className="card-interactive"
                            style={{
                                minWidth: '400px',
                                height: '380px', // Increased height for better proportions
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'var(--color-bg-card)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                padding: '1rem' // Added padding for the internal "card within card" look
                            }}
                        >
                            {/* Image Container */}
                            <div style={{
                                flex: 1,
                                background: 'var(--color-bg-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                position: 'relative',
                                borderRadius: 'var(--radius-md)', // Curved edges for photo
                            }}>
                                <motion.img
                                    src={proj.image}
                                    alt={proj.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div style="
                                                width: 100%; 
                                                height: 100%; 
                                                display: flex; 
                                                align-items: center; 
                                                justify-content: center;
                                                background: var(--color-bg-secondary);
                                                color: var(--color-text-secondary);
                                                font-size: 0.9rem;
                                            ">
                                                ${proj.title}
                                            </div>
                                        `;
                                    }}
                                />
                            </div>

                            {/* Info Section */}
                            <div style={{ padding: '1.25rem 0.5rem 0.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'inherit' }}>{proj.title}</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7, color: 'inherit' }}>{proj.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
