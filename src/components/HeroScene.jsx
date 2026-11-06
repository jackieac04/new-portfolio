import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ════════════════════════════════════════════════
   SHARED: Tree layout data
   ════════════════════════════════════════════════ */
const TREE_DATA = [
  { x: -7.5, z: -5,   h: 14, w: 0.55 },
  { x: -5.8, z: -3.5, h: 11, w: 0.42 },
  { x: -4,   z: -6,   h: 16, w: 0.48 },
  { x: -2.3, z: -4,   h: 12, w: 0.38 },
  { x: -.10, z: -5,   h: 10, w: 0.38 },
  { x:  0.8, z: -5.5, h: 15, w: 0.52 },
  { x:  3, z: -3,   h: 5, w: 0.36 },
  { x:  4.2, z: -5,   h: 13, w: 0.45 },
  { x:  6,   z: -3.5, h: 11, w: 0.40 },
  { x:  7.8, z: -6,   h: 17, w: 0.58 },
  { x: -6.5, z: -1.5, h:  9, w: 0.32 },
  { x:  5.5, z: -1.5, h:  8, w: 0.30 },
  { x:  1.5, z: -2,   h: 10, w: 0.35 },
  { x: -2.8, z: -1.8, h:  8, w: 0.28 },
];

/* ════════════════════════════════════════════════
   NIGHT: Improved Fireflies
   – multi-frequency organic drift
   – natural "brief flash" blink pattern
   – micro-jitter for insect realism
   ════════════════════════════════════════════════ */
function Fireflies({ count = 58 }) {
  const coreRef = useRef();
  const haloRef = useRef();
  const dummy   = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const base      = new Float32Array(count * 3);
    const phase     = new Float32Array(count);
    const speed     = new Float32Array(count);
    const blinkRate = new Float32Array(count);
    const layer     = new Uint8Array(count); // 0=ground, 1=mid, 2=canopy
    for (let i = 0; i < count; i++) {
      base[i*3]   = (Math.random() - 0.5) * 16;
      base[i*3+1] = (Math.random() - 0.5) * 8;
      base[i*3+2] = (Math.random() - 0.5) * 8;
      phase[i]     = Math.random() * Math.PI * 2;
      speed[i]     = 0.22 + Math.random() * 0.6;
      blinkRate[i] = 0.9 + Math.random() * 1.4; // 0.9–2.3 Hz
      layer[i]     = i < count * 0.35 ? 0 : i < count * 0.7 ? 1 : 2;
    }
    return { base, phase, speed, blinkRate, layer };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const ph = data.phase[i];
      const sp = data.speed[i];
      const br = data.blinkRate[i];

      /* ── Multi-frequency organic drift ── */
      const dx = Math.sin(t * sp * 0.33 + ph)       * 1.1
               + Math.cos(t * sp * 0.71 + ph * 1.7) * 0.38
               + Math.sin(t * sp * 0.19 + ph * 0.5) * 0.22;

      const dy = Math.cos(t * sp * 0.28 + ph * 1.2) * 0.72
               + Math.sin(t * sp * 0.53 + ph * 0.9) * 0.33
               + Math.cos(t * sp * 0.12 + ph * 2.1) * 0.18
               // layer bias: ground fireflies stay lower
               + (data.layer[i] === 0 ? Math.sin(t * 0.18 + ph) * 1.8
                : data.layer[i] === 1 ? Math.sin(t * 0.22 + ph * 0.7) * 2.5
                : Math.sin(t * 0.15 + ph * 1.3) * 3.5);

      const dz = Math.sin(t * sp * 0.22 + ph * 0.6) * 0.8
               + Math.cos(t * sp * 0.47 + ph * 1.4) * 0.28;

      /* ── Micro-jitter ── */
      const jx = Math.sin(t * 9.1 + ph * 4.3) * 0.028;
      const jy = Math.cos(t * 7.8 + ph * 3.1) * 0.022;

      const x = data.base[i*3]   + dx + jx;
      const y = data.base[i*3+1] + dy + jy;
      const z = data.base[i*3+2] + dz;

      /* ── Natural blink: brief bright flash, long dark period ── */
      const rawBlink = Math.sin(t * br + ph);
      // power function makes only the peak visible → short flash
      const blink = rawBlink > 0 ? Math.pow(rawBlink, 2.8) : 0;
      // slow modulation: firefly goes through active/resting cycles
      const activity = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * sp * 0.18 + ph * 0.6));
      const pulse = blink * activity;

      dummy.position.set(x, y, z);

      // core: scale with pulse
      dummy.scale.setScalar(0.4 + pulse * 1.0);
      dummy.updateMatrix();
      coreRef.current.setMatrixAt(i, dummy.matrix);

      // halo: bigger, softer
      dummy.scale.setScalar((0.3 + pulse * 0.9) * 4.5);
      dummy.updateMatrix();
      haloRef.current.setMatrixAt(i, dummy.matrix);
    }

    coreRef.current.instanceMatrix.needsUpdate = true;
    haloRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* soft glow halo */}
      <instancedMesh ref={haloRef} args={[null, null, count]}>
        <sphereGeometry args={[0.065, 6, 6]} />
        <meshStandardMaterial
          color="#b8e800" emissive="#90c800" emissiveIntensity={1.0}
          transparent opacity={0.14} depthWrite={false}
        />
      </instancedMesh>
      {/* bright core */}
      <instancedMesh ref={coreRef} args={[null, null, count]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#f0f840" emissive="#d0e000" emissiveIntensity={5}
          transparent opacity={0.95}
        />
      </instancedMesh>
    </group>
  );
}

