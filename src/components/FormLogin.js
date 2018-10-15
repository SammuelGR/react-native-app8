import React from 'react';
import { ActivityIndicator, Button, ImageBackground, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { autenticarUsuario, modificaEmail, modificaSenha } from '../actions/AutenticacaoActions';

class FormLogin extends React.Component {
    static navigationOptions = {
        title: 'Login'
    }

    _autenticarUsuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({ email, senha })
    }
    
    renderBrnAcessar() {
        if(this.props.loading_login) {
            return (
                <ActivityIndicator size='large' />
            );
        }
        return (
            <Button 
                color='#115E54' 
                onPress={() => this._autenticarUsuario()} 
                title='Acessar'
            />
        );
    }

    render() {
        return (
            <ImageBackground style={{flex: 1}} source={require('../imgs/bg.png')} >
                <View style={{flex: 1, padding: 10}} >
                    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}} >
                        <Text style={{color:'#FFF', fontSize: 25}} >WhatsApp Clone</Text>
                    </View>
                    <View style={{flex: 2}} >
                        <TextInput 
                            autoCapitalize='none' 
                            keyboardType='email-address' 
                            onChangeText={texto => this.props.modificaEmail(texto)} 
                            placeholder='E-mail' 
                            placeholderTextColor='#FFF' 
                            style={{fontSize: 20, height: 45}} 
                            textContentType='emailAddress'
                            value={this.props.email}
                        />
                        <TextInput 
                            autoCapitalize='none' 
                            onChangeText={texto => this.props.modificaSenha(texto)} 
                            placeholder='Senha' 
                            placeholderTextColor='#FFF' 
                            secureTextEntry style={{fontSize: 20, height: 45}} 
                            textContentType='password' 
                            value={this.props.senha}
                        />
                        <Text style={{ color: '#FF0000', fontSize: 15}} >
                            {this.props.erroLogin}
                        </Text>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Cadastro')} >
                            <Text style={{alignSelf: 'center', color:'#FFF', fontSize: 17}}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 2}}>
                        {this.renderBrnAcessar()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { autenticarUsuario, modificaEmail, modificaSenha })(FormLogin);
