

import React, {Component} from "react";
import './App.css';
import Auth from './auth';
import Ressource from './App'
import Publication from './inventaire/liste'
import Command from './inventaire/command'
import Citoyens from './inventaire/utilisateurs'
import Profile from './Profile'
import Chat from './chat'

import axios from 'axios'

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {isLoggedIn:false,
      user:'', authPage:false, isAdmin:false,page:'liste', citoyen:''};
  
      this.handleAuth = this.handleAuth.bind(this);
      this.handlePageAuth = this.handlePageAuth.bind(this);
      this.handleDisconnect = this.handleDisconnect.bind(this);
      this.handler = this.handler.bind(this)
      this.handleProfil = this.handleProfil.bind(this)
      this.handleMessage=this.handleMessage.bind(this)

  }

  handleProfil(user){
    //console.log(user)
    this.setState({citoyen:user, page:"profil"})
  }

  handleMessage(user){
    //console.log(user)
    this.setState({citoyen:user, page:"chat"})
  }

  handleAuth(user) {
    this.setState({user:user, isLoggedIn:true, authPage:false});
    (this.state.user.Id_Administrateur===true?this.setState({isAdmin:true}):this.setState({isAdmin:false}))
  }

  handlePageAuth() {
    (this.state.authPage ? this.setState({authPage:false}) : this.setState({authPage:true}))
  }

  handleDisconnect() {
    this.setState({isLoggedIn:false, user:'', isAdmin:false, page:'liste'})
  }

  handler(page) {
    this.setState({
      page: page
    })
  }
  
    render(){

      let page
  
        if(this.state.authPage){
            return (
                <Auth handleAuth={this.handleAuth} handlePageAuth={this.handlePageAuth} />
                    );
        }
        else{

          switch (this.state.page)
          {
            case "command":
              page=<Command/>
              break;
            case "liste":
            
              page=<Publication user={this.state.user.Id_Utilisateur} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>
              break;
              case "citoyens":
            
              page=<Citoyens user={this.state.user.Id_Utilisateur} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} handleProfil={this.handleProfil} handleMessage={this.handleMessage}/>
              break;
              
              case "chat":
              page=<Chat user={this.state.user} citoyen={this.state.citoyen} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} handleProfil={this.handleProfil}/>
              break;

              case "profil":
              page=<Profile user={this.state.user.Id_Utilisateur} citoyen={this.state.citoyen} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>
              break;

          }
            
            return (
                <div>
                  <Head isLoggedIn={this.state.isLoggedIn } handleAuth ={this.handleAuth} user={this.state.user}
                handleDisconnect={this.handleDisconnect} handlePageAuth={this.handlePageAuth} isAdmin={this.state.isAdmin}
                handler={this.handler} handleProfil={this.handleProfil}/>

                {page}
                 </div>
                   );
        
            }
    }
  }
  class Head extends React.Component{
      
    render(){
      
        return <div id = "head" className="header a">
          <div className="header-left"> 
                   
          <button onClick={(this.props.isLoggedIn?this.props.handleDisconnect :this.props.handlePageAuth)}>
            {(this.props.isLoggedIn?'deconnexion':'connexion')}</button>
        </div>
        <div className="header-center">          
          {(this.props.isLoggedIn?
          <button id="profil" Button onClick = {() =>this.props.handleProfil(this.props.user)}>{this.props.user.prenom} {this.props.user.nom}</button>:'')}
        </div>
          
          <div className="header-right">
          
          
          {(this.props.isAdmin?<div>
          <button id="command" Button onClick = {() =>this.props.handler("command")}>command</button>
          <button id="liste" Button onClick = {() =>this.props.handler("liste")}>Liste</button>
          <button id="citoyens" Button onClick = {() =>this.props.handler("citoyens")}>Citoyens</button>
          </div>
          :<div><button id="liste" Button onClick = {() =>this.props.handler("liste")}>Liste</button>
          <button id="citoyens" Button onClick = {() =>this.props.handler("citoyens")}>Citoyens</button></div>)}
      
    </div>
          </div>
    }
          
  }
  export default App;
