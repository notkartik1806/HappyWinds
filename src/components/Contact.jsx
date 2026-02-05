import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! Your inquiry has been sent directly to our team. We\'ll get back to you shortly.' });
                setFormState({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please ensure our server is running or contact us directly at hihappywinds@gmail.com' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section" style={{ background: 'var(--color-bg-primary)' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>Start Your Project</h2>
                    <p>Let's create something extraordinary together.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Get in Touch</h3>
                            <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                                Ready to elevate your brand? Share your vision with us and we'll craft a logo that speaks volumes.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'var(--color-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.25rem' }}>Email</p>
                                    <p style={{ fontWeight: 500 }}>hihappywinds@gmail.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'var(--color-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.25rem' }}>Phone</p>
                                    <p style={{ fontWeight: 500 }}>+91 96648 29116</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'var(--color-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.25rem' }}>Location</p>
                                    <p style={{ fontWeight: 500 }}>Ahmedabad, Gujarat, India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg-card)',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg-card)',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="tel"
                                placeholder="Your Phone Number"
                                value={formState.phone}
                                onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-card)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Tell us about your project..."
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-card)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                opacity: isSubmitting ? 0.6 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {!isSubmitting && <Send size={18} />}
                        </button>

                        {status.message && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-sm)',
                                background: status.type === 'success' ? '#10B98120' : '#EF444420',
                                color: status.type === 'success' ? '#10B981' : '#EF4444',
                                fontSize: '0.95rem',
                                textAlign: 'center'
                            }}>
                                {status.message}
                            </div>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
