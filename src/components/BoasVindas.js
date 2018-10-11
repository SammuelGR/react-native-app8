import React from 'react';
import { Button, Image, ImageBackground, Text, View } from 'react-native';

export default class BoasVindas extends React.Component {
    static navigationOptions = {
        title: 'Bem-Vindo'
    }

    render () {
        return (
            <ImageBackground style={{flex: 1}} source={require('../imgs/bg.png')} >
                <View style={{flex: 1, padding: 15}}>
                    <View style={{alignItems: 'center', flex: 2, justifyContent: 'center'}} >
                        <Text style={{color: '#FFF', fontSize: 20}} >Seja Bem-Vindo</Text>
                        <Image source={require('../imgs/logo.png')} />
                    </View>
                    <View style={{flex: 1}} >
                        <Button
                            color='#115E54'
                            onPress={() => this.props.navigation.popToTop()} 
                            title='Fazer Login'
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
