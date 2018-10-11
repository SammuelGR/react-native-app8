import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { adicionaContato, modificaAdicionaContatoEmail } from '../actions/AppActions';

class AdicionarContato extends React.Component {
    renderAdicionarContato() {
        if(!this.props.cadastro_resultado_inclusao) {
            return (
                <View style={{flex: 1}} >
                    <View style={{flex: 1, justifyContent: 'center'}} >
                        <TextInput 
                            autoCapitalize='none' 
                            keyboardType='email-address' 
                            onChangeText={texto => this.props.modificaAdicionaContatoEmail(texto)} 
                            placeholder='E-mail'
                            style={{fontSize: 20, height: 45}} 
                            textContentType='emailAddress'
                            value={this.props.adiciona_contato_email}
                        />
                    </View>
                    <View style={{flex: 1}} >
                        <Button 
                            color='#115E54'
                            onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email)}
                            title='Adicionar'
                        />
                        <Text style={{color: '#ff0000', fontSize: 18}} >{this.props.cadastro_resultado_txt_erro}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={{fontSize: 18}}>Cadastro realizado com sucessso!</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', padding: 20}} >
                {this.renderAdicionarContato()}
            </View>
        );
    }
}
    


const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
    }
)

export default connect(mapStateToProps, { adicionaContato, modificaAdicionaContatoEmail })(AdicionarContato);
