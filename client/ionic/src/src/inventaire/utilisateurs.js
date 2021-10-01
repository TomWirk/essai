import React, {Component} from "react";
import axios from 'axios';
import './liste.css'
import Insert from './insert';
import { render } from "react-dom";


const style = {
  height: 50,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class App extends Component {
    constructor(props) {
      super(props);
    this.state = {
      rec:"",
      display:"list"
    };

    this.update=this.update.bind(this)
    this.updated=this.updated.bind(this)
    this.deleteRow=this.deleteRow.bind(this)
    
  }

//Action du bouton Modifier
update(rec){
  if(rec!==""){
    this.setState({
      rec: rec,
      display:'form'
    })
  }
}

//Action du bouton Supprimer
deleteRow(rec){
  if(rec!==""){
    this.setState({
      rec: rec,
      display:'delete'
    })
  }
}

//Action lors de validation et succes de Modification/Supression
updated(){
  this.setState({
    display:'list'
    
  })
}



  render(){

    switch(this.state.display) {
      case 'list':
        return(
          <Liste update={this.update} deleteRow={this.deleteRow} updated={this.updated} isLoggedIn={this.props.isLoggedIn} Iduser={this.props.user} isAdmin={this.props.isAdmin} handleProfil={this.props.handleProfil} handleMessage={this.props.handleMessage}/>
        )
        break;
      case 'form':
        return(
          <Insert artList={this.props.artList} placeProd={this.props.placeProd} placeLog={this.props.placeLog} crud='update' 
          id={this.state.rec.id} 
          comptage={(this.state.rec.COL09===null?"1":"2")}
          operateur={this.state.rec.COL02} 
          atelier={this.state.rec.COL03} 
          zone={this.state.rec.COL04} 
          fiche= {this.state.rec.COL05} 
          adresse={this.state.rec.COL06}
          adresse2={this.state.rec.COL11} 
          codeArticle={this.state.rec.COL07} 
          quantite={(this.state.rec.COL09===null?this.state.rec.COL08:this.state.rec.COL09)}
          validate={this.state.rec.COL10}
          updated={this.updated} />
        )
        break;
        case 'delete':
        return(
          <Delete
          id={this.state.rec.id} 
          comptage={(this.state.rec.COL09===null?"1":"2")}
          date={this.state.rec.COL01} 
          operateur={this.state.rec.COL02} 
          atelier={this.state.rec.COL03} 
          zone={this.state.rec.COL04} 
          fiche= {this.state.rec.COL05} 
          adresse={this.state.rec.COL06}
          adresse2={this.state.rec.COL11} 
          codeArticle={this.state.rec.COL07} 
          quantite={(this.state.rec.COL09===null?this.state.rec.COL08:this.state.rec.COL09)}
          updated={this.updated}
           />
        )
      default:
        // code block
    }

  }
}

class Liste extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    rows: [],
    rowsTot:[],
    comments:[],
    scroll:0,
    columns : ["Auteur", "Contenu"],
    rec:"",
    search:"",
    //obj : [{id:"nom",att:""},{id:"prenom",att:""}],//,{id:"COL03",att:""},{id:"COL04",att:""},{id:"COL05",att:""},{id:"COL06",att:""},{id:"COL07",att:""}],
    //drop:[{id:"COL09",att:""},{id:"COL10",att:""},{id:"COL12",att:""}],
    tableFixHead : { overflowY: "auto", height: window.innerHeight-155+"px", width: "100%"}
  };
  this.selection=this.selection.bind(this)
  }
  componentWillMount() {
    axios.get(`http://localhost:8000/utilisateurs`)
    .then((res) => {
        console.log(res.data)
      this.setState({rows: res.data, rowsTot: res.data});
    })  }

  /*callAPI(){
    //this.callAPI();
    axios.get(`http://prd-svpost03:9000/liste/`)
        .then((res) => {
          console.log(this.state.rows)
        })
  }*/

  addRows = (pub) =>{
    var arr = this.state.rows
    arr.unshift(pub)
    this.setState({rows:arr,rowsTot:arr})
  }

  handleChange = event => {
    //{this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/upadtate/"}
    var obj=this.state.obj
    obj.find(e=>e.id===event.target.name).att=event.target.value.toUpperCase()
    //this.setState({[event.target.name]: event.target.value.toUpperCase()});
    this.setState({obj:obj})
  }

  handleChangeDrop = event => {
    //{this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/upadtate/"}
    var drop=this.state.drop
    drop.find(e=>e.id===event.target.name).att=event.target.value.toUpperCase()
    //this.setState({[event.target.name]: event.target.value.toUpperCase()});
    this.setState({drop:drop})
  }

  filtrer= event =>{

    var filter =(event.target.value).split(' ')
    var users = this.state.rowsTot
    
    users= users.filter(function(item) {
      let filtred = true
      var att = ['nom','prenom','email']
      
          var j = 0
          while (j<filter.length)
          {
            let filtredAtt = false
            var i = 0
              while (i<att.length && !filtredAtt )
              {
                if (item[att[i]] !== undefined && item[att[i]].toLowerCase().startsWith(filter[j].toLowerCase())){
                      filtredAtt = true; att.splice(i,1)}
      
                else{i++}
              }
              if(filtredAtt===false){filtred=false}
              j++
          }
      
        return filtred;
      });
      

    this.setState({rows:users, scroll:0});
  }

   selection(i,index){

    if(this.state.rec!=='')document.getElementById(this.state.rec.Id_Utilisateur).style.backgroundColor=""
    this.setState({rec:i})
    document.getElementById(i.Id_Utilisateur).style.backgroundColor="#777799"
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
<div style={{float: 'right'}}>
      <input style={{marginRight:'50px'}}
          type="text"
          id="header-search"
          placeholder="Search blog posts"
          name="nom"
          onChange = {this.filtrer}
      />
<select name = "COL12" onChange={this.handleChangeDrop}><option  value="">Modifié</option><option  value={true}>oui</option><option value={false}>non</option></select>
<select name = "COL09" onChange={this.handleChangeDrop}><option value="">Comptage</option><option value="1">1</option><option value="2">2</option></select>
<select name = "COL10" onChange={this.handleChangeDrop}><option  value="">Validé</option><option  value={true}>oui</option><option value={false}>non</option></select>

{(this.props.isAdmin?<button style={{backgroundColor:'green'}} Button onClick={()=>this.props.update(this.state.rec)}> modifier</button>
:'')}
{(this.props.isAdmin?<button style={{backgroundColor:'red'}} Button onClick={()=>this.props.deleteRow(this.state.rec)}> supprimer</button>
:'')}
 </div>
  </div>
<div style={this.state.tableFixHead} id ="record" onScroll ={this.fetchMoreData}  >

<div >

  <p>{this.props.user}</p>

  {rows.map((i, index) => (

    
    <div>
      <div className="hover" id ={i.Id_Utilisateur}  style={style} key={index} onClick={()=>this.selection(i,index)}>
      <td><button id="profil" Button onClick = {() =>this.props.handleProfil(i)}>Profil</button></td>
      {(this.props.isLoggedIn?<td><button id="message" Button onClick = {() =>this.props.handleMessage(i)}>Message</button></td>
:'')}
                    <td id = {i.Id_Utilisateur}>{i.prenom} {i.nom}</td>
                     <td id = {i.Id_Utilisateur}>{i.email}</td>           
        </div>
    </div>
          ))}
          
          <p>Chargement...</p>
</div>
</div>
  
</div>

    );
  }
}



