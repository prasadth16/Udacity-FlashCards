import React, { Component } from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { setLocalNotification, clearLocalNotifications } from '../utils/api';
import { red, white } from '../utils/colors';

class Quiz extends Component {
  state = {
    correctAnswers: 0,
    questionAnswered: 0,
    showingAnswer: false,
  };

  handleNotifications = () => {
    clearLocalNotifications().then(setLocalNotification);
  };

  handleAnswer = isCorrect => {
    let newCorrect = isCorrect
      ? this.state.correctAnswers + 1
      : this.state.correctAnswers;

    this.setState({
      questionAnswered: this.state.questionAnswered + 1,
      correctAnswers: newCorrect,
      showingAnswer: false,
    });
  };

  handleShowAnswer = () => {
    this.setState({ showingAnswer: true });
  };
  handleScore = (totalCorrect, total) => {
    return (100 * totalCorrect) / total;
  };
  handleRestartQuiz = () => {
    this.handleNotifications();

    this.setState({
      correctAnswers: 0,
      questionAnswered: 0,
      showingAnswer: false,
    });
  };

  render() {
    const deckDetails = this.props.navigation.state.params.DeckInformation;
    const totalQuestions = deckDetails.cards.length;

    const { questionAnswered } = this.state;

    return (
      <View style={styles.container}>
        {totalQuestions > questionAnswered ? (
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.header}>{deckDetails.deckId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.normalText}>
                This is Question {questionAnswered + 1} of {totalQuestions}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.normalText}>
                Question: {deckDetails.cards[questionAnswered].question}
              </Text>
            </View>

            {this.state.showingAnswer === true ? (
              <View style={styles.row}>
                <Text style={styles.normalTextRed}>
                  Answer Is: {deckDetails.cards[questionAnswered].answer}
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <Text
                  style={styles.normalTextRed}
                  onPress={this.handleShowAnswer}>
                  Show Answer
                </Text>
              </View>
            )}
            <View style={styles.row}>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn
                }
                onPress={() => this.handleAnswer(true)}>
                <Text style={styles.submitBtnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn
                }
                onPress={() => this.handleAnswer(false)}>
                <Text style={styles.submitBtnText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.header}>{deckDetails.deckId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.normalText}>
                Score:{' '}
                {this.handleScore(this.state.correctAnswers, totalQuestions)} %
                answers were correct.
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn
                }
                onPress={() => this.handleRestartQuiz()}>
                <Text style={styles.submitBtnText}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? styles.iosSubmitBtn
                    : styles.AndroidSubmitBtn
                }
                onPress={() => this.props.navigation.navigate('DecksList')}>
                <Text style={styles.submitBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 10,
    alignItems: 'center',
  },
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
    paddingLeft: 10,
    paddingRight: 10,
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

  header: {
    flex: 1,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  normalText: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
  },
  normalTextRed: {
    flex: 1,
    fontSize: 16,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Quiz;
