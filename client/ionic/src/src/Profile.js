import React, {Component} from "react";
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      citoyen:this.props.citoyen,
      myProfil:(this.props.user===this.props.citoyen.Id_Utilisateur?true:false),
      apiResponse:'',
      date:new Date().getDate()
    }
    this.handleBan=this.handleBan.bind(this)
    this.handleDisBan=this.handleDisBan.bind(this)
    this.handleChange=this.handleChange.bind(this)
}

componentWillMount() {
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-'+ mm + '-' + dd  ;
this.setState({date:today})
  }

handleChange(event) {
  this.setState({[event.target.name]: event.target.value});
}

handleBan(){
  axios.post("http://localhost:8000/utilisateurs/Ban/",  this.state )
  .then(res => {

  if(res.data.success){
    this.setState({apiResponse:<p>{res.data.message}</p>})
    this.setState(prevState => {
      let citoyen = Object.assign({}, prevState.citoyen);  // creating copy of state variable jasper
      citoyen.isBanned = true;
      citoyen.DateFinBannissement = this.state.date                     // update the name property, assign a new value                 
      return { citoyen };                                 // return new object jasper object
    })
    }
  else{this.setState({
    apiResponse:<p>{res.data.message}</p>
  })}
  })
}


componentWillReceiveProps(props) {
  this.setState({ citoyen: props.citoyen, myProfil:(props.user===props.citoyen.Id_Utilisateur?true:false)})
}


handleDisBan(){
  axios.post("http://localhost:8000/utilisateurs/disBan/",  this.state )
  .then(res => {

  if(res.data.success){
    this.setState({apiResponse:<p>{res.data.message}</p>})
    this.setState(prevState => {
      let citoyen = Object.assign({}, prevState.citoyen);  // creating copy of state variable jasper
      citoyen.isBanned = false;
      citoyen.DateFinBannissement = null                     // update the name property, assign a new value                 
      return { citoyen };                                 // return new object jasper object
    })
    }
  else{this.setState({
    apiResponse:<p>{res.data.message}</p>
  })}
  })
}

  render(){

    //const isLoggedIn=this.state.apiResponse this.props.handlePageAuth

    return (
      
      <div className="App">
        {this.state.apiResponse}
      <h1>{this.state.citoyen.nom} {this.state.citoyen.prenom}</h1>
      {(this.state.myProfil===false && this.props.isAdmin?
                  (this.state.citoyen.isBanned?
                    

                    <div><button Button onClick = {() =>this.handleDisBan()}>Réhabiliter</button>
                  <label>
          <p>Date de fin de Bannissement :</p>
            
            <input disabled type="date" name= "date" value = {this.state.citoyen.DateFinBannissement}onChange={this.handleChange}/>
          </label>
                  </div>

                    :
                  <div><button Button onClick = {() =>this.handleBan()}>Bannir</button>
                  <label>
          <p>Date de fin de Bannissement :</p>
            
            <input type="date" name= "date" value = {this.state.date}onChange={this.handleChange}/>
          </label>
                  </div>)

        :'')}
      </div>
    );
  }
}


  

export default App;
