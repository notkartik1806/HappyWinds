import React, { useEffect, useRef } from 'react';

const InteractiveGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let dots = [];
        const spacing = 35;
        const mouse = { x: -1000, y: -1000, radius: 180 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDots();
        };

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        originalX: i * spacing,
                        originalY: j * spacing,
                        size: 1
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Get text primary color but use it for the dots with alpha
            const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim();
            ctx.fillStyle = themeColor;

            dots.forEach(dot => {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let displayX = dot.x;
                let displayY = dot.y;

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Move dots slightly towards or away from mouse for "magnetic" feel
                    displayX -= dx * force * 0.15;
                    displayY -= dy * force * 0.15;
                    ctx.globalAlpha = 0.1 + force * 0.4;
                    const size = 1 + force * 1.5;

                    ctx.beginPath();
                    ctx.arc(displayX, displayY, size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.globalAlpha = 0.08;
                    ctx.beginPath();
                    ctx.arc(displayX, displayY, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default InteractiveGrid;
