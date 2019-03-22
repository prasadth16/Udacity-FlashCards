import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { red, white } from '../utils/colors'


export default function SubmitBtn ({displayText, deckId, navigation,onSubmit}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={()=>onSubmit(navigation,deckId)}>
        <Text style={styles.submitBtnText}>{displayText}</Text>
    </TouchableOpacity>
  )
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
    marginTop:5,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  
})