import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' ;

const App = () => {

  const gltf = useLoader(GLTFLoader, '/pine_tree_-_proto_series_-_free.glb');
  console.log(gltf)
  return (
    <div id="canvas-container" style={{ height: '100vh' }}>
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} color={'white'} />
          <primitive object={gltf.scene} scale={0.1} />
          <OrbitControls />
        </Canvas>
    </div>
  );
}

export default App;
