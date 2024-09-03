import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function ColorDropper() {

  const [color, setColor] = useState('#ffffff');

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const [displayColor, setDisplayColor] = useState(false);

  const canvasRef = useRef(null);

  const image = new Image();

  image.src = "island-palm-trees.jpg";

  // image.width = "4000";
  // image.height = "4000";

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvasRef.current.width = image.width / 2;
    canvasRef.current.height = image.height / 2;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, image.width / 2, image.height / 2);
    }
  };

  useEffect(() => {
    drawImage();
  }, [image]);

  useEffect(() => {
    const picker_image = document.getElementsByClassName("color-picker-selected")[0];
    if (picker_image) {
      picker_image.style.left = left + "px";
      picker_image.style.top = top + "px";
    }
  })

  const handleMoveClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (x && y) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      const hex =
        '#' + ('000000' + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);

      setColor(hex);
      setLeft(e.pageX - 10);
      setTop(e.pageY + 5);
      setDisplayColor(true);
    }
  };

  const handleLeave = (e) => {
    setDisplayColor(false);
  };

  const rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
    return ((r << 16) | (g << 8) | b).toString(16);
  };

  return (
    <div className="color-picker m-4">
      <canvas
        ref={canvasRef}
        width={image.width / 2}
        height={image.height / 2}
        onMouseMove={handleMoveClick}
        onMouseLeave={handleLeave}
        onTouchEnd={handleMoveClick}
        className="canvas-element"
      />
      <div className="color-picker-selected">
        <div className="color-picker-selected-color"
          style={{ display: (displayColor ? "block" : "none"), border: `10px solid `, color: color }}>
          <div className="color-picker-selected-code">
            <span style={{ color: 'black' }}>{color}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorDropper;
