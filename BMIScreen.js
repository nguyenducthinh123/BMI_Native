import React, { useState, useEffect } from "react";
import { View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, Vibration } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Title from './Title';
import InputItem from './InputItem';
import ResultItem from './ResultItem';
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

  // Update color when status changes
  useEffect(() => {
    setStatusColor(getStatusColor(status));
    // console.log('Change color');
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
    logs.unshift(log);
    if (logs.length > 10) logs.pop();
    await AsyncStorage.setItem('bmiLogs', JSON.stringify(logs));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title/>
        <InputItem
          label="Enter weight (kg):"
          value={weight}
          onChange={(value) => {
            const newWeight = parseInt(value, 10) || 1;
            if (newWeight > 0 && newWeight < Number.MAX_SAFE_INTEGER) {
              setWeight(newWeight);
              updateBMI(newWeight, height);
            }
          }}
          onIncrease={() => {
            Vibration.vibrate(100);
            const newWeight = weight + 1;
            if (newWeight > 0 && newWeight < Number.MAX_SAFE_INTEGER) {
              setWeight(newWeight);
              updateBMI(newWeight, height);
            }
          }}
          onDecrease={() => {
            Vibration.vibrate(100);
            const newWeight = weight - 1;
            if (newWeight > 0 && newWeight < Number.MAX_SAFE_INTEGER) {
              setWeight(newWeight);
              updateBMI(newWeight, height);
            }
          }}
        />
        <InputItem
          label="Enter height (cm):"
          value={height}
          onChange={(value) => {
            const newHeight = parseInt(value, 10) || 1;
            if (newHeight > 0 && newHeight < Number.MAX_SAFE_INTEGER) {
              setHeight(newHeight);
              updateBMI(weight, newHeight);
            }
          }}
          onIncrease={() => {
            Vibration.vibrate(100);
            const newHeight = height + 1;
            if (newHeight > 0 && newHeight < Number.MAX_SAFE_INTEGER) {
              setHeight(newHeight);
              updateBMI(weight, newHeight);
            }
          }}
          onDecrease={() => {
            Vibration.vibrate(100);
            const newHeight = height - 1;
            if (newHeight > 0 && newHeight < Number.MAX_SAFE_INTEGER) {
              setHeight(newHeight);
              updateBMI(weight, newHeight);
            }
          }}
        />
        <ResultItem
          label="Your BMI:"
          value={bmi}
          color="#008000"
          showInfo={showBMIInfo}
          setShowInfo={setShowBMIInfo}
          infoText="BMI = weight (kg) / height² (m²)"
        />
        <ResultItem
          label="Status:"
          value={status}
          color={statusColor}
          showInfo={showStatusInfo}
          setShowInfo={setShowStatusInfo}
          infoText={`Status is determined by BMI value:\n- Underweight: BMI < 18.5\n- Normal: 18.5 ≤ BMI < 25\n- Overweight: 25 ≤ BMI < 30\n- Obese: BMI ≥ 30`}
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