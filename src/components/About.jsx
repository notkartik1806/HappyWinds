import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section" style={{ background: 'var(--color-bg-primary)', padding: '8rem 0', position: 'relative' }}>
            <div className="container">
                <div style={{ maxWidth: '900px', margin: '0 auto 6rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: '2rem' }}
                    >
                        We are a team of passionate <span style={{ color: 'var(--color-text-secondary)' }}>graphic designers and sketch artists</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}
                    >
                        Drafting the best logo is not just a project for us, but an opportunity to add tremendous value to the brand of our clients. We uphold highest standards of integrity in all of our actions. We value our people, encourage their development and reward their performance.
                        <br /><br />
                        We are not individual names or photos. <strong style={{ color: 'var(--color-text-primary)' }}>We are 'Team-HW'</strong>.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}
                >
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '3rem', textAlign: 'center' }}>Trusted by companies worldwide</h4>

                    {/* Client Logos Grid - Using placeholders */}
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', justifyItems: 'center', gap: '3rem', opacity: 0.8 }}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} style={{ width: '120px', height: '40px', background: 'var(--color-bg-secondary)', borderRadius: '4px' }}></div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
