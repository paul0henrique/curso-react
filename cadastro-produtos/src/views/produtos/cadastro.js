import React from "react";

import ProductService from '../../app/productServices'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: []
}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor(){
        super()
        this.service = new ProductService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({  [nomeDoCampo]: valor   })
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.preco,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try{
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({ sucesso: true })

        }catch(error){
            const errors = error.errors
            this.setState({errors : errors })
        }
    }

    limpaCampos = () => {
        this.setState(estadoInicial) 
    }
    
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>

                <div className='card-body'>

                    { this.state.sucesso &&
                        
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Sucesso!</strong> Cadastro realizado<a href="#"></a>.
                        </div>        
                    }

                    { this.state.errors.length > 0 &&

                        this.state.errors.map( msg => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                    <strong>Erro!</strong> {msg}
                                </div>        
                            )
                        })
                    }



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input  type="text" 
                                        name="nome" 
                                        onChange={this.onChange}
                                        value={this.state.nome} 
                                        className="form-control"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input  type="text"
                                        name="sku"
                                        onChange={this.onChange}
                                        value={this.state.sku} 
                                        className="form-control"/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                     <label>Descrição:</label>
                                    <textarea name="descricao"
                                            value={this.state.descricao}
                                            onChange={this.onChange}
                                            className="form-control"></textarea>
                                 </div>
                            </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input  name="preco" 
                                        value={this.state.preco}
                                        onChange={this.onChange}
                                        type="text"
                                        className="form-control"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input  name="fornecedor"
                                        value={this.state.fornecedor}
                                        onChange={this.onChange}
                                        type="text" 
                                        className="form-control"/>
                            </div>
                        </div>
                    </div>

                        <div className="row">
                            <div className="col-md-1">
                                <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                            </div>

                            <div className="col-md-1">
                                <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CadastroProduto;