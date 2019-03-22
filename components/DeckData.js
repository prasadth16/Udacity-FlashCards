import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import {getDecks} from '../utils/api';
import { red, white } from '../utils/colors'
import NewQuestionBTN from './NewQuestionBTN'
import QuizBTN from './QuizBTN'

class DeckInformation extends Component {

    state = {
        deckObjects: {},
    };

    async componentDidMount() {
        const decks = await getDecks();

        this.setState({
            deckObjects: decks
        });
    }

    async componentDidUpdate() {
        const decks = await getDecks();

        this.setState({
            deckObjects: decks
        });
    }
  getStatusmessage=(deckId, length)=>{
    let message=`${deckId} has ${length} `
    message=length>1?`${message} cards`:`${message} card`
    return message
  }
  newQuestionNavigation=(navigate,deckId)=>(navigate('AddNewCard', {'deckId': deckId}))
  quizNavigation=(navigate, deckId, decks)=>(navigate('Quiz', {'DeckInformation': decks[deckId]}))
    render() {
        const decks = this.state.deckObjects;
        const deckId = this.props.navigation.state.params.deckId;

        if (Object.keys(decks).length > 0) {
            return (
                <View key={deckId} style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.header}>{this.getStatusmessage(decks[deckId].deckId,decks[deckId].cards.length)}</Text>
                        
                    </View>
                    
                    <View style={styles.row}>
                        <NewQuestionBTN buttonCaption="New Question" deckId={deckId} navigate={this.props.navigation.navigate} onSubmit= {this.newQuestionNavigation}/>
                        <QuizBTN buttonCaption="Take Quiz" navigate={this.props.navigation.navigate} decks={decks} deckId={deckId} onSubmit={this.quizNavigation}/>
                    </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  
})

export default DeckInformation;