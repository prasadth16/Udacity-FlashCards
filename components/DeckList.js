import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {getDecks} from '../utils/api';
import { red, white } from '../utils/colors'
import SubmitBtn from './DeckSubmit'



class DeckList extends Component {

    state = {
        deckStack: []
    };

    getDeckCaption = (deckId, decks) => {
      let deckCaption=`${decks[deckId].deckId} has ${decks[deckId].cards.length}`;
      deckCaption=decks[deckId].cards.length>1?`${deckCaption} cards`:`${deckCaption} card`;
      return deckCaption;
    };

    async componentDidMount() {
        const decks = await getDecks();

        this.setState({
            deckStack: decks
        });
    }

    async componentDidUpdate() {
        const decks = await getDecks();

        this.setState({
            deckStack: decks
        });
    }

    onsubmit=(navigation, deckId) =>( navigation.navigate('DeckInformation', { 'deckId': deckId}))

    render() {
        const decks = this.state.deckStack;

        if (decks) {
            return (
                <View style={styles.container}>
                  {
                    Object.keys(decks).map((deckId) => {
                        return <SubmitBtn 
                          key={decks[deckId].deckId} 
                          displayText = {this.getDeckCaption(deckId, decks)} 
                          deckId = {deckId}
                          navigation = {this.props.navigation} onSubmit={this.onsubmit}/>;
                    })
                  }
                </View>
            )
        } else {
            return (
                <View style={styles.container} />
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
})

export default DeckList;