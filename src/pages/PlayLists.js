import React from 'react'
import axios from "axios";
import '../style.scss';

class PlayLists extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            title: '',
            YTName: '',
            playYTData: '',
            allSong:[],
            YTData: []
        }

    }
    componentDidMount(){
            this.getInitData()
    }

    getInitData = async() => {
        let token = this.props.token
        let charId = this.props.hitId
        console.log(12, token);
        await axios.get(`https://api.kkbox.com/v1.1/charts/${charId}?territory=TW`,
            {
              headers: {
                Authorization: `Bearer ` + token
              }
            }
          )
          .then( async(res) => {
            console.log(13, res.data.tracks.data[0].name);
            // let str = res.data.tracks.data[0].name
            // let strArr = str.split(' ')
            let YTName = res.data.tracks.data[0].name
            let allSong = res.data.tracks.data
            await this.setState({
              title: res.data.title,
              allSong,
              YTName
            })
            await this.getYTData()
          })
    }

    getYTData = () => {
        let name= this.state.YTName
        console.log(4, name);
        // youtubeKeyMain: AIzaSyCqiOvXgeO9u7AbLly294jjoZwZ3PFVKDs
        // youtubeKey: AIzaSyDqvzY_cP4_ZI5lKpnWrDWZZu6Gm2PzK74
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCqiOvXgeO9u7AbLly294jjoZwZ3PFVKDs&part=snippet&type=video&q=${name}`)
          .then( res => {
            console.log(5, res.data);
            let playYTData = res.data.items[0].id.videoId
            let YTData = res.data
            this.setState({playYTData, YTData})
          })
          .catch(err => {
              console.log(err);
              
          })
      }



    render(){
        let playYTData = this.state.playYTData
        let allSong = this.state.allSong
        let YTData = this.state.YTData
        let createId = 0
        console.log(123, playYTData);
        console.log(124, YTData.items && YTData.items[0].snippet.title);
       
        return (
            <>
                <div className="playLists container-fluid">
                    <div className="row">
                        <div className="playContent col-md-8 col-12 d-flex justify-content-start flex-column">
                            <iframe src={`https://www.youtube.com/embed/${playYTData}`}
                                style={{minHeight: '600px',weight: '100vw'}}
                            />
                            <div className="playText">
                                <h3>{YTData.items && YTData.items[0].snippet.title}</h3>
                                <h4>{YTData.items && YTData.items[0].snippet.description}</h4>
                            </div> 
                        </div>
                        <div className="col-md-4 col-12 ">
                            <div style={{ margin: '5px', overflowY: 'scroll', 
                            height: '700px'}}>
                            <h2>{this.state.title}</h2>
                                    {
                                        allSong.map(data=>(
                                            <div className="row"
                                                style={{ margin: '5px', cursor: 'pointer'}}
                                                onClick={ async()=>{
                                                    let YTName = data.name
                                                    await this.setState({YTName})
                                                    await this.getYTData()
                                                }}
                                                key={createId++}
                                            >
                                        <img src={data.album.images[0].url}
                                        style={{width:'80px', height: '80px'}}/>
                                        <div className="col">
                                            <h4>{data.name}</h4>
                                            <h4>{data.album.artist.name}</h4>
                                        </div>
                                    </div>
                                        ))
                                    }
                                    </div>      
                        
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default PlayLists 