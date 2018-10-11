//TODO: remover mensagem de erro em login e cadastro

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';
import Contatos from './components/Contatos';

import reducers from './reducers';

import NavigationService from './services/NavigationService';

const RootStack = createStackNavigator(
    {
        Login: {
            screen: FormLogin,
            navigationOptions: () => ({
                header: null
            })
        },
        Cadastro: FormCadastro,
        BoasVindas: {
            screen: BoasVindas,
            navigationOptions: () => ({
                header: null
            })
        },
        Principal: {
            screen: Principal,
            navigationOptions: () => ({
                header: null
            })       
        },
        AdicionarContato: {
            screen: AdicionarContato,
            navigationOptions: () => ({
                title: 'Adicionar Contato',
            })
        },
        Conversa: Conversa,
        Contatos: {
            screen: Contatos,
            navigationOptions: () => ({
                header: null
            })
        }
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#115E54'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: '400',
            }
        }
    }
);

export default class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        let config = {
            apiKey: "AIzaSyB4u7wyzJu2Msd47u8vuqhztro9BwHgqrw",
            authDomain: "whatsapp-clone-f4c45.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-f4c45.firebaseio.com",
            projectId: "whatsapp-clone-f4c45",
            storageBucket: "whatsapp-clone-f4c45.appspot.com",
            messagingSenderId: "709657836376"
        };
        if(!firebase.apps.lenght) {
            firebase.initializeApp(config);
        }
    }

	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<RootStack ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
			</Provider>
		);
	}
}
