import React, {Component} from "react";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: '', rows : [
      "A","B","C","D","E",
      "A","B","C","D","E",
      "A","B","C","D","E",
      "A","B","C","D","E",
      "A","B","C","D","E",
      "A","B","C","D","E",
    ],selectedRow:'', rec:'' };

    this.merde=this.merde.bind(this)
}merde(u,i){
  //console.log(u.u);  console.log(i.i)
  if(this.state.selectedRow!=="")document.querySelector("tbody").querySelectorAll("tr")[this.state.selectedRow].style.backgroundColor=""
  this.state.selectedRow=u
  document.querySelector("tbody").querySelectorAll("tr")[u].style.backgroundColor="red"
  this.state.rec=i
  console.log(this.state.rec)
}
  render(){

    
   
    return (
      
      <div className="App">
        
        {console.log(window.innerHeight)}
        <div class="tableFixHead">
  <table>
    <thead>
      <tr><th>TH 1 <br/><input type="text" list='browsers' /></th><th>TH 2</th></tr>

    </thead>
    <tbody>
      {this.state.rows.map((i, u) => <tr onClick={()=>this.merde(u,i)}><td>{i}1</td><td>{i}2</td></tr>)}
    </tbody>
  </table>
</div>
      </div>
    );
  }
}

export default App;
