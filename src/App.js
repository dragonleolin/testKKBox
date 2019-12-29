import React from "react";
import Nav from './component/Nav'
import {Route} from 'react-router-dom'
import Home from './pages/Home'
import ThemeList from './pages/ThemeList'

class App extends React.Component {

    render(){
      return (
        <>
          <Nav />
          {/* <Home/> */}
          <Route exact path='/' component={Home}/>
          {/* <Route path='/hitList' component={Home}/> */}
          <Route path='/themeList' component={ThemeList}/>
        </>
      );
    }
}

export default App;
