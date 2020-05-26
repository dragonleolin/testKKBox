import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import qs from "querystring";
import axios from "axios";
import Home from '../pages/Home'
import HomeMain from '../pages/HomeMain'
import ThemeList from '../pages/ThemeList'

class Nav extends React.Component{
    constructor(){
        super()
        this.state = {
          token: '',
        }
      }
      componentDidMount(){
        this.getToken()
      }

      getToken  = ()=>{
        axios.post(
          "/oauth2/token",
          qs.stringify({
            grant_type: "client_credentials",
            client_id: '19d225bcb7a2cadda5e9418952fed522',
            client_secret: '1f8bc06e0a05e1e1a721af6c31e3d340' 
            }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(async res=>{
          console.log(1, res.data.access_token);
          let token = res.data.access_token
          await this.setState({token})
          await this.props.navToken(this.state.token)
        })
      }


    render(){
        return(
            <>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <h2 className="navbar-brand" href="test" onClick={() => {
                        window.location.href = '/'
                      }} style={{cursor: 'pointer' }}>MyKKBOX</h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <h4 className="nav-link" >
                                <Link to="/hitList">
                                   熱門歌單
                                </Link>
                                </h4>
                            </li>
                            <li className="nav-item">
                                <h4 className="nav-link">
                                
                                <Link to="/themeList">
                                    主題歌單
                                </Link>
                                </h4>
                            </li>
                        </ul>
                        {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>
                </nav>
                    <Switch>
                        <Route exact path="/" component={()=><HomeMain token= {this.state.token}/> }/>
                        <Route path="/hitList" component={()=><Home token= {this.state.token}/>}/>
                        <Route exact path="/themeList" component={()=><ThemeList token= {this.state.token}/>}/>
                    </Switch>
                </Router>
            </>
        )
    }
}


export default Nav