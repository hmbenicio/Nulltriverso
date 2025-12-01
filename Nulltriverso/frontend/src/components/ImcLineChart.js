import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Line, Polyline, Text as SvgText } from "react-native-svg";
import { MOCK_EVOLUTION } from "../constants/imc";
import { colors } from "../theme/colors";

const ImcLineChart = () => {
  const widthChart = 300;
  const heightChart = 160;
  const padding = 24;
  const maxImc = 32;
  const minImc = 22;

  const points = useMemo(
    () =>
      MOCK_EVOLUTION.map((item, idx) => {
        const xStep = (widthChart - padding * 2) / (MOCK_EVOLUTION.length - 1);
        const x = padding + idx * xStep;
        const y =
          padding +
          ((maxImc - item.imc) / (maxImc - minImc)) *
            (heightChart - padding * 2);
        return `${x},${y}`;
      }),
    []
  );

  return (
    <View style={styles.wrapper}>
      <Svg
        width={widthChart}
        height={heightChart}
        viewBox={`0 0 ${widthChart} ${heightChart}`}
      >
        <Line
          x1={padding}
          y1={heightChart - padding}
          x2={widthChart - padding}
          y2={heightChart - padding}
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <Line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={heightChart - padding}
          stroke="#cbd5e1"
          strokeWidth="1"
        />

        <Polyline
          points={points.join(" ")}
          fill="none"
          stroke={colors.accent}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((pt, idx) => {
          const [x, y] = pt.split(",").map(Number);
          return <Circle key={idx} cx={x} cy={y} r={4} fill={colors.ink} />;
        })}
        {MOCK_EVOLUTION.map((item, idx) => {
          const xStep =
            (widthChart - padding * 2) / (MOCK_EVOLUTION.length - 1);
          const x = padding + idx * xStep;
          const y = heightChart - padding + 14;
          return (
            <SvgText
              key={item.label}
              x={x}
              y={y}
              fontSize="10"
              fontWeight="600"
              fill={colors.ink}
              textAnchor="middle"
            >
              {item.label}
            </SvgText>
          );
        })}
        <SvgText
          x={padding - 12}
          y={padding + 4}
          fontSize="10"
          fontWeight="600"
          fill={colors.ink}
        >
          IMC
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
});

export default ImcLineChart;
