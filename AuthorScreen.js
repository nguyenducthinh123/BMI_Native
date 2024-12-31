import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AuthorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About the Author</Text>
      <Text style={styles.info}>Name: Nguyễn Đức Thịnh</Text>
      <Text style={styles.info}>Student ID: 20240179E</Text>
      <Text style={styles.info}>Course: Web and Mobile Applications programming</Text>
      <Text style={styles.info}>Completion Date: 31/12/2024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f8ff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 18, marginVertical: 5, color: "#333" },
});
