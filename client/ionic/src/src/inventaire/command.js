import React, {Component} from "react";
import axios from 'axios';
import Grid from "react-fast-grid";

class command extends Component {
  constructor(props) {
    super(props);
    this.state={
      tableFixHead : { overflowY: "auto", height: window.innerHeight-190+"px", width: "100%",textAlign: "center",},
    adm:[],newAdm:"", delAdm:"", errAdm:""}

    this.handleAdd=this.handleAdd.bind(this)
 
}

componentWillMount() {
  //this.callAPI();
  axios.get(`http://localhost:8000/command/`)
      .then(res => {
        console.log(res.data)
        this.setState({adm:res.data})
        
      })
      
}

handleAdd=(event)=>{
  //this.setState({newAdm:""})
  //event.preventDefault();

  if(this.state.adm.filter(e => e.name === this.state.newAdm).length===0){

    axios.post("http://prd-svpost03:9000/addAdm/",  this.state )
  .then(res => {
    if(res.data.success){
      //this.setState({adm:this.state.adm.push(res.data.user)})
      let joined = this.state.adm.concat(res.data.user).sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.setState({ adm: joined, newAdm:"", errAdm:""})
    }
    else{
      this.setState({errAdm:res.data.err})
    }
    //this.setState({message:res.data.message, success:res.data.success})

  })

  }

  else{
    this.setState({errAdm:'Utilisateur déjà renseigné'})
  }

}

handleDel = id =>event => {
 
  event.preventDefault();

  axios.post("http://prd-svpost03:9000/delAdm/",  {id} )
  .then(res => {
    if(res.data.success){
      //document.getElementById(id).innerHTML=""
      var ind = this.state.adm.indexOf(this.state.adm.filter(e => e.id === id)[0])
      var arr = this.state.adm//.splice(ind, 1);
      arr.splice(ind,1)

      //console.log(ind)

      this.setState({adm:arr})
  
    }
    else{
      document.getElementById(id).querySelector('p').innerHTML=res.data.err
    }
    //this.setState({message:res.data.message, success:res.data.success})

  })
  //{this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/upadtate/"}

}

  handleChange = event => {
    //{this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/upadtate/"}
    //console.log(event.target)
    this.setState({[event.target.name]: event.target.value});
  }


  render() {

    const gen ={
      display: "run-in",
      border: "1px solid black",
      padding: "10px",
      width: "500px",
      textAlign: "center",
      margin: '0 auto',

    }

    return (
       
      <div style={this.state.tableFixHead} >
        
        <h3>Administrateurs</h3>

        <table style={{width:'20%', marginLeft: 'auto',
  marginRight: 'auto',
  borderSpacing:'0px'}}>
    <thead>
        
    </thead>
    <tbody>

      {this.state.adm.map((i, index) => (
            /*<div id ={i.id} style={{display:"inlineBlock"}}> 
            {i.nom} <button>X</button>
            </div>*/

            <tr id={i.id_Utilisateur}>
            <td >{i.nom} {i.prenom}</td>
            <td>{(i.isAdministrateur?"":<button Button onClick={this.handleDel(i.id)}>X</button>)}</td><br/>
            <p></p>
        </tr>
      ))}
        
    </tbody>
</table>
<input name = "newAdm" placeholder ="ajouter admin" value = {this.state.newAdm} onChange={this.handleChange}></input>
<button  Button onClick={()=>this.handleAdd(this.state.comptage)}> Ajouter</button>

  <p>{this.state.errAdm}</p>
        </div>
    )
  }

}



export default command;