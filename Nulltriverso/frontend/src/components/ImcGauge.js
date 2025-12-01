import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import { IMC_SEGMENTS } from "../constants/imc";
import { clampImc } from "../utils/imc";
import { colors } from "../theme/colors";

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const ImcGauge = ({ currentImc }) => {
  const size = 300;
  const strokeWidth = 48;
  const radius = size / 2 - strokeWidth / 2;
  const center = size / 2;
  const pointerAnim = useRef(new Animated.Value(-180)).current;

  const minValue = 1;
  const maxValue = IMC_SEGMENTS[IMC_SEGMENTS.length - 1].max;
  const segmentSpan = 180 / IMC_SEGMENTS.length;

  const valueToAngle = (value) => {
    const clamped = clampImc(value, minValue, maxValue);
    let startVal = minValue;
    let startDeg = -180;

    for (let i = 0; i < IMC_SEGMENTS.length; i += 1) {
      const endVal = IMC_SEGMENTS[i].max;
      const endDeg = startDeg + segmentSpan;
      if (clamped <= endVal) {
        const t = (clamped - startVal) / (endVal - startVal || 1);
        return startDeg + t * (endDeg - startDeg);
      }
      startVal = endVal;
      startDeg = endDeg;
    }
    return 0;
  };

  const pointerAngle = useMemo(() => {
    const baseImc = currentImc ?? minValue;
    return valueToAngle(baseImc);
  }, [currentImc]);

  useEffect(() => {
    pointerAnim.setValue(pointerAngle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(pointerAnim, {
      toValue: pointerAngle,
      duration: 850,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [pointerAngle, pointerAnim]);

  const arcPath = (startDeg, endDeg) => {
    const start = polarToCartesian(center, center, radius, endDeg);
    const end = polarToCartesian(center, center, radius, startDeg);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
  };

  const pointerLength = radius - strokeWidth / 2;
  const pointerBase = 22;
  const pointerShape = [
    { x: center, y: center - pointerLength },
    { x: center - pointerBase / 2, y: center },
    { x: center + pointerBase / 2, y: center },
  ];

  const AnimatedG = Animated.createAnimatedComponent(G);
  const pointerRotation = pointerAnim.interpolate({
    inputRange: [-180, -90, 0],
    outputRange: ["-90deg", "0deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {IMC_SEGMENTS.map((seg, idx) => {
              const startDeg = -180 + idx * segmentSpan;
              const endDeg = startDeg + segmentSpan;
              return (
                <Path
                  key={seg.label}
                  d={arcPath(startDeg, endDeg)}
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="butt"
                  fill="none"
                />
              );
            })}
            {IMC_SEGMENTS.map((seg, idx) => {
              const startDeg = -180 + idx * segmentSpan;
              const endDeg = startDeg + segmentSpan;
              const mid = (startDeg + endDeg) / 2;
              const pos = polarToCartesian(
                center,
                center,
                radius - strokeWidth * 0.25,
                mid
              );
              const rotateText = mid + 90;
              return (
                <G
                  key={`${seg.label}-label`}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${rotateText})`}
                >
                  <SvgText
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                    y={-7}
                  >
                    {seg.label}
                  </SvgText>
                  <SvgText
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                    y={3}
                  >
                    {seg.range}
                  </SvgText>
                </G>
              );
            })}

            <AnimatedG
              style={{
                transform: [
                  { translateX: center },
                  { translateY: center },
                  { rotate: pointerRotation },
                  { translateX: -center },
                  { translateY: -center },
                ],
              }}
            >
              <Path
                d={`M ${pointerShape[0].x} ${pointerShape[0].y} L ${pointerShape[1].x} ${pointerShape[1].y} L ${pointerShape[2].x} ${pointerShape[2].y} Z`}
                fill="#1f2937"
                stroke={colors.ink}
                strokeWidth="2"
              />
            </AnimatedG>
            <Path
              d={`M ${center - 10} ${center} A 10 10 0 1 0 ${
                center + 10
              } ${center} A 10 10 0 1 0 ${center - 10} ${center}`}
              fill="#ffffff"
              stroke={colors.ink}
              strokeWidth="3"
            />
          </G>
        </Svg>
      </View>
      {currentImc ? (
        <Text style={styles.value}>IMC {currentImc.toFixed(1)}</Text>
      ) : (
        <Text style={styles.valueMuted}>Calcule para ver o ponteiro.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  svgWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "visible",
    height: 210,
    width: 300,
    transform: [{ translateY: -12 }],
  },
  value: {
    marginTop: -20,
    color: colors.ink,
    fontWeight: "800",
  },
  valueMuted: {
    marginTop: -20,
    color: colors.inkSoft,
    fontWeight: "600",
  },
});

export default ImcGauge;
