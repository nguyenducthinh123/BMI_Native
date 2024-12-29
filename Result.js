import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Result = ({ bmi, status, statusColor, showBMIInfo, setShowBMIInfo, showStatusInfo, setShowStatusInfo }) => {
  return (
    <View>
      <TouchableOpacity onPressIn={() => setShowBMIInfo(true)} onPressOut={() => setShowBMIInfo(false)}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Your BMI:</Text>
          <Text style={styles.bmiValue}>{bmi}</Text>
        </View>
      </TouchableOpacity>
      {showBMIInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>BMI = weight (kg) / height² (m²)</Text>
        </View>
      )}

      <TouchableOpacity onPressIn={() => setShowStatusInfo(true)} onPressOut={() => setShowStatusInfo(false)}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Status:</Text>
          <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
        </View>
      </TouchableOpacity>
      {showStatusInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Status is determined by BMI value:
            {"\n"}- Underweight: BMI &lt; 18.5
            {"\n"}- Normal: 18.5 ≤ BMI &lt; 25
            {"\n"}- Overweight: 25 ≤ BMI &lt; 30
            {"\n"}- Obese: BMI ≥ 30
          </Text>
        </View>
      )}
    </View>
  );
};

export default Result;