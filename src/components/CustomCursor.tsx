import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(-35); // Resting pointer angle (pointing northwest)
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const prevPos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef(-35);
  const currentRotation = useRef(-35);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      // Calculate movement angle
      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 3) {
        // Angle in degrees
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        targetRotation.current = angle;
      }

      prevPos.current = { x, y };
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Smooth rotation interpolation loop
    let animId: number;
    const animate = () => {
      // Smoothly slerp rotation towards target rotation
      let diff = targetRotation.current - currentRotation.current;
      // Normalize angle difference to [-180, 180]
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;

      currentRotation.current += diff * 0.18;
      setRotation(currentRotation.current);

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] transition-opacity duration-150"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Paper Plane Silhouette (Exact match to Bryan Garage screenshot) */}
      <div
        className="transition-transform duration-75 ease-out"
        style={{
          transform: `rotate(${rotation + 45}deg) scale(${isClicked ? 0.8 : isHovered ? 1.25 : 1})`,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter"
        >
          {/* Main Paper Airplane Wings */}
          <path
            d="M2.5 2.5 L22 9.5 L12.5 13 L9.5 22 L2.5 2.5 Z"
            fill={isHovered ? '#FFA500' : '#FFFFFF'}
            stroke="#18181b"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />
          {/* Fold Crease line */}
          <path
            d="M2.5 2.5 L12.5 13"
            stroke={isHovered ? '#B45309' : '#D4D4D8'}
            strokeWidth="0.75"
          />
        </svg>

        {/* Ambient thrust glow on hover */}
        {isHovered && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-400/30 rounded-full blur-md pointer-events-none -z-10 animate-ping" />
        )}
      </div>
    </div>
  );
};
