import React from 'react';
import { ListView, Text, TouchableHighlight,  View } from 'react-native';
import { conversasUsuarioFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import NavigationService from '../services/NavigationService';

 class Conversas extends React.Component {
    componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados(conversas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.dataSource = ds.cloneWithRows(conversas)
    }

    renderRow(conversa) {
        return (
            <TouchableHighlight 
                onPress={() => {
                    NavigationService.navigate('Conversa', { nome: conversa.nome, email: conversa.email });
                }}
                underlayColor='#CCC'
            >
                <View style={{borderBottomWidth: 1, borderColor: '#CCC', flex: 1, padding: 20}} >
                    <Text style={{fontSize: 20}} >{conversa.nome}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView 
                dataSource={this.dataSource}
                enableEmptySections
                renderRow={this.renderRow}
            />
        );
    }
}

mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid };
    });

    return {
        conversas,
    }
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas)
