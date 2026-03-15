import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function TagCloud({ texts }) {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(140);
  
  const speed = 0.0002;

  const hoveredRef = useRef(false);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Calculate grid positions for arranged layout
  const getGridPositions = useCallback((count, r) => {
    const isMobile = r < 120;
    const cols = isMobile ? Math.min(3, Math.ceil(Math.sqrt(count))) : Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const spacingX = isMobile ? 90 : 120;
    const spacingY = isMobile ? 42 : 50;
    const positions = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const itemsInRow = row === rows - 1 ? count - row * cols : cols;
      const rowOffset = (cols - itemsInRow) * spacingX / 2;
      positions.push({
        x: (col - (cols - 1) / 2) * spacingX + rowOffset,
        y: (row - (rows - 1) / 2) * spacingY,
        z: 0
      });
    }
    return positions;
  }, []);

  useEffect(() => {
    // Compute radius based on container width
    const updateRadius = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const r = Math.min(140, (w / 2) - 60);
        setCurrentRadius(Math.max(60, r));
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const newItems = texts.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i) / texts.length);
      const theta = Math.sqrt(texts.length * Math.PI) * phi;
      return {
        text,
        x: currentRadius * Math.cos(theta) * Math.sin(phi),
        y: currentRadius * Math.sin(theta) * Math.sin(phi),
        z: currentRadius * Math.cos(phi),
      };
    });
    setItems(newItems);
  }, [texts, currentRadius]);

  useEffect(() => {
    let animationFrameId;
    let rotationX = 0;
    let rotationY = 0;
    const gridPositions = getGridPositions(texts.length, currentRadius);
    // Lerp factor for smooth transition
    const lerp = 0.06;
    
    const updatePoints = () => {
      if (hoveredRef.current) {
        // Smoothly lerp towards grid positions
        setItems(prev => prev.map((item, i) => {
          const target = gridPositions[i];
          return {
            ...item,
            x: item.x + (target.x - item.x) * lerp,
            y: item.y + (target.y - item.y) * lerp,
            z: item.z + (target.z - item.z) * lerp,
          };
        }));
      } else {
        // Normal sphere rotation
        rotationY -= speed;
        rotationX -= speed;

        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);

        setItems(prev => prev.map(item => {
          let x1 = item.x * cosY + item.z * sinY;
          let z1 = item.z * cosY - item.x * sinY;
          let y1 = item.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + item.y * sinX;
          return { ...item, x: x1, y: y1, z: z2 };
        }));
      }
      
      animationFrameId = requestAnimationFrame(updatePoints);
    };

    updatePoints();
    return () => cancelAnimationFrame(animationFrameId);
  }, [texts.length, getGridPositions, currentRadius]);

  const handleMouseEnter = () => {
    hoveredRef.current = true;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    setHovered(false);
    mouseXRef.current = 0;
    mouseYRef.current = 0;
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: hovered ? 'default' : 'grab',
      }}
    >
      {items.map((item, idx) => {
        const scale = (item.z + currentRadius) / (2 * currentRadius);
        const opacity = hovered ? 1 : 0.3 + (scale * 0.7);
        const fontSize = hovered ? 0.85 : 0.6 + (scale * 0.6);
        const zIndex = Math.round(scale * 100);
        const depthScale = hovered ? 1 : 0.7 + (scale * 0.3);

        return (
          <div
            key={idx}
            className="sphere-tag"
            style={{
              position: 'absolute',
              transform: `translate(${item.x}px, ${item.y}px) scale(${depthScale})`,
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
              pointerEvents: hovered || scale > 0.5 ? 'auto' : 'none',
              transition: hovered
                ? 'opacity 0.5s ease, font-size 0.5s ease, color 0.3s, background 0.3s, border-color 0.3s'
                : 'color 0.3s, background 0.3s, border-color 0.3s, opacity 0.1s, font-size 0.1s',
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
