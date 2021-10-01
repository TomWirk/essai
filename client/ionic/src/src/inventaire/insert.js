import React, {Component} from "react";
import axios from 'axios';
import Grid from "react-fast-grid";

const styles = {
  outer: {

    borderRadius: 5,
    boxShadow: "0 10px 320px #BBB",
    padding: 10,
    margin: 10
  },
};


class insert extends Component {
  constructor(props) {
    super(props);
  this.state = {
    crud:this.props.crud,
    success:'',
    message:'',
    id:this.props.id,
    
  }
  this.back=this.back.bind(this)
}

  back(){
    this.props.updated()
  }

  handleChange = event => {
    //{this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/upadtate/"}

    this.setState({[event.target.name]: event.target.value.toUpperCase()});

  }

  handleSubmit = event => {
    event.preventDefault();

    
      axios.post((this.state.crud=='insert'? "http://prd-svpost03:9000/":"http://prd-svpost03:9000/liste/update/"),  this.state )
      .then(res => {
        console.log(res.data.message)
        this.setState({message:res.data.message, success:res.data.success})

      if(this.state.success==='success'){

        if(this.state.crud!=="insert"){
          this.props.updated()
        }

        this.setState({adresse: '',
        adresse2: '',
        codeArticle: '',
        quantite: '' })

        }
      })
    
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

    let validate;
      
      switch (this.state.crud)
      {
        case "insert":
         validate= <button onClick='this.form.submit()'>Insérer</button>
          break;
        case "update":
         
          validate= <div><button onClick='this.form.submit()'>Modifier</button> <button onClick={this.back}>Annuler</button></div>
          break;
      }

    return (
      
      <div>
<form onSubmit={this.handleSubmit}>     
<input style={{width:'100%'}} placeholder = "Souhaitez-vous publier quelque chose ?"></input><br/>
{validate}

        </form>
        <Recorded id ="recorded" success={this.state.success} message = {this.state.message}/>
        </div>
    )
  }
}

function Recorded(props) {

  const success = props.success;
  const message = props.message

  if(success !==""){
    if (success==='success') {
      return <p><strong> Emplacement : </strong>{message[0]};<strong> Référence : </strong>{message[2]};<strong> quantité : </strong>{message[3]}</p>;
    }
    else if(success==='fail'){return <p>Erreur dans la DB</p>;
  }
    
}
  else{
    return null
  }
}

export default insert;