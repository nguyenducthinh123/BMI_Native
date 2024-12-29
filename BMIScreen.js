import React, { useState, useEffect } from "react";
import { View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Title from './Title';
import Input from './Input';
import Result from './Result';
import styles from './styles';

const BMIScreen = () => {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);
  const [status, setStatus] = useState("Normal");
  const [bmi, setBMI] = useState(calculateBMI(65, 165));
  const [statusColor, setStatusColor] = useState(getStatusColor("Normal"));
  const [showBMIInfo, setShowBMIInfo] = useState(false);
  const [showStatusInfo, setShowStatusInfo] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      else {
        console.log('Location permission granted');
      }
    })();
  }, []);

  // Update status color when status changes
  useEffect(() => {
    setStatusColor(getStatusColor(status));
    // console.log('change color');
  }, [status]);

  function calculateBMI(weight, height) {
    const bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(2);
    return bmiValue;
  }

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

    if (status !== newStatus) {
      setStatus(newStatus);
      console.log(`Status changed from ${status} to ${newStatus}`);
    }

    let location = await Location.getCurrentPositionAsync({});
    const roundedLocation = location ? `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}` : 'Unknown';

    const log = {
      weight: newWeight,
      height: newHeight,
      bmi: bmiValue,
      status: newStatus,
      time: new Date().toLocaleString(),
      location: roundedLocation
    };

    // console.log(log);

    let logs = await AsyncStorage.getItem('bmiLogs');
    logs = logs ? JSON.parse(logs) : [];
    logs.unshift(log); // Add new log to the beginning of the array
    if (logs.length > 10) logs.pop(); // Keep only the latest 10 logs
    await AsyncStorage.setItem('bmiLogs', JSON.stringify(logs));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title />
        <Input weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} updateBMI={updateBMI} />
        <Result
          bmi={bmi}
          status={status}
          statusColor={statusColor}
          showBMIInfo={showBMIInfo}
          setShowBMIInfo={setShowBMIInfo}
          showStatusInfo={showStatusInfo}
          setShowStatusInfo={setShowStatusInfo}
        />
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

export default BMIScreen;