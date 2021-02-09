import React from "react";
import { Text, StyleSheet, View, Animated, Easing } from "react-native";

export default function App() {
  const goAway = React.useRef(new Animated.Value(0)).current;
  const goAway__minus = React.useRef(new Animated.Value(0)).current;
  const goAway__x2 = React.useRef(new Animated.Value(0)).current;
  const fadeInOut = React.useRef(new Animated.Value(0)).current;

  const [startAnimation, setStartAnimation] = React.useState(false);
  const DISTANCE = 26;
  const DURATION = 500;

  React.useEffect(() => {
    Animated.timing(goAway, {
      toValue: startAnimation ? DISTANCE : 0,
      duration: DURATION,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0, 0.98),
    }).start();

    Animated.timing(goAway__minus, {
      toValue: startAnimation ? -DISTANCE : 0,
      duration: DURATION,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0, 0.98),
    }).start();

    Animated.timing(goAway__x2, {
      toValue: startAnimation ? DISTANCE * 2 : 0,
      duration: DURATION,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0, 0.98),
    }).start();

    Animated.timing(fadeInOut, {
      toValue: startAnimation ? 1 : 0,
      duration: DURATION,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, [startAnimation]);

  return (
    <>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 30,
          padding: 50,
          textAlign: "center",
        }}
      >
        React Native Animation
      </Text>
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [{ translateY: goAway__minus }, { translateX: goAway }],
            opacity: fadeInOut,
            position: "absolute",
            zIndex: -100000,
          }}
        >
          <View style={{ ...styles.round, backgroundColor: "yellow" }} />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateX: goAway__x2 }],
            opacity: fadeInOut,
            position: "absolute",
            zIndex: -100000,
          }}
        >
          <View style={{ ...styles.round, backgroundColor: "yellow" }} />
        </Animated.View>

        <View
          onTouchEnd={() => setStartAnimation(!startAnimation)}
          style={{ ...styles.round, height: 30, width: 30 }}
        />

        <Animated.View
          style={{
            transform: [{ translateY: goAway }, { translateX: goAway }],
            opacity: fadeInOut,
            position: "absolute",
            zIndex: -100000,
          }}
        >
          <View style={{ ...styles.round, backgroundColor: "yellow" }} />
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  round: {
    borderRadius: 2000,
    width: 25,
    height: 25,
    backgroundColor: "red",
  },
});
