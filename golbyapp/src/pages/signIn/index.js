import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
} from './styles';



export default class SignIn extends Component {
    static navigationOptions = {
        header: null,
    };
    
    state = { email: '', password: '', error: '' };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };
      
    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
            try {

                await api.post('api/users/login', {
                    email: this.state.email,
                    password: this.state.password,
                }).then(function(response){
                    resp = response.data;
                });

                await AsyncStorage.setItem('@GolbyApp:token', resp.data.token);
        
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' }),
                    ],
                });

                this.props.navigation.dispatch(resetAction);

            } catch (_err) {
                this.setState({ error: 'Houve um erro de autenticação!' });
            }
        }
    };

    render() {
        return (
        <Container>
            <StatusBar hidden />
            <Logo source={require('../../images/airbnb_logo.png')} resizeMode="contain" />
            <Input
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <Input
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            />
            {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <Button onPress={this.handleSignInPress}>
            <ButtonText>Entrar</ButtonText>
            </Button>
        </Container>
        );
    }
}