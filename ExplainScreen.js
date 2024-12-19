import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function ExplainScreen() {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fadeIn();
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isFadingOut) {
        e.preventDefault(); // Ngăn chặn hành động quay lại nếu đang fade out
      } else {
        e.preventDefault();
        fadeOut(() => navigation.dispatch(e.data.action)); // Fade out trước khi thực hiện hành động quay lại
      }
    });

    return unsubscribe;
  }, [navigation, isFadingOut]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback) => {
    setIsFadingOut(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setIsFadingOut(false); // Đặt lại trạng thái
      if (callback) callback();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>BMI = w/h² (w in kg, h in meters)</Text>
      <Text style={styles.text}>&lt; 18.5 : Underweight</Text>
      <Text style={styles.text}>18.5 ÷ 25 : Normal</Text>
      <Text style={styles.text}>25 ÷ 30 : Overweight</Text>
      <Text style={styles.text}>≥ 30 : Obese</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 10 },
});