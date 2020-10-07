import * as THREE from 'three/src/Three.js';

function RoundedPlaneGeometry(size, radius, depth, curve) {

  var x, y, width, height;

  x = y = - size / 2;
  width = height = size;
  radius = size * radius;

  const shape = new THREE.Shape();

  if (curve) {
    shape.moveTo(x,y + curve + radius / 2);
    shape.lineTo(x,y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius,y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width,y + curve + radius / 2);
    shape.bezierCurveTo(x + (width * 0.7), y - curve / 2, x + (width * 0.3), y - curve / 2, x, y + curve + radius / 2);

  } else {
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
  }

  const geometry = new THREE.ExtrudeBufferGeometry(
    shape,
    {
      // depth: depth, bevelEnabled: false, curveSegments: 3 
      depth: depth,
      bevelEnabled: false,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1
    }
  );

  return geometry;

}

export { RoundedPlaneGeometry };