/* Night: wandering forest glow lights */
function PulsingLight({ phase, radius, y, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    ref.current.position.x = Math.sin(t * 0.3 + phase) * radius;
    ref.current.position.y = y + Math.sin(t * 0.5 + phase * 1.3) * 0.6;
    ref.current.position.z = Math.cos(t * 0.25 + phase) * 2.5;
    ref.current.intensity = 0.28 + Math.abs(Math.sin(t * 0.9 + phase)) * 0.45;
  });
  return <pointLight ref={ref} color={color} intensity={0.35} distance={5} decay={2} />;
}

/* Night tree silhouettes */
function NightTrees() {
  return (
    <group>
      {TREE_DATA.map((t, i) => (
         <group key={i} position={[t.x, t.h / 2 - 8, t.z]}>
          {/* trunk */}
          <mesh>
            <boxGeometry args={[t.w * 0.7, t.h, t.w * 0.55]} />
            <meshStandardMaterial color="#5c3418" roughness={0.92} />
          </mesh>
          {/* foliage canopy */}
          <mesh position={[0, t.h * 0.38, 0]}>
            <sphereGeometry args={[t.w * 3.8, 7, 6]} />
            <meshStandardMaterial color="#2d6a18" roughness={0.82} />
          </mesh>
          {/* second layer for depth */}
          <mesh position={[t.w * 0.6, t.h * 0.20, t.w * 0.3]}>
            <sphereGeometry args={[t.w * 2.4, 6, 5]} />
            <meshStandardMaterial color="#3a7a22" roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ════════════════════════════════════════════════
   DAY: Dragonfly with Lissajous figure-8 path
   + realistic wing flutter + body banking
   ════════════════════════════════════════════════ */
const DRAGONFLY_CFG = [
  { bx: -3.5, by: 1.2, bz: -1.0, pa: 2.8, pb: 1.4, sp: 0.70, ph: 0.0 },
  { bx:  2.2, by: 2.0, bz: -1.8, pa: 2.2, pb: 1.1, sp: 0.85, ph: 1.5 },
  { bx: -1.0, by: 0.5, bz: -0.5, pa: 3.0, pb: 1.5, sp: 0.60, ph: 3.0 },
  { bx:  3.8, by: 1.5, bz: -2.2, pa: 2.0, pb: 1.0, sp: 0.95, ph: 0.8 },
  { bx: -2.5, by: 2.8, bz: -1.5, pa: 2.5, pb: 1.2, sp: 0.75, ph: 4.2 },
  { bx:  0.5, by: 3.5, bz: -2.0, pa: 1.8, pb: 0.9, sp: 1.05, ph: 2.3 },
  { bx: -4.0, by: 0.8, bz: -2.5, pa: 2.3, pb: 1.3, sp: 0.65, ph: 5.1 },
  { bx:  1.5, by: 1.0, bz: -0.8, pa: 2.6, pb: 1.2, sp: 0.80, ph: 1.1 },
];

function Dragonfly({ bx, by, bz, pa, pb, sp, ph }) {
  const groupRef  = useRef();
  const wingsRef  = useRef();
  const smoothQuat = useRef(new THREE.Quaternion());
  const targetQuat = useRef(new THREE.Quaternion());
  const prevPos    = useRef(new THREE.Vector3(bx, by, bz));
  const tempFwd    = useRef(new THREE.Vector3());
  const yAxis      = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * sp + ph;

    /* ── Lissajous figure-8 (1:2 frequency ratio) ── */
    const x = bx + pa * Math.sin(t * 0.55);
    const y = by + pb * Math.sin(t * 1.10 + Math.PI / 2.2) * 0.38
             + Math.sin(t * 0.20) * 0.55;   // slow vertical sway
    const z = bz + Math.sin(t * 0.32 + ph * 0.4) * 2.0;

    const newPos = new THREE.Vector3(x, y, z);

    /* ── Smooth body orientation toward velocity ── */
    const vel = newPos.clone().sub(prevPos.current);
    if (vel.length() > 0.0003) {
      tempFwd.current.copy(vel).normalize();
      try {
        targetQuat.current.setFromUnitVectors(yAxis, tempFwd.current);
        smoothQuat.current.slerp(targetQuat.current, 0.07);
      } catch { /* vectors nearly identical — skip */ }
    }
    prevPos.current.copy(newPos);

    if (groupRef.current) {
      groupRef.current.position.copy(newPos);
      groupRef.current.quaternion.copy(smoothQuat.current);
    }

    /* ── Wing flutter (fast oscillation ~25 Hz felt) ── */
    if (wingsRef.current) {
      const flutter = Math.sin(clock.elapsedTime * 28 + ph) * 0.42;
      wingsRef.current.rotation.z = flutter;
    }
  });

  const colors = useMemo(() => ({
    body:  ['#1a6a5a', '#216860', '#2a7878', '#1e5e4a', '#244a6a',
            '#1a6a5a', '#2a6870', '#1e5060'][Math.floor(ph * 7) % 8],
    wing: '#c4eef6',
  }), [ph]);

  return (
    <group ref={groupRef}>
      {/* segmented abdomen */}
      <mesh>
        <capsuleGeometry args={[0.026, 0.30, 3, 8]} />
        <meshStandardMaterial
          color={colors.body} emissive={colors.body}
          emissiveIntensity={0.25} metalness={0.75} roughness={0.15}
        />
      </mesh>
      {/* thorax */}
      <mesh position={[0, 0.19, 0]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.1} />
      </mesh>
      {/* compound eyes */}
      <mesh position={[0.028, 0.245, 0]}>
        <sphereGeometry args={[0.016, 6, 6]} />
        <meshStandardMaterial color="#0a2a18" metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[-0.028, 0.245, 0]}>
        <sphereGeometry args={[0.016, 6, 6]} />
        <meshStandardMaterial color="#0a2a18" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* wings — rotate together for flutter */}
      <group ref={wingsRef} position={[0, 0.15, 0]}>
        {/* front pair (slightly larger) */}
        <mesh position={[ 0.16,  0, 0.04]} rotation={[Math.PI/2, 0,  Math.PI/10]}>
          <planeGeometry args={[0.26, 0.072]} />
          <meshStandardMaterial color={colors.wing} transparent opacity={0.58} side={THREE.DoubleSide} metalness={0.4} roughness={0.05} />
        </mesh>
        <mesh position={[-0.16,  0, 0.04]} rotation={[Math.PI/2, 0, -Math.PI/10]}>
          <planeGeometry args={[0.26, 0.072]} />
          <meshStandardMaterial color={colors.wing} transparent opacity={0.58} side={THREE.DoubleSide} metalness={0.4} roughness={0.05} />
        </mesh>
        {/* back pair */}
        <mesh position={[ 0.13,  0, -0.05]} rotation={[Math.PI/2, 0,  Math.PI/14]}>
          <planeGeometry args={[0.21, 0.062]} />
          <meshStandardMaterial color="#b4e8f0" transparent opacity={0.52} side={THREE.DoubleSide} metalness={0.4} roughness={0.05} />
        </mesh>
        <mesh position={[-0.13,  0, -0.05]} rotation={[Math.PI/2, 0, -Math.PI/14]}>
          <planeGeometry args={[0.21, 0.062]} />
          <meshStandardMaterial color="#b4e8f0" transparent opacity={0.52} side={THREE.DoubleSide} metalness={0.4} roughness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

/* Day: floating pollen/seeds */
function Pollen({ count = 55 }) {
  const ref   = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const base  = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const sp    = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      base[i*3]   = (Math.random() - 0.5) * 18;
      base[i*3+1] = (Math.random() - 0.5) * 10;
      base[i*3+2] = (Math.random() - 0.5) * 8;
      phase[i] = Math.random() * Math.PI * 2;
      sp[i]    = 0.06 + Math.random() * 0.12;
    }
    return { base, phase, sp };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ph = data.phase[i];
      const s  = data.sp[i];
      const x = data.base[i*3]   + Math.sin(t * s * 0.5 + ph) * 0.9;
      const y = data.base[i*3+1] + Math.cos(t * s * 0.4 + ph * 1.3) * 1.4;
      const z = data.base[i*3+2] + Math.sin(t * s * 0.3 + ph * 0.8) * 0.7;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.6 + Math.abs(Math.sin(t * s + ph)) * 0.4);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereGeometry args={[0.014, 4, 4]} />
      <meshStandardMaterial
        color="#fff8d0" emissive="#ffe880" emissiveIntensity={0.6}
        transparent opacity={0.75}
      />
    </instancedMesh>
  );
}

