import React from 'react';
import { ActivityIndicator, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { 
    cadastraUsuario, 
    modificaEmail,
    modificaNome, 
    modificaSenha
} from '../actions/AutenticacaoActions';

class FormCadastro extends React.Component {
    static navigationOptions = {
        title: 'Cadastro',
    }

    _cadastraUsuario() {
        const { nome, email, senha } = this.props;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastrar() {
        if (this.props.loading_cadastro) {
            return (
                <ActivityIndicator size='large' />
            );
        }
        return (
            <Button 
                color='#115E54' 
                onPress={() => this._cadastraUsuario()} 
                title='Cadastrar'
            />
        );
    }

    render() {
        return (
            <ImageBackground style={{flex: 1}} source={require('../imgs/bg.png')} >
                <View style={{flex: 1, padding: 10}} >
                    <View style={{flex: 4, justifyContent: 'center'}} >
                        <TextInput 
                            onChangeText={texto => this.props.modificaNome(texto)} 
                            placeholder='Nome' 
                            placeholderTextColor='#FFF' 
                            style={{fontSize: 20, height: 45}} 
                            value={this.props.nome}
                        />
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
                            secureTextEntry 
                            style={{fontSize: 20, height: 45}}
                            textContentType='password' 
                            value={this.props.senha}
                        />
                        <Text style={{color: '#ff0000', fontSize: 18}} >{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{flex: 1}} >
                        {this.renderBtnCadastrar()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
    }
);

export default connect(
    mapStateToProps, 
    { 
        cadastraUsuario,  
        modificaEmail,
        modificaNome, 
        modificaSenha 
    }
)(FormCadastro);
