import React, { useState } from 'react';

const IBotSearchPagination = ({ totalPages = 20, onPageHover }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredLine, setHoveredLine] = useState(null);
  const linesToShow = 5;
  const fixedLineHeight = 20;

  const handleMouseEnter = (page) => {
    setHoveredLine(page);
    onPageHover(page);
  };

  const handleMouseLeave = () => {
    setHoveredLine(null);
  };

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderLines = () => {
    const lines = [];
    const startPage = Math.max(1, currentPage - Math.floor(linesToShow / 2));
    const endPage = Math.min(totalPages, startPage + linesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      lines.push(
        <div
          key={i}
          style={{
            height: `${fixedLineHeight}px`,
            backgroundColor: "#6D31ED",
            color: "white",
            margin: '0 6px',
            width: '4px',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        ></div>
      );
    }
    return lines;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px',
  };

  const linesContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: '0 4px',
  };

  const circleStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: "#6D31ED",
    color: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6em',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  };

  const getTransform = () => {
    const hoveredIndex = hoveredLine !== null ? hoveredLine - 1 : currentPage - 1;
    const offset = (hoveredIndex - (currentPage - 1)) * 20;
    return `translateX(${offset}px)`;
  };

  return (
    <div style={containerStyle}>
      <div style={linesContainerStyle}>{renderLines()}</div>
      <div style={{...circleStyle, transform: getTransform()}}>
        {hoveredLine !== null ? hoveredLine : currentPage}
      </div>
      <div style={linesContainerStyle}>{renderLines()}</div>
    </div>
  );
};

export default IBotSearchPagination;
