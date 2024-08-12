'use client';
import { Environment, OrbitControls, Sphere } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';
import React from 'react';
import * as THREE from 'three';

const Background: React.FC = () => {
  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <Environment preset='sunset' />
      <Sphere scale={100} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting='physical'
          transmission={1}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={'#357ca1'}
            colorB={'#357ca1'}
            axes='y'
            start={0}
            end={-0.5}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};

export default Background;
