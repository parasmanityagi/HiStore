import React, { useState, useEffect } from 'react';

const UlList = ({ title }) => {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes widthAnimation {
        0% {
          width: 0;
        }
        100% {
          width: 12px;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const animatedStyle = {
    animation: hover ? 'widthAnimation 0.3s ease-in-out forwards' : 'none',
    width: hover ? '12px' : '0',
    height: '2px',
    backgroundColor: 'orange'
  };

  return (
    <li
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='text-[13px] font-light flex flex-row items-center gap-0.5 mb-1 cursor-pointer'
    >
      <div style={animatedStyle} />
      <span>{title}</span>
    </li>
  );
};

export default UlList;
