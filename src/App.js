import React, { Component } from 'react';
import firebase from 'firebase';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: '',
      tokenInput: "",
      nomeInput: "",
      idadeInput: ""
    };

    let firebaseConfig = {
      apiKey: "AIzaSyAxiD6vqmIM_QA6HXNU7tBOTrdZsWtdNms",
      authDomain: "reactapp-945b5.firebaseapp.com",
      databaseURL: "https://reactapp-945b5.firebaseio.com",
      projectId: "reactapp-945b5",
      storageBucket: "",
      messagingSenderId: "615588689768",
      appId: "1:615588689768:web:76c9956acfdf3604"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // observer firebase node
    firebase.database().ref('token')
      .on('value', (snapshot) => {
        let state = this.state;
        state.token = snapshot.val();

        this.setState(state);
      });
    
    // not observer firebase node
    // firebase.database().ref('token')
    //   .once('value').then((snapshot) => {
    //     let state = this.state;
    //     state.token = snapshot.val();

    //     this.setState(state);
    //   });

    firebase.database()
      .ref('Usuarios').child(1)
      .on('value', (snapshot) => {
        let state = this.state;
        state.nome = snapshot.val().nome;
        state.idade = snapshot.val().idade;

        this.setState(state);
      });

      this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(e){
    // firebase.database().ref('token')
    //  .set(this.state.tokenInput);

    // firebase.database().ref('Usuarios')
    //   .child(1).child('idade')
    //   .set(this.state.tokenInput);

    // firebase.database().ref('Usuarios')
    // .child(1).child('cargo').set(this.state.tokenInput);


    // firebase.database().ref('Usuarios')
    // .child(1).child('cargo').remove();

    let state = this.state;

    let usuarios = firebase.database().ref('Usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: state.nomeInput,
      idade: state.idadeInput
    });
    
    e.preventDefault();
  }

  render(){
    const { token, nome, idade } = this.state;
    return (
      <div>
        <form onSubmit={ this.cadastrar }>
          Nome:<br/>
          <input type="text" value={ this.state.nomeInput } 
            onChange={ (e) => this.setState({nomeInput: e.target.value}) } />
          <br/>
          Idade:<br />
          <input type="text" value={ this.state.idadeInput } 
            onChange={ (e) => this.setState({idadeInput: e.target.value}) } />
          <br />
          <button type="submit">
            Cadastrar
          </button>
        </form>

        <h1>Token: { token }</h1>
        <h2>Nome: { nome }</h2>
        <h2>Idade: { idade }</h2>
      </div>
    );
  }
}