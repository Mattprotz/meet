import { Component } from "react";

class Alert extends Component {
    constructor(props){
        super(props);
        this.color = null;
        this.bgColor = null;
    }

    getStyle =() =>{
        return{
            color: this.color,
            backgroundColor : this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.color,
            textAlign: "center",
            fontSize: "12px",
            margin: " 10px 0",
            padding: "10px"
        };
    }

    render(){
        return(
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}


class InfoAlert extends Alert{
    constructor(props){
        super(props);
        this.color = 'rgb(0,0,255)';
        this.bgColor = 'rgb(220,220,255)';
    }
}

class WarningAlert extends Component{
    constructor(props){
        super(props);
        this.color = 'orange'
    }
    getStyle = () =>{
        return{
            color: this.color,
        }
    }
    render(){
        return(
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    }
}

class ErrorAlert extends Component{
    constructor(props){
        super(props);
        this.color = 'red'
    }
    getStyle = () =>{
        return{
            color: this.color,
        }
    }
    render(){
        return(
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    }
}

export {Alert, InfoAlert, ErrorAlert, WarningAlert};