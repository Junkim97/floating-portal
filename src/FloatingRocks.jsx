import { Float } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function FloatingRocks() {
  const rock1 = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/floating_rock_1.glb"
  );
  const rock2 = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/floating_rock_2.glb"
  );
  const rock3 = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/floating_rock_3.glb"
  );

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.6}>
        <primitive object={rock1.scene} position={[-20.5, -7, -19]} />
      </Float>

      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <primitive object={rock2.scene} position={[-6, 10, -33]} />
      </Float>

      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <primitive object={rock3.scene} position={[20, 3.5, -9]} />
      </Float>
    </>
  );
}
