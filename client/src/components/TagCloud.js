import React, { useEffect, useRef, useState } from 'react';

export default function TagCloud({ texts }) {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  
  const radius = 140; // Size of the sphere
  const speed = 0.001;

  let mouseX = 0;
  let mouseY = 0;
  let rotationX = 0;
  let rotationY = 0;

  useEffect(() => {
    // Initial distribute points on a sphere (Fibonacci sphere algorithm)
    const newItems = texts.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i) / texts.length);
      const theta = Math.sqrt(texts.length * Math.PI) * phi;
      return {
        text,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
    setItems(newItems);
  }, [texts, radius]);

  useEffect(() => {
    let animationFrameId;
    
    const updatePoints = () => {
      // Auto rotate slowly, plus mouse influence
      rotationY -= Math.max(-speed * 3, Math.min(speed * 3, mouseX * 0.0001)) || speed;
      rotationX -= Math.max(-speed * 3, Math.min(speed * 3, mouseY * 0.0001)) || speed;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      setItems(prev => prev.map(item => {
        // Rotate around Y
        let x1 = item.x * cosY + item.z * sinY;
        let z1 = item.z * cosY - item.x * sinY;
        
        // Rotate around X
        let y1 = item.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + item.y * sinX;

        return { ...item, x: x1, y: y1, z: z2 };
      }));
      
      animationFrameId = requestAnimationFrame(updatePoints);
    };

    updatePoints();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to center of container
    mouseX = e.clientX - rect.left - rect.width / 2;
    mouseY = e.clientY - rect.top - rect.height / 2;
  };

  const handleMouseLeave = () => {
    mouseX = 0;
    mouseY = 0;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {items.map((item, idx) => {
        // Calculate style based on 3D depth
        const scale = (item.z + radius) / (2 * radius); // 0 (back) to 1 (front)
        const opacity = 0.3 + (scale * 0.7);
        const fontSize = 0.6 + (scale * 0.6); // smaller in back, larger in front
        const zIndex = Math.round(scale * 100);

        return (
          <div
            key={idx}
            className="sphere-tag"
            style={{
              position: 'absolute',
              transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px)`,
              opacity: opacity,
              zIndex: zIndex,
              fontSize: `${fontSize}rem`,
              color: 'var(--primary)',
              fontWeight: 700,
              padding: '6px 12px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px var(--shadow)',
              pointerEvents: scale > 0.5 ? 'auto' : 'none', // only clickable if in front
              transition: 'color 0.3s, background 0.3s, border-color 0.3s, opacity 0.1s, font-size 0.1s',
              userSelect: 'none'
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}