/* Day: green forest trees */
function DayTrees() {
  return (
    <group>
      {TREE_DATA.map((t, i) => (
        <group key={i} position={[t.x, t.h / 2 - 8, t.z]}>
          {/* trunk */}
          <mesh>
            <boxGeometry args={[t.w * 0.7, t.h, t.w * 0.55]} />
            <meshStandardMaterial color="#5c3418" roughness={0.92} />
          </mesh>
          {/* foliage canopy */}
          <mesh position={[0, t.h * 0.38, 0]}>
            <sphereGeometry args={[t.w * 3.8, 7, 6]} />
            <meshStandardMaterial color="#2d6a18" roughness={0.82} />
          </mesh>
          {/* second layer for depth */}
          <mesh position={[t.w * 0.6, t.h * 0.20, t.w * 0.3]}>
            <sphereGeometry args={[t.w * 2.4, 6, 5]} />
            <meshStandardMaterial color="#3a7a22" roughness={0.85} />
          </mesh>
        </group>
      ))}
      {/* forest floor */}
      {/* <mesh position={[0, -5.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#3a6820" roughness={0.9} />
      </mesh> */}
    </group>
  );
}

/* ════════════════════════════════════════════════
   SCENES
   ════════════════════════════════════════════════ */
const FOREST_LIGHTS = Array.from({ length: 5 }, (_, i) => ({
  phase:  (i / 5) * Math.PI * 2,
  radius: 3.0 + (i * 0.4),
  y:      -0.8 + i * 0.5,
  color:  ['#88cc00','#aae000','#66bb22','#c8e800','#55aa44'][i],
}));

function NightScene() {
  return (
    <>
      <ambientLight intensity={0.07} color="#1a3d20" />
      <directionalLight position={[2, 8, 3]} intensity={0.16} color="#c8dde8" />
      {FOREST_LIGHTS.map((l, i) => <PulsingLight key={i} {...l} />)}
      <fog attach="fog" args={['#0a1810', 8, 28]} />
      <NightTrees />
      <Fireflies count={58} />
    </>
  );
}

function DayScene() {
  return (
    <>
      <ambientLight intensity={0.75} color="#fff4e0" />
      <directionalLight position={[4, 10, 3]} intensity={1.5} color="#ffe8b0" />
      <pointLight position={[-5, 4, 2]} intensity={0.4} color="#88cc44" distance={12} />
      <fog attach="fog" args={['#a8d8a8', 14, 32]} />
      <DayTrees />
      {DRAGONFLY_CFG.map((cfg, i) => <Dragonfly key={i} {...cfg} />)}
      <Pollen count={55} />
    </>
  );
}

/* ════════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════════ */
export default function HeroScene({ theme }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 48 }} gl={{ alpha: true, antialias: true }}>
        {theme === 'night' ? <NightScene /> : <DayScene />}
      </Canvas>
    </div>
  );
}
