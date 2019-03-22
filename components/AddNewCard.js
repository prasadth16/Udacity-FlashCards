import React, { Component } from 'react';
import { addCardToDeck } from '../utils/api';
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { purple, white } from '../utils/colors';
import SubmitNewCard from './SubmitNewCard';

class AddNewCard extends Component {
  state = {
    newQuestion: '',
    newAnswer: '',
  };

  isValidateForm = (question, answer) => {
    console.log('Question and Answer' + question + answer);
    if (question !== undefined|| answer !== undefined) return true;
    else return false;
  };

  addNewQuestionAnswer = async event => {
    event.preventDefault();

    const { question, answer } = this.state;

    if (!this.isValidateForm(question, answer)) {
      Alert.alert(
        'Required',
        'You Can Keep None Of The Fields Blank. Please Fill in Question And Answer.'
        
      );
      return;
    }

    await addCardToDeck(
      {
        question: question,
        answer: answer,
      },
      this.props.navigation.state.params.deckId
    );

    this.setState({
      question: '',
      answer: '',
    });

    this.props.navigation.navigate('DeckInformation', {
      deckId: this.props.navigation.state.params.deckId,
    });
  };

  render() {
    const deckId = this.props.navigation.state.params.deckId;
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>New Question: </Text>
          <TextInput
            value={question}
            style={styles.input}
            onChangeText={question => this.setState({ question: question })}
          />
        </View>
        <View style={styles.row}>
          <Text>New Answer: </Text>
          <TextInput
            value={answer}
            style={styles.input}
            onChangeText={answer => this.setState({ answer: answer })}
          />
        </View>
        <SubmitNewCard onSubmit={this.addNewQuestionAnswer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 10,
  },
});

export default AddNewCard;
