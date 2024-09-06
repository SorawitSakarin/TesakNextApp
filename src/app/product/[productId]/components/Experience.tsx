import {
  Line,
  PerspectiveCamera,
  Text,
  useScroll,
  Float,
  Preload,
} from '@react-three/drei';
import Background from './Background';
import Airplane from './Airplane';
import Cloud from './Cloud';
import * as THREE from 'three';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import ProductCard from './ProductCard';
import { Earth } from './Earth';

interface Props {
  setEnableCanvasScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Experience = ({ setEnableCanvasScroll }: Props) => {
  const CURVE_DISTANCE = 150; // Shorten distances on mobile
  const curvePoints = useMemo<THREE.Vector3[]>(
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
    [CURVE_DISTANCE],
  );

  const curve = useMemo<THREE.CatmullRomCurve3>(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);
  }, [curvePoints]);

  const cameraCurve = useMemo<THREE.CatmullRomCurve3>(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.05, 0.4, -9.47),
        new THREE.Vector3(0.05, 10, -9.47),
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

  const newCameraCurve = useMemo<THREE.CatmullRomCurve3>(
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


  const linePoints = useMemo<THREE.Vector3[]>(() => {
    return curve.getPoints(50000); // Reduce points on mobile
  }, [curve]);

  const cameraPoints = useMemo<THREE.Vector3[]>(() => {
    return cameraCurve.getPoints(5000); // Reduce points on mobile
  }, [cameraCurve]);

  const newCameraPoints = useMemo<THREE.Vector3[]>(
    () => newCameraCurve.getPoints(5000), // Reduce points on mobile
    [newCameraCurve],
  );

  const scroll = useScroll();
  const cameraGroup = useRef<THREE.Group>(null);
  const airplane = useRef<THREE.Group>(null);
  const planeOut = useRef<gsap.core.Timeline>(gsap.timeline().pause());
  const cameraGroupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [curCamera, setCurCamera] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);

  const floating = useCallback((delta: number): THREE.Vector3 => {
    const t = performance.now() * 0.001;
    const offset = Math.sin(t) * 0.2;
    return new THREE.Vector3(0, offset, 0);
  }, []);

  useFrame((_state, delta) => {
    if (!end) {
      const offset = scroll.offset;
      // console.log(offset);
      let cameraIndex: number;
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
      const floatCameraPos = new THREE.Vector3(0, 0, 0);
      if (cameraRef.current) {
        cameraRef.current.fov = (41 * Math.min(offset, 0.1)) / 0.1 + 4;
        cameraRef.current.updateProjectionMatrix();
        // console.log(cameraRef.current.fov);
      }

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
            airplane.current!.quaternion.slerp(
              new THREE.Quaternion(0, 0, 0, 0),
              delta * 2,
            );
          }
        } else {
          const curCameraPointIndex = Math.min(
            Math.round((offset * cameraPoints.length) / 0.2),
            cameraPoints.length - 1,
          );
          // console.log(curCameraPointIndex);
          const cameraPoint = cameraPoints[curCameraPointIndex];

          cameraGroupRef.current!.position.lerp(cameraPoint, delta * 24);
          cameraGroupRef.current!.quaternion.slerp(
            new THREE.Quaternion(0, 0, 0, 0),
            delta * 2,
          );
          airplane.current!.position.lerp(
            new THREE.Vector3(0, 0, 0).add(floatPos),
            delta * 24,
          );
          airplane.current!.quaternion.slerp(
            new THREE.Quaternion(0, 0, 0, 0),
            delta * 2,
          );

          cameraGroup.current!.quaternion.slerp(
            new THREE.Quaternion(0, 0, 0, 0),
            delta * 2,
          );
          cameraGroup.current!.position.lerp(linePoints[0], delta * 24);
        }
        const po = new THREE.Vector3()
          .copy(cameraGroup.current!.position)
          .sub(new THREE.Vector3(0, -0.2, -0.4));
        cameraRef.current!.lookAt(po);
      } else if (cameraIndex === 1) {
        const po = new THREE.Vector3()
          .copy(cameraGroup.current!.position)
          .sub(new THREE.Vector3(0, -0.2, -0.4));
        cameraRef.current!.lookAt(po);
        const curPointIndex = Math.min(
          Math.round(((offset - 0.2) * linePoints.length) / 0.7),
          linePoints.length - 1,
        );
        const curPoint = linePoints[curPointIndex];
        const pointAhead =
          linePoints[Math.min(curPointIndex + 2, linePoints.length - 1)];

        const xDisplacement = (pointAhead.x - curPoint.x) * 20;

        const angleRotation =
          (xDisplacement < 0 ? 1 : -1) *
          Math.min(Math.abs(xDisplacement), Math.PI / 3);

        const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            airplane.current!.rotation.x,
            airplane.current!.rotation.y,
            angleRotation,
          ),
        );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            cameraGroup.current!.rotation.x,
            angleRotation,
            cameraGroup.current!.rotation.z,
          ),
        );

        airplane.current!.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
        airplane.current!.position.lerp(floatPos, delta * 24);
        cameraGroup.current!.quaternion.slerp(
          targetCameraQuaternion,
          delta * 2,
        );
        cameraGroup.current!.position.lerp(curPoint, delta * 24);

        cameraGroupRef.current!.position.lerp(floatCameraPos, delta * 24);
      } else if (cameraIndex === 2) {
        const curCameraPointIndex = Math.min(
          Math.round((offset - 0.9) * cameraPoints.length) * 10,
          cameraPoints.length - 1,
        );
        const cameraPoint = newCameraPoints[curCameraPointIndex];
        const targetCameraPoint = cameraPoint.clone();
        const angleRotation =
          (targetCameraPoint.x - cameraGroupRef.current!.position.x < 0
            ? 1
            : -1) *
          Math.min(
            Math.abs(targetCameraPoint.x - cameraGroupRef.current!.position.x),
            Math.PI / 3,
          );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            cameraGroupRef.current!.rotation.x,
            angleRotation,
            cameraGroupRef.current!.rotation.z,
          ),
        );
        airplane.current!.position.lerp(floatPos, delta * 24);
        cameraGroupRef.current!.quaternion.slerp(
          targetCameraQuaternion,
          delta * 2,
        );
        cameraGroupRef.current!.position.lerp(targetCameraPoint, delta * 24);
        cameraGroup.current!.quaternion.slerp(
          new THREE.Quaternion(0, 0, 0, 0),
          delta * 2,
        );

        if (scroll.offset > 0.95) {
          setEnd(true);
          planeOut.current.play();
          setEnableCanvasScroll(false);
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
      cameraGroup.current!.position,
      {
        duration: 3,
        z: -1200,
        y: 0,
      },
      0,
    );
  }, []);

  const cloudPositions = useMemo(
    () =>
      [
        [20, -5, -100],
        [-25, 15, -200],
        [10, 5, -50],
        [-10, -20, -120],
        [30, 0, -170],
        [-35, 25, -220],
        [5, -15, -80],
        [15, 10, -90],
        [-5, 20, -110],
        [0, -10, -140],
        [-20, 5, -130],
        [25, -25, -160],
        [35, 30, -210],
        [-30, -5, -180],
        [40, -30, -250],
        [-40, 15, -70],
        [45, -15, -30],
        [-45, 10, -60],
        [50, -20, -200],
        [-50, 0, -240],
        [0, 30, -90],
        [-5, -30, -100],
        [10, 20, -110],
        [-10, -10, -120],
        [20, -5, -130],
        [-20, 15, -140],
        [30, -25, -150],
        [-30, 0, -160],
        [40, 5, -170],
        [-40, -15, -180],
        [5, 10, -190],
        [-15, -20, -200],
        [15, 25, -210],
        [-25, -30, -220],
        [35, 15, -230],
        [-35, -10, -240],
        [-45, 20, -260],
        [50, -5, -270],
      ], []);


  return useMemo(
    () => (
      <>

        <group ref={cameraGroup}>
          <group ref={cameraGroupRef}>
            <PerspectiveCamera
              ref={cameraRef}
              position={[0, 0, 10]}
              fov={45} // Adjust fov on mobile
              near={0.1}
              far={500}
              makeDefault
            />
          </group>
          <Background />
          <group ref={airplane}>
            <Airplane
              key='airplane-with-float'
              rotation-y={Math.PI / 2}
              scale={[0.25, 0.25, 0.25]} // Scale down on mobile
              position-y={-0.95}
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
        <group>
          <group>
            {cloudPositions.map((position, i) => (
              <Cloud key={i} position={[position[0], position[1], position[2]]} />
            ))}
            {cloudPositions.map((position, i) => (
              <Cloud key={i + 30} position={[position[0], position[1], position[2] - 300]} />
            ))}
            {cloudPositions.map((position, i) => (
              <Cloud key={i + 60} position={[position[0], position[1], position[2] - 600]} />
            ))}
            {cloudPositions.map((position, i) => (
              <Cloud key={i + 90} position={[position[0], position[1], position[2] - 900]} />
            ))}
          </group>

          <group position={[-1.8, 1, -23]} rotation-y={Math.PI / 15}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.25}
              maxWidth={3}
              fontWeight={'bold'}
            >
              Welcome to TesakKaset{'\n'}
              Enjoy the ride
            </Text>
          </group>
          <group position={[-3.45, 1.5, -60]} rotation-y={(-Math.PI + 10) / 90}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              fontWeight={'bold'}
              maxWidth={2.5}
            >
              Unlock the potential of your meals{'\n'}with our premium
              performance rice
            </Text>
          </group>
          <group position={[2.4, 1.5, -165.5]} rotation-y={(-Math.PI - 22) / 90}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              fontWeight={'bold'}
              maxWidth={3}
            >
              From farm to table, we {'\n'}make sure you have a meal{'\n'}to remember
            </Text>
          </group>
          <group position={[14, 1.0, -705]} rotation-y={(-Math.PI + 40) / 90}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              fontWeight={'bold'}
              maxWidth={3}
            >
              We grow rice sustainably, ensuring quality from soil to harvest.
            </Text>
          </group>
          <group position={[-10, 1.0, -380]} rotation-y={(-Math.PI + 70) / 90}>
            <Text
              color={'white'}
              anchorX={'left'}
              anchorY={'middle'}
              fontSize={0.22}
              fontWeight={'bold'}
              maxWidth={3}
            >
              Combining tradition with technology for the finest rice experience.
            </Text>
          </group>
        </group>
        <group position-y={-1}>
          <Line
            points={linePoints}
            lineWidth={1}
            color={'#ff0000'}
            opacity={0}
            transparent
          />
          <Line
            points={cameraPoints}
            lineWidth={1}
            color={'#ff0000'}
            opacity={0.0}
            transparent
          />
        </group>
        <ambientLight intensity={1} />
        <Preload />
        <group position={[0, 0, 0]}></group>

        <group key='clouds'>
          <group position={[0, 0, -1198]}>
            <ambientLight intensity={1} />
            <Cloud />
          </group>

          <group key='endingComponent' position={[0.25, 0, -1208]}>
            <Float floatIntensity={2} speed={2} floatingRange={[0, 0.1]}>
              <Earth />
            </Float>
            <group position={[-0.8, 3, -10]} scale={[0.8, 0.8, 0.8]}>
              {/* <Float floatIntensity={2} speed={2} floatingRange={[0, 0.2]} rotationIntensity={0}>
                <ProductCard />
              </Float> */}
              <Text
                position={[0, -0.8, 5]}
                color={'white'}
                anchorX={'left'}
                anchorY={'middle'}
                fontSize={0.3}
                maxWidth={2.5}
                fontWeight={'bold'}
              >
                Thai Rice
              </Text>
              <Text
                position={[-1., -1.8, 5]}
                color={'white'}
                anchorX={'left'}
                anchorY={'middle'}
                fontSize={0.2}
                maxWidth={4}
                fontWeight={'bold'}
              >
                Our Jasmine rice, along with other premium varieties, is pure and unadulterated, lovingly grown by dedicated Thai farmers.
              </Text>
            </group>
          </group>
        </group>
      </>
    ),
    [linePoints, cameraPoints, newCameraPoints],
  );
};
