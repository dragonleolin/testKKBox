import React, {useEffect, useState} from "react";
import "./App.css";
import qs from "querystring";
import axios from "axios";

function App() {
  const [token, setToken] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
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
        .then(res=>{
          console.log(1, res.data.access_token);
          let token = res.data.access_token
          setToken(token)
        })
      }, []
  );

  const getSearch = () => {
    console.log(2, token);
    if(token !== undefined){
      axios.get("https://api.kkbox.com/v1.1/search?q=最重要的小事&type=artist,track&territory=TW",
        {
          headers: {
            Authorization: `Bearer ` + token
          }
        }
      )
      .then( res => {
        console.log(3, res);
        let data = res.data
        setSearch(data)
      })
    }
  }
  const getYTData = () => {
    console.log(4, token);
    if(token !== undefined){
      axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAta-bAGIsoa8etmOR7LKYprMhJdSNoRPE&part=snippet&type=video&q=[search]",
        {
          headers: {
            Authorization: `Bearer ` + token
          }
        }
      )
      .then( res => {
        console.log(5, res);
        // setSearch(res.data)
      })
    }
  }

  //youtube API
  // https://www.googleapis.com/youtube/v3/search?key=AIzaSyAta-bAGIsoa8etmOR7LKYprMhJdSNoRPE&part=snippet&type=[type]&q=[search]


  return (
    
    <div className="App">
      <h1>Hello </h1>
      {search}
         {getSearch()}
         {/* <iframe src="https://widget.kkbox.com/v1/?id=4kb3843_WkaL-r3UiM&type=album&terr=SG&lang=en&autoplay=true" allow="autoplay" /> */}
    </div>
  );
}

export default App;
