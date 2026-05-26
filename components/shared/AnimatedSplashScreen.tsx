import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from 'react-native-svg';

const { width: SW } = Dimensions.get('window');

// ─── Easing presets ─────────────────────────────────────────────────────────
const EASE_OUT = Easing.out(Easing.cubic);
const EASE_IN = Easing.in(Easing.cubic);

// ─── Car SVG (static, no Animated inside SVG) ───────────────────────────────
const CarSvg: React.FC<{ size: number }> = ({ size }) => (
  <Svg width={size} height={size * 0.5} viewBox="0 0 200 96">
    <Defs>
      <LinearGradient id="body" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#60a5fa" stopOpacity="1" />
        <Stop offset="0.5" stopColor="#2563eb" stopOpacity="1" />
        <Stop offset="1" stopColor="#1e3a8a" stopOpacity="1" />
      </LinearGradient>
      <LinearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#e0f2fe" stopOpacity="0.95" />
        <Stop offset="1" stopColor="#bae6fd" stopOpacity="0.6" />
      </LinearGradient>
      <RadialGradient id="tire" cx="50%" cy="40%" r="55%">
        <Stop offset="0" stopColor="#334155" stopOpacity="1" />
        <Stop offset="1" stopColor="#0f172a" stopOpacity="1" />
      </RadialGradient>
      <RadialGradient id="rim" cx="40%" cy="35%" r="60%">
        <Stop offset="0" stopColor="#f1f5f9" stopOpacity="1" />
        <Stop offset="1" stopColor="#94a3b8" stopOpacity="1" />
      </RadialGradient>
      <LinearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#1e3a8a" stopOpacity="0.2" />
        <Stop offset="1" stopColor="#1e3a8a" stopOpacity="0" />
      </LinearGradient>
    </Defs>

   
    <Ellipse cx="100" cy="91" rx="82" ry="5" fill="url(#shadow)" />

    {/* Chassis */}
    <Path
      d="M6 62 Q8 46,18 42 Q30 22,60 16 Q90 12,115 13 Q140 14,158 26 Q174 36,184 48 Q192 56,194 62 L194 70 Q194 76,188 76 L166 76 Q163 62,148 62 Q133 62,130 76 L70 76 Q67 62,52 62 Q37 62,34 76 L12 76 Q6 76,6 68 Z"
      fill="url(#body)"
    />

    {/* Roof highlight */}
    <Path
      d="M60 16 Q88 10,115 13 Q135 14,155 25 L158 26 Q140 14,115 13 Q88 10,60 16 Z"
      fill="#1d4ed8"
      opacity={0.35}
    />

    {/* Windshield */}
    <Path
      d="M62 17 Q75 22,85 28 L130 28 Q145 22,157 26 Q145 18,125 15 Q100 12,75 15 Z"
      fill="url(#glass)"
    />

    {/* Windshield glint */}
    <Path d="M68 18 Q80 14,95 15 Q85 20,72 22 Z" fill="white" opacity={0.5} />

    {/* Rear window */}
    <Path
      d="M130 28 L155 28 Q158 28,158 26 Q148 20,135 16 Q130 18,128 22 Z"
      fill="url(#glass)"
      opacity={0.75}
    />

    {/* Headlight */}
    <Path
      d="M8 54 Q6 58,8 62 L18 62 Q16 58,16 53 Z"
      fill="#fef9c3"
      opacity={0.9}
    />
    <Path
      d="M8 54 Q6 58,8 62 L12 62 Q10 58,10 53 Z"
      fill="white"
      opacity={0.55}
    />

    {/* Tail light */}
    <Path
      d="M188 56 Q192 58,192 64 L184 65 Q183 60,184 56 Z"
      fill="#fca5a5"
      opacity={0.85}
    />

    {/* Body crease */}
    <Path
      d="M20 55 C60 50,120 48,170 56"
      stroke="#93c5fd"
      strokeWidth={1}
      fill="none"
      opacity={0.6}
    />

    {/* Spoiler */}
    <Path d="M174 38 L192 38 L192 42 L174 42 Z" fill="#1e3a8a" />
    <Path d="M188 34 L192 34 L192 44 L188 44 Z" fill="#1d4ed8" />

    {/* Front wheel */}
    <Circle cx="50" cy="76" r="14" fill="url(#tire)" />
    <Path
      d="M50 62 L50 90 M36 76 L64 76 M40 66 L60 86 M40 86 L60 66"
      stroke="#94a3b8"
      strokeWidth={1.8}
    />
    <Circle
      cx="50"
      cy="76"
      r="7"
      fill="none"
      stroke="#cbd5e1"
      strokeWidth={1.2}
    />
    <Circle cx="50" cy="76" r="3.5" fill="url(#rim)" />
    <Circle cx="50" cy="76" r="1.8" fill="#1e3a8a" />

    {/* Rear wheel */}
    <Circle cx="150" cy="76" r="14" fill="url(#tire)" />
    <Path
      d="M150 62 L150 90 M136 76 L164 76 M140 66 L160 86 M140 86 L160 66"
      stroke="#94a3b8"
      strokeWidth={1.8}
    />
    <Circle
      cx="150"
      cy="76"
      r="7"
      fill="none"
      stroke="#cbd5e1"
      strokeWidth={1.2}
    />
    <Circle cx="150" cy="76" r="3.5" fill="url(#rim)" />
    <Circle cx="150" cy="76" r="1.8" fill="#1e3a8a" />
  </Svg>
);

