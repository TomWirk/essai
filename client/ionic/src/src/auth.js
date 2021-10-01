import React, {Component} from "react";
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse:'',
    username:'',
    password:'',
    nom:'',
    prenom:'',
    dob:'',
     user:'', newUser:false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuth=this.handleAuth.bind(this)
    this.handleSub=this.handleSub.bind(this)
}

/*callAPI() {
    axios.get("http://localhost:8000")
    //.then(res =>console.log(res.text()))
        .then(res => res.data)
        .then(res => this.setState({ message: res }));
}

componentWillMount() {
    this.callAPI();
}*/

handleSub(){
  (this.state.newUser ? this.setState({newUser:false}) : this.setState({newUser:true}))
}

handleAuth(user){
  this.props.handleAuth(user)
}

handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.newUser){
      axios.post(`http://localhost:8000/newuser`, this.state)
      .then(res => {
        if(res.data.success){
          this.handleAuth(res.data.user)
        }
        this.setState({apiResponse:<p>{res.data.message}</p>})
      })

      
    }else{
    /*axios.post(`http://localhost:8000`, this.state)
      .then(res => {
        if(res.data.success){
          this.handleAuth(res.data.user)
        }
        this.setState({apiResponse:<p>{res.data.message}</p>})
      })*/
      axios.post('http://projetcubes.somee.com/Account/Login',{login:this.state.username,password:this.state.password},{headers :{"Bypass-Tunnel-Reminder":true}}).then((response) => {
        if (response.status === 200) {
        // On récupêre les données
        console.log('test réussi')
        } else {
          console.log('test foiré')
        }
        })
    }

    
  }
  render(){

    if(this.state.newUser){
      return (
        <div className="App">

        <form onSubmit={this.handleSubmit}>
          <label>
          <p>Nom</p>
           <input type="text" name= "nom"onChange={this.handleChange}/>
          </label>
          <label>
          <p>Prénom</p>
            <input type="text" name= "prenom"onChange={this.handleChange}/>
          </label>
          <label>
          <p>Date de naissance :</p>
            
            <input type="date" name= "dob"onChange={this.handleChange}/>
          </label>
          <label>
          <p>Email :</p>
            
            <input type="text" name= "username"onChange={this.handleChange}/>
          </label>
          <label>
          <p> Mot de passe :</p>
           
            <input type="password" name= "password"onChange={this.handleChange}/>
          </label>
          <div><input type="submit"/>
            <button type="button" Button onClick={this.handleSub}>Annuler</button></div>
          
        </form></div>)
    }

    
    else{
      return (
      
        <div className="App">
          
        <h1>Authentifiez-vous</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Identifiant</p>
            <input type="text" name= "username"onChange={this.handleChange} />
          </label>
          <label>
            <p>Mot de passe</p>
            <input type="password" name= "password" onChange={this.handleChange} />
          </label>
          <div>
            <button type="submit">Soumettre</button>
            <button type="button" Button onClick={this.props.handlePageAuth}>Annuler</button>
            <button type="button" Button onClick={this.handleSub}>S'inscrire</button>
            {this.state.apiResponse}</div>
        </form>
  
        </div>
      );
    }

    
  }
}


  

export default App;
