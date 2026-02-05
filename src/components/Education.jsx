import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { id: 'basics', label: 'Basics' },
    { id: 'components', label: 'Components' },
    { id: 'importance', label: 'Importance' },
    { id: 'types', label: 'Types' },
    { id: 'tips', label: 'Do\'s & Don\'ts' }
];

const content = {
    basics: (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Basic Concepts of Logo</h3>
            <p style={{ marginBottom: '1.5rem' }}>
                Logos are images, texts, shapes, or a combination of the three that depict the name and purpose of a business – to put it simply. However, Happywinds Logo believes a logo can and should be more than a symbol of identification. If designed well, it also tells a company’s story, by conveying your brand message in a way that helps to establish an emotional connection with your target audience.
            </p>
            <p>
                A logo is important mainly because it makes a great first impression which invites customers to interact with your brand, helps create brand identity, gives your company a symbol to be remembered by, distinguishes you from competitors, and fosters brand loyalty.
            </p>
        </div>
    ),
    components: (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Components Of Logo</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Color</h4>
                    <p>Colors go way beyond aesthetic appeal – they’re the core communicators of your message. They tell your audience if you’re playful or serious, innovative or wholesome. Your logo color palette can be made up of a single color or several.</p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Typography</h4>
                    <p>Typography includes the letters you’d see in a logo, arranged in some kind of consistent design. You’ll find logos built around a single letter, a monogram, or even the full name of a business.</p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Image</h4>
                    <p>An image can range from the simplest arrow to a detailed rendition of an abstract icon. It can be a symbol that represents something you sell or a value you stand for.</p>
                </div>
            </div>
        </div>
    ),
    importance: (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Importance Of Logo</h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><strong>Ease of Recognition:</strong> A logo should be easily recognizable in large- and small-print. Your logo should be simple and not compete with other company logos.</li>
                <li><strong>Reflects Your Business:</strong> Good logos clearly show what the company does or represents (e.g., Nike's Swoosh representing speed).</li>
                <li><strong>Consumer Loyalty:</strong> Consumers demonstrate loyalty by wearing logos (e.g., Harley Davidson, Apple). Good logos are social proof.</li>
                <li><strong>Evoke Emotional Responses:</strong> Color schemes and design help develop an emotional tie. Green suggests cohesiveness; Black suggests formality.</li>
            </ul>
        </div>
    ),
    types: (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Types of Logo Designs</h3>
            <div className="grid grid-2">
                {[
                    { title: "Word Mark", desc: "A freestanding acronym, company name, or product name designed to convey a brand attribute." },
                    { title: "Letterforms", desc: "A unique design using one or more letterforms that act as a mnemonic device." },
                    { title: "Emblem", desc: "A mark in which the company name is inextricably connected to a pictorial element." },
                    { title: "Pictorial Mark", desc: "An immediately recognizable literal image that has been simplified and stylized." },
                    { title: "Abstract Mark", desc: "A symbol that conveys a big idea, and often embodies strategic ambiguity." }
                ].map((t, i) => (
                    <div key={i} style={{ padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>{t.title}</h4>
                        <p style={{ fontSize: '0.95rem' }}>{t.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    ),
    tips: (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>12 Do’s And Don’ts</h3>
            <div className="grid grid-2">
                {[
                    { title: "Keep Simple", do: "Most best logos are simple.", dont: "Too much detail cramps the message." },
                    { title: "Be Unique", do: "Be different to stand out.", dont: "Tie a logo to a trend/fad." },
                    { title: "Colour", do: "Colours matter.", dont: "Mess up your logo with too many." },
                    { title: "Versatility", do: "Ensure visibility in all media.", dont: "Stick to one version." },
                    { title: "Typography", do: "Use max two fonts.", dont: "Overuse fonts." },
                    { title: "Lines Matter", do: "Simple lines and bold shapes.", dont: "Use sunbursts and swirls." }
                ].map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>{i + 1}. {item.title}</h4>
                        <p style={{ color: '#10B981', marginBottom: '0.25rem' }}><strong>Do:</strong> {item.do}</p>
                        <p style={{ color: '#EF4444' }}><strong>Don't:</strong> {item.dont}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

const Education = () => {
    const [activeTab, setActiveTab] = useState('basics');

    return (
        <section id="education" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem' }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>Logo Education</h2>
                    <p>Understanding the logic behind the design.</p>
                </motion.div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', borderBottom: '1px solid var(--color-border)' }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '1rem 1.5rem',
                                fontSize: '1.1rem',
                                borderBottom: activeTab === tab.id ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                                color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ minHeight: '400px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {content[activeTab]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Education;
