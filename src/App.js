import React, { Component } from 'react';
import firebase from 'firebase';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: ''
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
    // firebase.database().ref('token')
    //   .on('value', (snapshot) => {
    //     let state = this.state;
    //     state.token = snapshot.val();

    //     this.setState(state);
    //   });
    
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

  }

  render(){
    const { token, nome, idade } = this.state;
    return (
      <div>
        <h1>Token: { token }</h1>
        <h2>Nome: { nome }</h2>
        <h2>Idade: { idade }</h2>
      </div>
    );
  }
}