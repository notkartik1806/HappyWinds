import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Raw values for zero lag
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovered(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
            }}
        >
            <motion.div
                style={{
                    color: '#FFFFFF',
                    fontSize: isHovered ? '1.5rem' : '1.5rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                animate={{
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{
                    rotate: isHovered ? { duration: 0.6, repeat: Infinity, ease: "linear" } : { duration: 0.3 },
                    scale: { duration: 0.1 },
                    fontSize: { duration: 0.1 }
                }}
            >
                ✦
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
