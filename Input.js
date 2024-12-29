import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, Vibration } from 'react-native';
import styles from './styles';

const Input = ({ weight, setWeight, height, setHeight, updateBMI }) => {
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
    <View>
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
            const newWeight = parseInt(text, 10) || 1;
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
    </View>
  );
};

export default Input;