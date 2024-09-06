/* eslint-disable react/display-name */
import { Environment, Sphere } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';
import React, { useMemo } from 'react';
import * as THREE from 'three';

const Background = React.memo(() => {
  const sphereScale = useMemo(() => 100, []);
  const sphereRotationY = useMemo(() => Math.PI / 2, []);
  const gradientProps = useMemo(
    () => ({
      colorA: '#357ca1',
      colorB: '#357ca1',
      axes: 'y' as const,
      start: 0,
      end: -0.5,
    }),
    [],
  );

  const layerMaterialProps = useMemo(
    () => ({
      transmission: 1,
      side: THREE.BackSide,
    }),
    [],
  );
  return (
    <>
      <Environment preset='sunset' />
      <Sphere scale={sphereScale} rotation-y={sphereRotationY}>
        <LayerMaterial lighting='physical' {...layerMaterialProps} >
          <Gradient {...gradientProps} />
        </LayerMaterial>
      </Sphere>
    </>
  );
});

export default Background;
