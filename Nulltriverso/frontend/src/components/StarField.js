import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

const DEFAULT_STAR_COUNT = 120;

const StarField = ({ count = DEFAULT_STAR_COUNT, style }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: `star-${index}`,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 2.6,
        opacity: 0.3 + Math.random() * 0.45,
        color: index % 3 === 0 ? "#ffe9c5" : "#fff7e3",
      })),
    [count]
  );

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      {stars.map((star) => (
        <View
          key={star.id}
          style={[
            styles.star,
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              backgroundColor: star.color,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: "absolute",
    borderRadius: 50,
  },
});

export default StarField;
