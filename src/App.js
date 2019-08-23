import React, { Component } from 'react';
import firebase from './fireConnection';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      user: null
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.logar     = this.logar.bind(this);
    this.auth     = this.auth.bind(this);
    this.logout     = this.logout.bind(this);

  }

  componentDidMount(){
    this.auth();
  }

  logout(){
    firebase.auth().signOut()
      .then(() => {
        this.setState({ user: null });
      });
  }

  auth(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user});
      }
    });
  }

  logar(){
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error) => {
        if (error.code === 'auth/wrong-password'){
          alert("Senha incorreta!");
        } else if (error.code === 'auth/invalid-email') {
          alert("Email inserido inválido");
        } else if (error.code === 'auth/user-not-found') {
          alert('Usuário não existe!');
        } else {
          alert('Código de erro: ' + error.code + ' backtrace: ' + error.message);
        }
      });
  }

  cadastrar(){
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error) => {
        if (error.code === 'auth/invalid-email'){
          alert('Código de erro: ' + error.code + ' backtrace: ' + error.message);
        }
      });
  }

  render(){
    return (
      <div>
        { this.state.user ?
          <div>
            <p>Painel admin</p>
            <p>Seja bem vindo</p>
            <br />
            <button onClick={ this.logout }>Sair</button>
          </div>
          :
          <div>
            <h2>Seja bem-vindo</h2>
        
            Email<br />
            <input type="text" value={this.state.email} 
              onChange={ (e) => this.setState({ email: e.target.value }) } />
            <br />
            Senha<br />
            <input type="password" value={this.state.senha} 
              onChange={ (e) => this.setState({ senha: e.target.value }) } />
            <br />
            <button onClick={ this.cadastrar }>Cadastrar</button>
            <button onClick={ this.logar }>Login</button>
          </div>
        }
      </div>
    );
  }
}