import React from 'react'
import axios from "axios";
import '../style.scss'
class HomeMain extends React.Component{
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
          .then( async (res) => {
            // console.log(7, res.data.data[0].title);
            let hitPlayList = res.data.data
            await this.setState({hitPlayList, token})
            
          })
          .catch(err => {
            console.log(err);
            
        })
        }
      }

    render(){
        let hitPlayList = this.state.hitPlayList
        let createId = 0
        
        return(
            <>
            <div className="homeMain_wrap" style={{cursor: 'pointer' }}>
                <section onClick = {()=>{ 
                    window.location.href="/hitList"
                } }>
                <h2  style={{textAlign: 'center'}}>馬上到熱門歌單聽歌</h2>
                    <div className="playLists">
                        {hitPlayList.map(data => (
                            <div className="item" style={{margin: '20px'}} 
                                onClick={
                                ()=>{
                                    let hitId = data.id
                                    this.setState({hitId})}
                                }
                                key={createId++}
                                >
                                    <img src={data.images[0].url} /> 
                                    <div style={{textAlign: 'center', margin: '20px', fontSize: '18px'}}>
                                        {data.title}
                                    </div>
                            </div>
                            ))
                        } 
                    </div>
                </section>
            </div>
            </>
        )
    }
}


export default HomeMain