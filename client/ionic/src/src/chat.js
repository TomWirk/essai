import React, {Component} from "react";
import axios from 'axios';
import { render } from "react-dom";
import socketClient from "socket.io-client";

const SERVER = "http://localhost:8000";

const style = {
    height: 50,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
  
  var socket; 
class App extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
      rows: [],
      rowsTot:[],
      scroll:0,
      user: this.props.user,
      citoyen : this.props.citoyen,
      message:'',err:'', user:this.props.user,socket: null,
      tableFixHead : { overflowY: "auto", height: window.innerHeight-200+"px", width: "100%"}
    };
    this.addRows=this.addRows.bind(this)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
      }

      componentWillMount() {
        axios.post(`http://localhost:8000/chat`,this.state)
        .then((res) => {
            console.log(res.data)
          this.setState({rows: res.data, rowsTot: res.data});
        })  }

    componentDidMount() {
        //this.setState({rows: speak, rowsTot: speak});
        socket=socketClient.connect(SERVER);
        socket.on('channel', (pub) => {
            this.addRows(pub)
        });
        this.setState({socket:socket})
        return () => socket.disconnect()
      }//)  }

    componentWillUnmount(){
      socket.off("channel");
    }
  
      addRows(pub) {
        var arr = this.state.rows
        arr.unshift(pub)
        this.setState({rows:arr,rowsTot:arr})
      }
  
      handleAdd=event=>{
  
        var socket=this.state.socket
        socket.emit('message', this.state.user, this.state.citoyen, this.state.message);
        
      }
  
    fetchMoreData = () => {
    
      let x = document.getElementById("record")
  
  
      if(x.scrollHeight==x.scrollTop+x.clientHeight){
        if(this.state.rows.slice(0, 20*this.state.scroll+20).length!==this.state.rows.length){
    
        setTimeout(() => {
          this.setState({
            scroll:this.state.scroll+1,
          });
        }, 1000);
      }else{
        x.querySelector('p').innerHTML=null
      }
    }
  
  }
  
    render() {
        const scroll = this.state.scroll
        const rows = this.state.rows.slice(0, 20*scroll+20)
        const columns = this.state.columns
  
      return (
          
  <div id="list"><div className="crud">
  <div style={{float: 'left', color:'white'}}><p><strong>{this.state.rows.length}</strong> enregistrements</p>
  </div>
    </div>
    <textarea name ='message' value = {this.state.message} onChange={this.handleChange} placeholder='contenu'></textarea><br/>
        <button  Button onClick={this.handleAdd} disabled={(this.state.Contenu!==''?false:true)}> Ajouter</button>
  <div style={this.state.tableFixHead} id ="record" onScroll ={this.fetchMoreData}  >
  
  <div >
    
    {rows.map((i, index) => (
  
      
        <div className="hover" style={style} key={index}>
                      {i.prenom} {i.nom}<br/>
                       {i.contenu}         
          </div>
            ))}
            
            <p>Chargement...</p>
  </div>
  </div>
  </div>
  
      );
    }
  }


export default App;