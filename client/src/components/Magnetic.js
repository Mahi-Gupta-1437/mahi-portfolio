import React, { useRef, useState, useEffect } from 'react';

export default function Magnetic({ children, pull = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * pull, y: middleY * pull });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: (e) => {
      handleMouse(e);
      if (children.props.onMouseMove) children.props.onMouseMove(e);
    },
    onMouseLeave: (e) => {
      reset();
      if (children.props.onMouseLeave) children.props.onMouseLeave(e);
    },
    style: {
      ...children.props.style,
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s linear',
    }
  });
}
