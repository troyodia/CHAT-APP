import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { useGLTF, useAnimations } from "@react-three/drei";
import rasengan from "../../models/rasengan.glb";
export default function Rasengan(props) {
  const group = useRef();
  const sphere = useRef();
  const sphere1 = useRef();
  const sphere2 = useRef();
  const cylinder = useRef();
  const { nodes, materials, animations } = useGLTF(rasengan);
  const { actions } = useAnimations(animations, group);
  useFrame((state, delta) => {
    if (
      sphere.current &&
      sphere1.current &&
      sphere2.current &&
      cylinder.current
    ) {
      sphere.current.rotation.y += delta;
      sphere1.current.rotation.y += delta;
      sphere2.current.rotation.y += -delta;
      // sphere2.current.rotation.x += -delta;

      cylinder.current.rotation.y += delta * 1.5;
      // cylinder.current.rotation.x += delta;
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group ref={sphere2} name="Sphere_2">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group name="rasengan_core_empty_3" scale={1.431} />
              <group name="Sphere001_4" scale={0.913}>
                <mesh
                  ref={sphere}
                  name="Object_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials["Material.003"]}
                />
              </group>
              <group name="Sphere002_5" scale={0.653}>
                <mesh
                  ref={sphere1}
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group name="Cylinder_6" scale={[1.709, 0.368, 1.709]}>
                <mesh
                  ref={cylinder}
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials["Material.004"]}
                />
              </group>
              <group name="rasengan_around_empty_7" scale={1.422} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(rasengan);
