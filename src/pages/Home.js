import React from 'react'
import axios from "axios";
import { Route, Link, Switch } from 'react-router-dom'
import PlayLists from './PlayLists'
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          token: '',
          searchData: [],
          YTName: '',
          playYTData: '',
          hitPlayList: [],
          hitId: '',
        }
      }
      componentDidMount(){
        this.getNewHitPlayLists()
      }
  
   
  
  
  
      //  getSearch = async()=>{
      //   // console.log(2, this.state.token);
      //   let token =  this.state.token
      //   if(token !== undefined){
      //     await axios.get("https://api.kkbox.com/v1.1/search?q=五月天&type=artist,track&territory=TW",
      //       {
      //         headers: {
      //           Authorization: `Bearer ` + token
      //         }
      //       }
      //     )
      //     .then( res => {
      //       // console.log(3, res.data);
      //       this.setState({
      //         searchData: res.data,
      //         YTName: res.data.tracks.data[0].name
      //       })
      //     })
      //   }
      // }

      getNewHitPlayLists = async()=>{
        let token =  this.props.token
        console.log(6,token);
        if(token !== undefined){
          await axios.get("https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW",
            {
              headers: {
                Authorization: `Bearer ` + token
              }
            }
          )
          .then( res => {
            // console.log(7, res.data.data[0].title);
            let hitPlayList = res.data.data
            this.setState({hitPlayList, token})
          })
          .catch(err => {
            console.log(err);
            
        })
        }
      }

      //youtube聯結
      //https://www.youtube.com/embed/e0k-EM6zJ10
  

    render(){
        // console.log(6, this.state.playYTData);
        console.log(8, this.state.hitPlayList);
        let hitPlayList = this.state.hitPlayList
        let createId = 0
        return(
            <>
              <section>
              <h2  style={{textAlign: 'center', margin: '20px'}}>KKBOX OPEN API 熱門歌單</h2>
                  <div className="row d-flex flex-row justify-content-center">
                      {hitPlayList.map(data => (
                          <div className="col-md-3.col-6" style={{margin: '20px'}} 
                            onClick={
                              ()=>{
                                let hitId = data.id
                                this.setState({hitId})}
                            }
                            key={createId++}
                            >
                              <Link to="/hitList/PlayLists"  >
                                <img src={data.images[0].url} /> 
                                <div style={{textAlign: 'center', margin: '20px', fontSize: '18px'}}>
                                    {data.title}
                                </div>
                              </Link>
                          </div>
                          ))
                      } 
                  </div>
              </section>
            

              <Switch>
                <Route path="/hitList/PlayLists" component={()=><PlayLists 
                hitId = {this.state.hitId }
                token = {this.state.token}
                />}/>
              </Switch>

            </>    
        )
    }
}


export default Home