// ─── Single animated water bubble ───────────────────────────────────────────
interface BubbleProps {
  delay: number;
  x: number;
  size: number;
}

const Bubble: React.FC<BubbleProps> = ({ delay, x, size }) => {
  const y = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.4);

  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withTiming(-70, { duration: 1800, easing: EASE_OUT }),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.85, { duration: 400 }),
          withTiming(0, { duration: 1400 }),
        ),
        -1,
        false,
      ),
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 1800, easing: EASE_OUT }),
        -1,
        false,
      ),
    );
  }, [delay, y, opacity, scale]);

  const animated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.bubble,
        animated,
        { left: x, width: size, height: size, borderRadius: size / 2 },
      ]}
    />
  );
};

// ─── Water spray dot ────────────────────────────────────────────────────────
interface SprayProps {
  delay: number;
  x: number;
  y: number;
}

const SprayDot: React.FC<SprayProps> = ({ delay, x, y }) => {
  const opacity = useSharedValue(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    const dx = (Math.random() - 0.5) * 30;
    const dy = -Math.random() * 25;

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 200 }),
          withTiming(0, { duration: 500 }),
        ),
        -1,
        false,
      ),
    );
    tx.value = withDelay(
      delay,
      withRepeat(
        withTiming(dx, { duration: 700, easing: EASE_OUT }),
        -1,
        false,
      ),
    );
    ty.value = withDelay(
      delay,
      withRepeat(
        withTiming(dy, { duration: 700, easing: EASE_OUT }),
        -1,
        false,
      ),
    );
  }, [delay, opacity, tx, ty]);

  const animated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  return (
    <Animated.View style={[styles.sprayDot, animated, { left: x, top: y }]} />
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
export interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  onFinish,
}) => {
  const carX = useSharedValue(-240);
  const carTilt = useSharedValue(0);
  const screenOpacity = useSharedValue(1);
  const sudsOpacity = useSharedValue(0);
  const sudsScale = useSharedValue(0.5);
  const shudder = useSharedValue(0);

  useEffect(() => {
    // ── Ignition micro-shudder ──
    shudder.value = withSequence(
      withTiming(-2, { duration: 70 }),
      withTiming(2, { duration: 70 }),
      withTiming(-1.5, { duration: 70 }),
      withTiming(1.5, { duration: 70 }),
      withTiming(0, { duration: 60 }),
    );

    // ── Slow cinematic roll-in → pause → gentle exit ──
    carX.value = withSequence(
      // Entry: slow drift in from left
      withDelay(
        350,
        withTiming(SW * 0.1, { duration: 2000, easing: EASE_OUT }),
      ),
      // Settle with spring (suspension rebound)
      withSpring(SW * 0.13, { damping: 14, stiffness: 120, mass: 1.2 }),
      // Pause: being "washed" (1 second dwell)
      withDelay(1000, withTiming(SW * 0.13, { duration: 50 })),
      // Clean exit sweep
      withTiming(SW + 260, { duration: 1400, easing: EASE_IN }),
    );

    // ── Chassis tilt: accel lean-back → decel nose-dip → exit snap ──
    carTilt.value = withSequence(
      withDelay(350, withTiming(-3.5, { duration: 1000, easing: EASE_OUT })),
      withSpring(2, { damping: 10, stiffness: 180 }),
      withDelay(800, withTiming(-4, { duration: 800, easing: EASE_IN })),
      withTiming(0, { duration: 300 }),
    );

    // ── Soap suds bloom while car is "parked" ──
    sudsOpacity.value = withDelay(
      2500,
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0, { duration: 600 }),
      ),
    );
    sudsScale.value = withDelay(
      2500,
      withTiming(1.6, { duration: 1000, easing: EASE_OUT }),
    );

    // ── Fade screen out ──
    screenOpacity.value = withDelay(
      4600,
      withTiming(0, { duration: 400 }, done => {
        if (done) runOnJS(onFinish)();
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: carX.value },
      { rotate: `${carTilt.value}deg` },
      { translateY: shudder.value },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const sudsStyle = useAnimatedStyle(() => ({
    opacity: sudsOpacity.value,
    transform: [{ scale: sudsScale.value }],
  }));

  // Static bubble/spray layout data
  const BUBBLES: BubbleProps[] = [
    { delay: 2400, x: SW * 0.22, size: 10 },
    { delay: 2600, x: SW * 0.35, size: 14 },
    { delay: 2700, x: SW * 0.5, size: 8 },
    { delay: 2900, x: SW * 0.28, size: 12 },
    { delay: 3000, x: SW * 0.42, size: 9 },
    { delay: 3100, x: SW * 0.58, size: 11 },
  ];
  const SPRAYS: SprayProps[] = [
    { delay: 2500, x: SW * 0.25, y: -20 },
    { delay: 2650, x: SW * 0.4, y: -15 },
    { delay: 2800, x: SW * 0.55, y: -22 },
    { delay: 2950, x: SW * 0.3, y: -18 },
  ];

  return (
    <Animated.View style={[styles.root, containerStyle]}>
      {/* Background glow */}
      <View style={styles.glow} />

      {/* Road line */}
      <View style={styles.roadLine} />

      {/* Soap suds blob (appears during dwell) */}
      <Animated.View style={[styles.suds, sudsStyle]} />

      {/* Bubbles rising off car roof */}
      <View style={styles.bubblesLayer}>
        {BUBBLES.map((b, i) => (
          <Bubble key={i} {...b} />
        ))}
      </View>

      {/* Water spray particles */}
      <View style={styles.sprayLayer}>
        {SPRAYS.map((s, i) => (
          <SprayDot key={i} {...s} />
        ))}
      </View>

      {/* Car */}
      <View style={styles.track}>
        <Animated.View style={carStyle}>
          <CarSvg size={220} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EEF4FC',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  glow: {
    position: 'absolute',
    width: SW * 0.85,
    height: 260,
    borderRadius: 160,
    backgroundColor: 'rgba(96, 165, 250, 0.07)',
    top: '28%',
    alignSelf: 'center',
  },
  roadLine: {
    position: 'absolute',
    bottom: '37%',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  track: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
  },
  suds: {
    position: 'absolute',
    bottom: '38%',
    alignSelf: 'center',
    width: 220,
    height: 22,
    borderRadius: 20,
    backgroundColor: 'rgba(219, 234, 254, 0.8)',
  },
  bubblesLayer: {
    position: 'absolute',
    bottom: '42%',
    left: 0,
    right: 0,
    height: 80,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(147, 197, 253, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  sprayLayer: {
    position: 'absolute',
    bottom: '44%',
    left: 0,
    right: 0,
    height: 40,
  },
  sprayDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
  },
});