class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.id,
      date:this.props.date,
      comptage: this.props.comptage,
      operateur: this.props.operateur,
      atelier:this.props.atelier,
      zone:this.props.zone,
      fiche: this.props.fiche,
      adresse:this.props.adresse,
      adresse2:this.props.adresse2,
      codeArticle:this.props.codeArticle,
      quantite:this.props.quantite,
    }
  
    this.back=this.back.bind(this)
    this.delete=this.delete.bind(this)
  }
  
    back(){
      this.props.updated()
    }

    delete(){
      axios.post("http://prd-svpost03:9000/liste/delete/",  this.state )
      .then(res => {

      if(res.data.success==='success'){
          this.props.updated()
        }
      else{this.setState({
        message:'erreur dans la DB'
      })}
      })
    }

  render(){
    return(
      <div><table>
      <thead >
      <tr>
          <td ><strong>Date</strong><p>{this.state.date}</p><br/></td>
          <td><strong>Opérateur</strong><p>{this.state.operateur}</p></td>
          <td><strong>Atelier</strong><p>{this.state.atelier}</p></td>
          <td><strong>Zone</strong><p>{this.state.zone}</p></td>
          <td><strong>Fiche</strong><p>{this.state.fiche}</p></td>
          <td><strong>Adresse</strong><p>{this.state.adresse}</p></td>
          <td><strong>Article</strong><p>{this.state.codeArticle}</p></td>
          <td><strong>Quantité</strong><p>{this.state.quantite}</p></td>
      </tr>
    </thead></table>
    <button onClick={this.delete}>Supprimer</button><button onClick={this.back}>Annuler</button>
    <p>{this.state.message}</p>
    </div>
    )
  }
  
}

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state={
      Titre:'',Contenu:'',err:'', user:this.props.Iduser}
 
}

