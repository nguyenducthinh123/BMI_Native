import React from 'react';
import { TextInput, View, Text, TouchableOpacity, Vibration } from 'react-native';
import styles from './styles';

function InputItem({ label, value, onChange, onIncrease, onDecrease }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default InputItem;