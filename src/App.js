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
      idadeInput: "",
      lista: []
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

    this.cadastrar = this.cadastrar.bind(this);

    firebase.database().ref('Usuarios').on('value', (snapshot) => {
      let state = this.state;
      state.lista = [];

      snapshot.forEach((childrenItem) => {
        state.lista.push({
          key: childrenItem.key,
          nome: childrenItem.val().nome,
          idade: childrenItem.val().idade
        });
      });

      this.setState(state);
      console.log(this.state.lista);
    });
  }

  cadastrar(e){
    
    e.preventDefault();
  }

  render(){
    const { token, nome, idade } = this.state;
    return (
      <div>
        { this.state.lista.map((item) => {
          return(
            <ul key={ item.key }>
              <li> Nome: { item.nome } </li>
              <li> idade: { item.idade } </li>
            </ul>
          );
        }) }
      </div>
    );
  }
}