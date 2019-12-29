import React from 'react'

class ThemeList extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <>
                <h1>{this.props.token}</h1>
            </>
        )
    }
}


export default ThemeList