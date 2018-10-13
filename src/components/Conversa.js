import React from 'react';
import { Image, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, salvarDadosConversa } from '../actions/AppActions';

class Conversa extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('nome'),
            contatoNome: navigation.getParam('nome'),
            contatoEmail: navigation.getParam('email')
        }
    }

    componentWillMount() {
        let contatoNome = this.props.navigation.getParam('nome');
        let contatoEmail = this.props.navigation.getParam('email');
        this.props.salvarDadosConversa( contatoNome, contatoEmail );
    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
    }

    render() {
        return (
            <View style={{ backgroundColor: '#eee4dc', flex: 1, padding: 10 }}>
                <View style={{flex: 1, paddingBottom: 20}} >

                </View>
                <View style={{ flexDirection: 'row', height: 60 }} >
                    <TextInput
                        style={{ backgroundColor: '#FFF', flex: 4, fontSize: 18}}
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                    />
                    <TouchableHighlight onPress={() => this._enviarMensagem.bind(this)} underlayColor='#FFF' >
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    return ({
        mensagem: state.AppReducer.mensagem,
        contatoEmail: state.AppReducer.contato_ativo_email,
        contatoNome: state.AppReducer.contato_ativo_nome
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, salvarDadosConversa })(Conversa);
