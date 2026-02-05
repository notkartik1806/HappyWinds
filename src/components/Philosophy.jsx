import React from 'react';
import { motion } from 'framer-motion';

const Philosophy = () => {
    return (
        <section id="philosophy" className="section" style={{ background: '#18181B', color: 'white', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
            {/* Subtle Grid Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="grid grid-2" style={{ alignItems: 'center', gap: '6rem' }}>
                    <div>
                        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{ color: 'white', lineHeight: 1.1, margin: 0 }}
                            >
                                Design is not just
                            </motion.h2>
                        </div>
                        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                style={{ color: 'white', lineHeight: 1.1, margin: 0 }}
                            >
                                what it looks like.
                            </motion.h2>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                style={{ color: '#52525B', lineHeight: 1.1, margin: 0 }}
                            >
                                It's how it works.
                            </motion.h2>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <p style={{ color: '#D4D4D8', marginBottom: '3rem', fontSize: '1.25rem', lineHeight: 1.8 }}>
                            We favor reduction over decoration. Our process is rooted in strategy, ensuring every element serves a purpose. We don't just make things pretty; we build systems that scale and identities that endure.
                        </p>
                        <div style={{ display: 'flex', gap: '4rem' }}>
                            {[
                                { number: '10+', label: 'Years Experience' },
                                { number: '200+', label: 'Projects Delivered' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                                >
                                    <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '3rem', fontWeight: 300 }}>{stat.number}</h4>
                                    <p style={{ color: '#71717A' }}>{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
