import React from 'react';
import { Rect, Image as KonvaImage } from 'react-konva';

class Person {
    constructor(x, y, width, height, image_active, image_passive) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.img_act = image_active
      this.img_pas = image_passive
      this.img = image_active
    }
    getImage(){
        return(
            this.img
        )
    }

    updateImage(img_act, img_pas) {
        const img = this.getImage()
        this.img = img === img_act ? img_pas : img_act
    }
  
    render(index, img) {
      return (
        <><Rect
          key={index}
          x={this.x}
          y={this.y}
          width={this.width}
          height={this.height}
          fill="transparent" />
          <KonvaImage
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            image={img} /></>
      );
    }
}

export default Person