import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      let logs = await AsyncStorage.getItem('bmiLogs');
      logs = logs ? JSON.parse(logs) : [];
      setLogs(logs);
    };
    loadLogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculation History</Text>
      {logs.length === 0 ? (
        <Text style={styles.noData}>No history available</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()} // tạo key cho mỗi item
          renderItem={({ item }) => ( // hiển thị từng item
            <View style={styles.logItem}>
              <Text>Time: {item.time}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Weight: {item.weight}</Text>
              <Text>BMI: {item.bmi}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noData: {
    fontSize: 18,
    color: 'gray',
  },
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HistoryScreen;