/*addRows=(pub)=>{
  this.props.addRows(pub)
}*/

handleChange = event => {
  this.setState({[event.target.name]: event.target.value});
}

handleAdd=(event)=>{
  //this.setState({newAdm:""})
  //event.preventDefault();
    axios.post("http://localhost:8000/publication",  this.state )
  .then(res => {
    if(res.data.success){
      //this.setState({adm:this.state.adm.push(res.data.user)})
      //let joined = this.state.adm.concat(res.data.user).sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.setState({ Contenu:"", Titre:'', err:""})
      this.props.addRows(res.data.pub)
      

    }
    else{
      this.setState({err:res.data.err})
    }
    //this.setState({message:res.data.message, success:res.data.success})

  })


}

render(){
  return(
    <div>
      <input name ='Titre' value = {this.state.Titre} onChange={this.handleChange} placeholder='titre'></input><br/>
      <textarea name ='Contenu' value = {this.state.Contenu} onChange={this.handleChange} placeholder='contenu'></textarea><br/>
      <button  Button onClick={()=>this.handleAdd()} disabled={(this.state.Contenu!==''?false:true)}> Ajouter</button>
      </div>
  )
}
}

class PublishCom extends Component {
  constructor(props) {
    super(props);
    this.state={
      display:false,Id_Publication:this.props.Id_Publication,Contenu:'',err:'', user:this.props.Iduser}
 
}

/*addRows=(pub)=>{
  this.props.addRows(pub)
}*/

handleChange = event => {
  this.setState({[event.target.name]: event.target.value});
}

handleAdd=(event)=>{
  //this.setState({newAdm:""})
  //event.preventDefault();
    axios.post("http://localhost:8000/publicationCom",  this.state )
  .then(res => {
    if(res.data.success){
      //this.setState({adm:this.state.adm.push(res.data.user)})
      //let joined = this.state.adm.concat(res.data.user).sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.setState({ Contenu:"", err:""})
      this.props.addRows(res.data.pub)
      

    }
    else{
      this.setState({err:res.data.err})
    }
    //this.setState({message:res.data.message, success:res.data.success})

  })


}

render(){
  return(
    <div>
      <textarea name ='Contenu' value = {this.state.Contenu} onChange={this.handleChange} placeholder='contenu'></textarea><br/>
      <button  Button onClick={()=>this.handleAdd()} disabled={(this.state.Contenu!==''?false:true)}> Ajouter</button>
      </div>
  )
}
}



export default App;