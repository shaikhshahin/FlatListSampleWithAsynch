import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    return fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
         AsyncStorage.setItem("key", JSON.stringify(data));
        Alert.alert('Saved', 'Successful');

        this.setState(
          {
            isLoading: false,
            data: data,
          },
          //function() {
          // In this block you can do something with new state.
          //},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  GetFlatListItem(name) {
    Alert.alert(name);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => (
            <Text
              style={styles.FlatListItemStyle}
              onPress={this.GetFlatListItem.bind(this, item.name)}>
              {' '}
              {item.name}{' '}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

AppRegistry.registerComponent('Project', () => Project);
