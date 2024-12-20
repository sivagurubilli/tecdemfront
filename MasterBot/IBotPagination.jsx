import React, { useState } from 'react';

const IBotPagination = ({ totalPages = 10, onPageHover }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(null);

  const handleMouseEnter = (page) => {
    setHoveredPage(page);
    onPageHover(page);
  };

  const handleMouseLeave = () => {
    setHoveredPage(null);
  };

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageHover(page);
  };
  const renderDots = () => {
    const dots = [];
    const dotsToShow = totalPages;
  
    for (let i = 1; i <= dotsToShow; i++) {
      const isCurrent = i === currentPage;
  
      if (isCurrent) {
        dots.push(
          <div key={`circle-${i}`} style={circleStyle} aria-label={`Current page: ${currentPage}`}>
            {currentPage}
          </div>
        );
      } else {
        dots.push(
          <div
            key={i}
            style={{
              height: '7px', 
              width: '7px',  
              backgroundColor: '#8A0EE5', 
              color: 'white',
              margin: '0 8px', 
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              transform:  'scale(1)',
              border:isCurrent ? '1px solid #6D31ED' : '1px solid transparent',
            }}
            onClick={() => handleClick(i)}
            aria-label={`Go to page ${i}`}
          />
        );
      }
    }
  
    return dots;
  };
  
  const circleStyle = {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    backgroundColor: '#8A0EE5',    
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3em',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '0 12px',
  };
  
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      {renderDots()}
    </div>
  );
};

export default IBotPagination;
