import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
} from "@react-three/drei";
import { Suspense } from "react";
import { FloatingIsland } from "./FloatingIsland";
import { Rocks } from "./Rocks";
import { Portal } from "./Portal";
import { FloatingRocks } from "./FloatingRocks";
import { Trees } from "./Trees";
import { Grass } from "./Grass";
import {
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  GodRays,
  HueSaturation,
} from "@react-three/postprocessing";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { SceneParticles } from "./SceneParticles";

let lightColour = new Color(1, 0.2, 0.1);
let spotlightMesh = new Mesh(
  new CylinderGeometry(0.3, 0.3, 0.2, 20),
  new MeshBasicMaterial({
    color: lightColour,
    transparent: true,
    opacity: 1,
  })
);

spotlightMesh.rotation.x = Math.PI * 0.5;
spotlightMesh.position.set(1.17, 10.7, -4.1);
spotlightMesh.scale.set(1.5, 1, 1);

export function SceneContainer() {
  return (
    <Suspense fallback={null}>
      <Environment
        background={"only"}
        files={process.env.PUBLIC_URL + "/textures/bg.hdr"}
      />
      <Environment
        background={false}
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
      />

      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[-1.75, 10.85, 20.35]}
      />
      <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />

      <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
        <primitive object={spotlightMesh} />
        <spotLight
          penumbra={1}
          distance={500}
          angle={60.65}
          attenuation={1}
          anglePower={3}
          intensity={0.3}
          color={lightColour}
          position={[1.19, 10.85, -4.45]}
          target-position={[0, 0, -1]}
        ></spotLight>
        <FloatingIsland></FloatingIsland>
        <Portal></Portal>
        <Rocks></Rocks>
        <Trees></Trees>
        <Grass></Grass>
        <SceneParticles></SceneParticles>
      </Float>

      <FloatingRocks></FloatingRocks>

      <EffectComposer stencilBuffer={true}>
        <DepthOfField focusDistance={0.012} focalLength={0.01} bokehScale={7} />
        <HueSaturation hue={0} saturation={-0.15} />
        <BrightnessContrast brightness={0.0} contrast={0.035} />
        <ChromaticAberration
          radialModulation={true}
          offset={[0.00175, 0.00175]}
        />
        <GodRays
          sun={spotlightMesh}
          blendFunction={BlendFunction.Screen}
          samples={40}
          density={0.97}
          decay={0.97}
          weight={0.6}
          exposure={0.3}
          clampMax={1}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
          kernelSize={KernelSize.SMALL}
          blur={true}
        />
      </EffectComposer>
    </Suspense>
  );
}
