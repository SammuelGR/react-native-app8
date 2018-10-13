import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM,
    SALVAR_DADOS_CONVERSA
} from '../actions/types';

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    cadastro_resultado_inclusao: false,
    mensagem: '',
    contato_ativo_nome: '',
    contato_ativo_email: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload }
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: action.payload, adiciona_contato_email: '' }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case SALVAR_DADOS_CONVERSA:
            return { ...state, contato_ativo_nome: action.payload.contatoNome, contato_ativo_email: action.payload.contatoEmail }
        default: 
            return state;
    }
}
