import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExplainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BMI = w/h² (w in kg, h in meters)</Text>
      <Text style={styles.text}>&lt; 18.5 : Underweight</Text>
      <Text style={styles.text}>18.5 ÷ 25 : Normal</Text>
      <Text style={styles.text}>25 ÷ 30 : Overweight</Text>
      <Text style={styles.text}>≥ 30 : Obese</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 10 },
});
