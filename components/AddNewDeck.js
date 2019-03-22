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
import { addNewDeck } from '../utils/api';
import { white } from '../utils/colors';
import SubmitNewCard from './SubmitNewCard';

class AddNewDeck extends Component {
  state = {
    DeckName: '',
  };

  isValidForm = deckName => {
    if (deckName === undefined || deckName === '') return false;
    else return true;
  };
  addDeck = async event => {
    event.preventDefault();

    const { DeckName } = this.state;
    if (!this.isValidForm(DeckName)) {
      Alert.alert('Required', 'Deck Name Must Not Be Empty.');
      return;
    }

    await addNewDeck({ [DeckName]: { deckId: DeckName, cards: [] } });

    this.setState({
      DeckName: '',
    });

    this.props.navigation.navigate('DeckInformation', { deckId: DeckName });
  };

  render() {
    const { DeckName } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Deck Name </Text>
          <TextInput
            value={DeckName}
            style={styles.input}
            onChangeText={input => this.setState({ DeckName: input })}
          />
        </View>
        <SubmitNewCard onSubmit={this.addDeck} />
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
    margin: 50,
  },
});

export default AddNewDeck;
