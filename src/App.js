import React from "react";
import Nav from './component/Nav'

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        token: "",
      }
    }
    componentDidMount(){
      this.getToken();
    }

    getToken = (token) => {
      this.setState({token})
    }


    render(){
      return (
        <>
          <Nav navToken = { this.getToken.bind(this) }/>
          {/* <h1>{ this.state.token }</h1> */}
        </>
      );
    }
}

export default App;
