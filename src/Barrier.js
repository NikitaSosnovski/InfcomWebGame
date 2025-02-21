import React from 'react';
import { Rect, Image as KonvaImage } from 'react-konva';

class Barrier {
    constructor(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }
  
    render(index, img) {
      return (
        <><Rect
          key={index}
          x={this.x}
          y={this.y}
          width={this.width}
          height={this.height}
          fill="transparent" /><KonvaImage
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height * 1.5}
            image={img} /></>
      );
    }
}

export default Barrier