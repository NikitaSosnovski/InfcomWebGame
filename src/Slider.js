import React, { useState } from 'react'
import { Group, Image as KonvaImage } from 'react-konva'

let zoomScale = 0

function resetZoom(){
    zoomScale = 0
}
const Slider = ({ x, y, width, height, img_slider, img_slidebar }) => {
  const [sliderY, setSliderY] = useState(0)
  const moveSlider = (event) => {
    const mouseY = event.target.getStage().getPointerPosition().y*776/window.innerHeight
    let newSliderY = height - (mouseY - y) - 7.2
    newSliderY = Math.max(0, Math.min(height-14.4, newSliderY))
    setSliderY(newSliderY)
    zoomScale = newSliderY/(height-14.4)
  }

  return (
    <Group>
        <KonvaImage
              x={x} 
              y={y} 
              width={width} 
              height={height}
              image={img_slidebar}
              onClick={moveSlider}
          />
        <KonvaImage
              x={x - 9.45}
              y={y + height - sliderY - 14.4} 
              width={32.4} 
              height={14.4} 
              image={img_slider}
              onClick={moveSlider}
          />
        
    </Group>
  )
}

export default Slider
export {zoomScale}
export {resetZoom}