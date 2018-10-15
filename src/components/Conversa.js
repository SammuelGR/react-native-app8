import React from 'react';
import { Image, ListView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { conversaUsuarioFetch, enviarMensagem, modificaMensagem } from '../actions/AppActions';

class Conversa extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('nome'),
        }
    }

    constructor(props) {
        super(props);

        this.state = { autoCorrect: true };
    }

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.navigation.getParam('email'));
        this.criaFonteDeDados(this.props.conversa);
        console.log('componentWillMount:  ' + this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.navigation.getParam('email') != nextProps.navigation.getParam('email')) {
            this.props.conversaUsuarioFetch(nextProps.navigation.getParam('email'))
        }
        this.criaFonteDeDados(nextProps.conversa);
        console.log('componentWillReceiveProps:  ' + nextProps.conversa);
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversa );
    }

    _enviarMensagem() {
        this.setState({ autoCorrect: false });
        this.setState({ autoCorrect: true });
        const { mensagem } = this.props;
        const contatoNome = this.props.navigation.getParam('nome');
        const contatoEmail = this.props.navigation.getParam('email');
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderRow(texto) {
        if(texto.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1}}>{texto.mensagem}</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1}}>{texto.mensagem}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#eee4dc', flex: 1, padding: 10 }}>
                <View style={{flex: 1, paddingBottom: 20}} >
                    <ListView
                        dataSource={this.dataSource}
                        enableEmptySections
                        renderRow={this.renderRow}
                    />
                </View>
                <View style={{ flexDirection: 'row', height: 60 }} >
                    <TextInput
                        autoCorrect = {this.state.autoCorrect}
                        style={{ backgroundColor: '#FFF', flex: 4, fontSize: 18}}
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                    />
                    <TouchableHighlight onPress={() => this._enviarMensagem()} underlayColor='#FFF' >
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid };
    });
    console.log('mapStateToProps:  ' + conversa);

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem,
    })
}

export default connect(mapStateToProps, { conversaUsuarioFetch, enviarMensagem, modificaMensagem })(Conversa);
