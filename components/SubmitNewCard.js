import React from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { red, white } from '../utils/colors';

export default function SubmitNewCard({ onSubmit }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onSubmit}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});
