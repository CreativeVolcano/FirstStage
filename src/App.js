import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import { Color } from "three";

const Box = (props) => {
  const { id, visibleIndex, setVisibleIndex, ...rest } = props; 
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [rotateNumber, setRotateNumber] = useState(0.01);

  useFrame((state, delta) => {
    if (rotateNumber > 0.01)
      setRotateNumber(rotateNumber - 0.0001);
    return ref.current.rotation.x += (delta + rotateNumber);
  });

  const handleClick = (event) => {
    setRotateNumber(rotateNumber + 0.01)
  }

  return (
    <mesh
      {...rest}
      ref={ref}
      scale={hovered ? 1.5 : 1}
      onPointerOver={(event) => (event.stopPropagation(), setHovered(true), setVisibleIndex(id))}
      onPointerOut={(event) => (event.stopPropagation(), setHovered(false), setVisibleIndex(''))}
      onClick={(event) => handleClick(event)}
      visible={visibleIndex === '' ? true : visibleIndex === id ? true : false }
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'orange'} />
    </mesh>
  );
}

const App = () => {
  const pointRef = useRef();
  const [visibleIndex, setVisibleIndex] = useState('');


  useEffect(() => {
    if(pointRef.current){
      if(visibleIndex === 'left')
        pointRef.current.color = new Color('#F00707') 
      else if(visibleIndex === 'right')
        pointRef.current.color = new Color('#ECF007') 
    }
  }, [visibleIndex]);


  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight ref={pointRef} position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI / 2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={3} />
        <Box id='left' visibleIndex={visibleIndex} setVisibleIndex={setVisibleIndex} position={[-1.2, 0, 0]} />
        <Box id='right'  visibleIndex={visibleIndex} setVisibleIndex={setVisibleIndex} position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
