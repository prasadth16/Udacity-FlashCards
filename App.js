import React, {Component} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import {Font, AppLoading} from 'expo';
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import { red, white } from './utils/colors'
import { Constants } from 'expo'
import DeckList from './components/DeckList';
import AddDeck from './components/AddNewDeck';
import DeckInformation from './components/DeckData';
import AddNewCard from './components/AddNewCard';
import Quiz from './components/Quiz';
import {setLocalNotification} from "./utils/api";

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={45} color={red} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={45} color={red} />
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? red : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : red,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)


const MainNavigator = createStackNavigator({
    home: {
        screen: TabsContainer,
        navigationOptions: {
          title: 'Mobile Flashcards',
          header: null,
        },
    },
    DeckInformation: {
        screen: DeckInformation,
        navigationOptions: {
            headerTintColor: '#000',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    AddNewCard: {
        screen: AddNewCard,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: '#000',
        },
    },
});

const MainContainer = createAppContainer(MainNavigator)

class App extends Component {

    state = {
        loading: true
    };

    async componentDidMount() {
        this.setState({ loading: false });
        setLocalNotification();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <AppLoading />
                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <UdaciStatusBar backgroundColor={red} barStyle="light-content" />
                <MainContainer />
            </View>
        );
    }
}

export default App;