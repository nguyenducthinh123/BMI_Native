import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, Vibration } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const BMIScreen = () => {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);
  const [status, setStatus] = useState("Normal");
  const [bmi, setBMI] = useState(calculateBMI(65, 165));
  // const [location, setLocation] = useState(null);
  const [statusColor, setStatusColor] = useState(getStatusColor("Normal"));
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Yêu cầu quyền truy cập vị trí
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      else {
        console.log('Location permission granted');
      }
    })();
  }, []);

  // Hàm tính BMI
  function calculateBMI(weight, height) {
    const bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(2);
    return bmiValue;
  }

  // Cập nhật BMI và trạng thái
  const updateBMI = async (newWeight, newHeight) => {
    const bmiValue = calculateBMI(newWeight, newHeight);
    setBMI(bmiValue);

    let newStatus;
    if (bmiValue < 18.5) {
      newStatus = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      newStatus = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      newStatus = "Overweight";
    } else {
      newStatus = "Obese";
    }

    // So sánh trạng thái cũ và mới trước khi gọi setStatus
    if (status !== newStatus) {
      setStatus(newStatus);
      console.log(`Status changed from ${status} to ${newStatus}`);
    }

    // Cập nhật vị trí hiện tại
    let location = await Location.getCurrentPositionAsync({});
    const roundedLocation = location ? `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}` : 'Unknown';

    const log = {
      weight : newWeight,
      height : newHeight,
      bmi: bmiValue,
      status : newStatus,
      time: new Date().toLocaleString(),
      location: roundedLocation
    };

    // console.log(log);

    let logs = await AsyncStorage.getItem('bmiLogs');
    logs = logs ? JSON.parse(logs) : [];
    logs.unshift(log); // Thêm vào đầu mảng
    if (logs.length > 10) logs.pop(); // Chỉ lưu 10 log gần nhất
    await AsyncStorage.setItem('bmiLogs', JSON.stringify(logs));
  };

  // Sử dụng useEffect để cập nhật màu sắc khi status thay đổi
  useEffect(() => {
    setStatusColor(getStatusColor(status));
  }, [status]);

  // Xử lý thay đổi cân nặng hoặc chiều cao
  const handleWeightChange = (change) => {
    Vibration.vibrate(100); // Rung 100ms
    const newWeight = weight + change;
    if (newWeight > 0 && newWeight < Number.MAX_SAFE_INTEGER) {
      setWeight(newWeight);
      updateBMI(newWeight, height);
    }
  };

  const handleHeightChange = (change) => {
    Vibration.vibrate(100); // Rung 100ms
    const newHeight = height + change;
    if (newHeight > 0 && newHeight < Number.MAX_SAFE_INTEGER) {
      setHeight(newHeight);
      updateBMI(weight, newHeight);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>

        {/* Weight */}
        <View style={styles.row}>
          <Text style={styles.label}>Enter weight (kg):</Text>
          <TouchableOpacity onPress={() => handleWeightChange(-1)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight.toString()}
            onChangeText={(text) => {
              const newWeight = parseInt(text, 10) || 1; // Nếu không nhập hoặc nhập không hợp lệ thì mặc định là 1
              if (newWeight > 0 && newWeight < Number.MAX_SAFE_INTEGER) {
                setWeight(newWeight);
                updateBMI(newWeight, height);
              }
            }}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity onPress={() => handleWeightChange(1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Height */}
        <View style={styles.row}>
          <Text style={styles.label}>Enter height (cm):</Text>
          <TouchableOpacity onPress={() => handleHeightChange(-1)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height.toString()}
            onChangeText={(text) => {
              const newHeight = parseInt(text, 10) || 1;
              setHeight(newHeight);
              updateBMI(weight, newHeight);
            }}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity onPress={() => handleHeightChange(1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* BMI */}
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Your BMI:</Text>
          <Text style={styles.bmiValue}>{bmi}</Text>
        </View>

        {/* Status */}
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Status:</Text>
          <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={() => navigation.navigate('ExplainScreen')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Explanation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')} style={styles.navButton}>
            <Text style={styles.navButtonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AuthorScreen')} style={styles.navButton}>
            <Text style={styles.navButtonText}>About Author</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Hàm đổi màu chữ cho status
const getStatusColor = (status) => {
  switch (status) {
    case "Underweight":
      return "yellow";
    case "Normal":
      return "green";
    case "Overweight":
      return "orange";
    case "Obese":
      return "red";
    default:
      return "black";
  }
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#00008B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#3399FF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 3,
    fontSize: 18,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bmiValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008000",
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#3399FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BMIScreen;