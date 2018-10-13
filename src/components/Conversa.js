import React from 'react';
import { Image, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem } from '../actions/AppActions';

class Conversa extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('nome'),
        }
    }

    _enviarMensagem = ({navigation}) => {
        const { mensagem } = this.props;
        //CONTINUAR DAQUI
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
                    <TouchableHighlight onPress={() => false} underlayColor='#FFF' >
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    return ({
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem })(Conversa);
