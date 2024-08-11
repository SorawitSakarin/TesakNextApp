import {
  Cloud,
  CloudInstance,
  Clouds,
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Text,
  useScroll,
} from '@react-three/drei';
import Background from './Background';
import Airplane from './Airplane';
import * as THREE from 'three';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const Experience = () => {
  const CURVE_DISTANCE = 250;
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(50, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-50, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(50, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    [],
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);
  }, []);

  const cameraCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.15, 0.2, -9.99),
        new THREE.Vector3(1, 5, -10),
        new THREE.Vector3(0, 4, -20),
        new THREE.Vector3(-3, 2, -10),
        new THREE.Vector3(-6, 1, -3),
        new THREE.Vector3(-2.5, 0, 0),
        new THREE.Vector3(-1, 0, 2),
        new THREE.Vector3(0, 0, 0),
      ],
      false,
      'catmullrom',
      0.5,
    );
  }, []);

  const newCameraCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0.5, 0),
          new THREE.Vector3(0, 0.5, -5),
          new THREE.Vector3(0, 0.5, -10),
          new THREE.Vector3(0, 0.5, -15),
          new THREE.Vector3(0, 0.5, -20),
          new THREE.Vector3(0, 0.5, -25),
          new THREE.Vector3(0, 0.5, -30),
        ],
        false,
        'catmullrom',
        0.5,
      ),
    [],
  );

  const linePoints = useMemo(() => {
    return curve.getPoints(500000);
  }, [curve]);

  const cameraPoints = useMemo(() => {
    return cameraCurve.getPoints(20000);
  }, [cameraCurve]);

  const newCameraPoints = useMemo(
    () => newCameraCurve.getPoints(20000),
    [newCameraCurve],
  );

  const scroll = useScroll();
  const cameraGroup: any = useRef();
  const airplane: any = useRef();
  const planeOut: any = useRef();
  const cameraGroupRef: any = useRef();
  const cameraRef: any = useRef();
  const [curCamera, setCurCamera] = useState(0);
  const [end, setEnd] = useState(false);

  const floating = (delta: any) => {
    const t = performance.now() * 0.001;
    const offset = Math.sin(t) * 0.2;
    return new THREE.Vector3(0, offset, 0);
  };

  const floatingCamera = (offset: any) => {
    const t = (offset - 0.2) * 50;
    if (t < 11 * Math.PI) {
      const cameraOffset = Math.sin(t) * 1;
      return new THREE.Vector3(cameraOffset, 0, 0);
    }
    return new THREE.Vector3(0, 0, 0);
  };

  useFrame((_state, delta) => {
    if (!end) {
      const offset = scroll.offset;
      let cameraIndex;
      if (offset <= 0.2) {
        cameraIndex = 0;
      } else if (offset <= 0.9) {
        cameraIndex = 1;
      } else {
        cameraIndex = 2;
      }
      if (cameraIndex !== curCamera) {
        setCurCamera(cameraIndex);
      }

      const floatPos = floating(delta);
      const floatCameraPos = floatingCamera(offset);

      if (cameraIndex === 0) {
        if (offset <= 0.0005) {
          if (cameraGroupRef.current) {
            cameraGroupRef.current.position.lerp(cameraPoints[0], delta * 24);
            cameraGroupRef.current.quaternion.slerp(
              new THREE.Quaternion(0, 0, 0, 0),
              delta * 2,
            );
          }

          if (cameraGroup.current) {
            cameraGroup.current.quaternion.slerp(
              new THREE.Quaternion(0, 0, 0, 0),
              delta * 2,
            );
            cameraGroup.current.position.lerp(linePoints[0], delta * 24);
          }
          if (airplane.current) {
            airplane.current.position.lerp(
              new THREE.Vector3(0, 0, 0),
              delta * 24,
            );
          }
        } else {
          const curCameraPointIndex = Math.min(
            Math.round((offset * cameraPoints.length) / 0.2),
            cameraPoints.length - 1,
          );
          const cameraPoint = cameraPoints[curCameraPointIndex];

          cameraGroupRef.current.position.lerp(cameraPoint, delta * 24);
          airplane.current.position.lerp(
            new THREE.Vector3(0, 0, 0).add(floatPos),
            delta * 24,
          );
          airplane.current.quaternion.slerp(
            new THREE.Quaternion(0, 0, 0, 0),
            delta * 2,
          );

          cameraGroup.current.quaternion.slerp(
            new THREE.Quaternion(0, 0, 0, 0),
            delta * 2,
          );
          cameraGroup.current.position.lerp(linePoints[0], delta * 24);
        }
        const po = new THREE.Vector3()
          .copy(airplane.current.position)
          .sub(new THREE.Vector3(0.13, 0, 0.1));
        cameraRef.current.lookAt(po);
      } else if (cameraIndex === 1) {
        cameraRef.current.lookAt(cameraGroup.current.position);
        const curPointIndex = Math.min(
          Math.round(((offset - 0.2) * linePoints.length) / 0.7), // Adjust for offset starting at 0.5
          linePoints.length - 1,
        );
        const curPoint = linePoints[curPointIndex];
        const pointAhead =
          linePoints[Math.min(curPointIndex + 2, linePoints.length - 1)];

        const xDisplacement = (pointAhead.x - curPoint.x) * 80;

        // Math.PI / 2 -> LEFT
        // -Math.PI / 2 -> RIGHT
        const angleRotation =
          (xDisplacement < 0 ? 1 : -1) *
          Math.min(Math.abs(xDisplacement), Math.PI / 3);

        const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            airplane.current.rotation.x,
            airplane.current.rotation.y,
            angleRotation,
          ),
        );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            cameraGroup.current.rotation.x,
            angleRotation,
            cameraGroup.current.rotation.z,
          ),
        );

        airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
        airplane.current.position.lerp(floatPos, delta * 24);
        cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        cameraGroup.current.position.lerp(curPoint, delta * 24);

        cameraGroupRef.current.position.lerp(floatCameraPos, delta * 24);
      } else if (cameraIndex === 2) {
        // Move only the camera along the camera curve
        const curCameraPointIndex = Math.min(
          Math.round((offset - 0.9) * cameraPoints.length) * 10,
          cameraPoints.length - 1,
        );
        const cameraPoint = newCameraPoints[curCameraPointIndex];
        const targetCameraPoint = cameraPoint.clone();
        const angleRotation =
          (targetCameraPoint.x - cameraGroupRef.current.position.x < 0
            ? 1
            : -1) *
          Math.min(
            Math.abs(targetCameraPoint.x - cameraGroupRef.current.position.x),
            Math.PI / 3,
          );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            cameraGroupRef.current.rotation.x,
            angleRotation,
            cameraGroupRef.current.rotation.z,
          ),
        );
        airplane.current.position.lerp(floatPos, delta * 24);
        cameraGroupRef.current.quaternion.slerp(
          targetCameraQuaternion,
          delta * 2,
        );
        cameraGroupRef.current.position.lerp(targetCameraPoint, delta * 24);
        cameraGroup.current.quaternion.slerp(
          new THREE.Quaternion(0, 0, 0, 0),
          delta * 2,
        );

        if (scroll.offset > 0.95) {
          setEnd(true);
          planeOut.current.play();
        }
      }
    } else {
      return;
    }
  });

  useEffect(() => {
    planeOut.current = gsap.timeline();
    planeOut.current.pause();
    planeOut.current.to(
      cameraGroup.current.position,
      {
        duration: 5,
        z: -1812,
        y: 0,
      },
      0,
    );
  }, []);

  return useMemo(
    () => (
      <>
        {/* <OrbitControls
                enableZoom={true}
                minDistance={0.1}  
                maxDistance={2000} 
            /> */}
        <group ref={cameraGroup}>
          <group ref={cameraGroupRef}>
            <PerspectiveCamera
              ref={cameraRef}
              position={[0, 0, 10]}
              fov={30}
              near={0.1}
              far={500}
              makeDefault
            ></PerspectiveCamera>
          </group>
          <Background />
          <group ref={airplane}>
            <Airplane
              key='airplane-with-float'
              rotation-y={Math.PI / 2}
              scale={[0.3, 0.3, 0.3]}
              position-y={-1}
            />
            <Line
              points={newCameraPoints}
              lineWidth={0}
              color={'#ffffff'}
              opacity={0.7}
              transparent
            />
          </group>
        </group>
        <group key='text'>
          <group position={[-2.8, 2, -20]} rotation-y={Math.PI / 15}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              maxWidth={2.5}
            >
              Welcome to TesakKaset{'\n'}
              Enjoy the ride
            </Text>
          </group>
          <group position={[0, 2.5, -48]} rotation-y={-Math.PI / 90}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              maxWidth={2.5}
            >
              Unlock the potential of your meals{'\n'}with our premium
              performance rice
            </Text>
          </group>
        </group>
        <group position-y={-1}>
          <Line
            points={linePoints}
            lineWidth={1}
            color={'#ff0000'}
            opacity={0.7}
            transparent
          />
          <Line
            points={cameraPoints}
            lineWidth={1}
            color={'#ff0000'}
            opacity={0.7}
            transparent
          />
        </group>

        <group key='clouds'>
          <group position={[0, 0, -1810]}>
            <ambientLight intensity={1} />
            <Cloud
              position={[0, 0, 0]}
              speed={0.4}
              opacity={0.9}
              color={'#ffffff'}
            />
          </group>

          <group position={[0, 0, -500]}>
            <ambientLight intensity={1} />
            <Cloud
              position={[0, 0, 0]}
              speed={0.1}
              opacity={0.9}
              color={'#f4f4f4'}
            />
          </group>
          <group key='endingComponent' position={[0.25, 0, -1820]}>
            <Text
              position={[-2, 3, -10]}
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              maxWidth={2.5}
            >
              Produce from South of Thailand{'\n'}Phuket
            </Text>
            <Float floatIntensity={2} speed={2} floatingRange={[0, 0.1]}>
              <mesh scale={[1, 1, 1]}>
                <sphereGeometry args={[0.5, 64, 64]} />
                <meshStandardMaterial color='red' />
              </mesh>
            </Float>
          </group>
        </group>
      </>
    ),
    [],
  );
};
