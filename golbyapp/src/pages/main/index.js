import React from 'react';
import { Text, ScrollView, FlatList, StyleSheet, View, Image } from 'react-native';
import api from '../../services/api';
import { Container, Container2 } from './styles';
import {  Card, Button, Icon } from 'react-native-elements';

// import styles from './styles';

export default class Main extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    list: [],
    img: `rato.jpg`
  }

  componentDidMount() {
    api.get('/api/users.json')
    .then(response => {

      console.log(response);
      this.setState({ list : response.data.users });

    })
    .catch(error => {

      console.log(error);

    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={this.state.list}
            renderItem={({item}) =>
              <View style={styles.card}>
                <View style={styles.card2}>
                  <View style={styles.feedItem}>
                    <View>
                      <Image
                        source={{uri: `http://0cf3dfdb.ngrok.io/intranetpm/golby/img/${this.state.img}`}}
                        resizeMode="cover"
                        style={styles.feedImage}
                      />
                    </View>
                    <View style={styles.feedItemFooter}>
                      <Text style={styles.item}>{item.nome}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
            keyExtractor={item => item.id.toString()}
          />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#FFFFFF",
  },
  feedImage: {
    width: 344,
    height: 304,
  },
  feedItemFooter: {
    padding: 10,
    width: 155
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "black"
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card2: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    elevation: 4,
  },
})

