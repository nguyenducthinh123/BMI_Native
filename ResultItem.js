import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

function ResultItem({ label, value, color, showInfo, setShowInfo, infoText }) {
  return (
    <>
      <TouchableOpacity onPressIn={() => setShowInfo(true)} onPressOut={() => setShowInfo(false)}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>{label}</Text>
          <Text style={[styles.resultValue, { color: color }]}>{value}</Text>
        </View>
      </TouchableOpacity>
      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
      )}
    </>
  );
}

export default ResultItem;