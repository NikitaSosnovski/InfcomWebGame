import React, { useState } from 'react';
import { Rect, Image as KonvaImage } from 'react-konva';


const Button = ({ x, y, width, height, image, onClick }) => {
  const [size, setSize] = useState({ y, height })
  const org_height = height
  const org_y = y
  const new_height = height -10
  const new_y = y +10

  const handleClick = () => {

    if (onClick) {
      onClick(); // Execute passed function
    }
  }
  const handleMouseDown = () => {
    setSize((prev) => ({
      ...prev,
      height: new_height,
      y: new_y
    }))
  }

  const handleMouseUp = () => {
    setSize((prev) => ({
        ...prev,
        height: org_height,
        y: org_y
      }))
  }

  return (
    <KonvaImage
      x={x}
      y={size.y}
      width={width}
      height={size.height}
      image={image}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Button