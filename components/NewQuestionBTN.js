import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { red, white } from '../utils/colors';

export default function NewQuestionBTN({
  buttonCaption,
  deckId,
  navigate,
  onSubmit,
}) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={() => onSubmit(navigate, deckId)}>
      <Text style={styles.submitBtnText}>{buttonCaption}</Text>
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
    marginLeft: 10,
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
