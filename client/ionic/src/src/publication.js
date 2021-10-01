import React, {Component} from "react";
import Insert from './inventaire/insert';
import Liste from './inventaire/liste'
import axios from 'axios';

import './index.css'

class inventaire extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page:'liste',
        }
    
        this.handler = this.handler.bind(this)
      }

      /*componentWillMount() {
        //this.callAPI();
        axios.get(`http://prd-svpost03:9000/`)
            .then(res => {
              document.getElementById("POST-art").innerHTML=res.data.artList.map(i => '<option value="'+ i+'">'+"</option>")
              for(let i = 0; i<res.data.artList.length;i++){
                this.state.artList.push(res.data.artList[i])
              }
              document.getElementById("POST-Log").innerHTML=res.data.placeLog.map(i => '<option value="'+ i+'">'+"</option>")
              for(let i = 0; i<res.data.placeLog.length;i++){
                this.state.placeLog.push(res.data.placeLog[i])
              }
              document.getElementById("POST-Prod").innerHTML=res.data.placeProd.map(i => '<option value="'+ i+'">'+"</option>")
              for(let i = 0; i<res.data.placeProd.length;i++){
                this.state.placeProd.push(res.data.placeProd[i])
              }
            })
            
      }*/
    
      handler(page) {
        this.setState({
          page: page
        })
      }


    render(){
      let page;
      
      switch (this.state.page)
      {
        case "insersion":
          page=<Insert crud='insert' id=''/>
          break;
        case "liste":
         
          page = <Liste/>
          break;
      }

      return(
        <div>
      {page}
    </div>
      )
    }
}
  

export default inventaire;