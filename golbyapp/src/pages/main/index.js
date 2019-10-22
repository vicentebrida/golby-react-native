import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import api from '../../services/api';

// import styles from './styles';

export default class Main extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    list: []
  }

  componentDidMount() {
    api.get('/users.json')
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
      <View>
        {
          this.state.list.map((item, i) => (
            <ListItem
              key={i}
              title={item.nome_guerra}
              subtitle={item.nome}
              bottomDivider
              chevron
            />
          ))
        }
      </View>
    );
  }
}

