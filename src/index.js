import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {latitude: null, errorMessage: ''};
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position => {
                this.setState({latitude: position.coords.latitude})
            }),
            (error => {
                this.setState({errorMessage: error.message})
            })
        )
    }

    renderContent() {
        if (this.state.latitude && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.latitude}/>
        } else if (this.state.errorMessage && !this.state.latitude) {
            return <div>Error: {this.state.errorMessage} </div>;
        }
        return <Spinner/>;
    }


    render() {
        return (
            <div>{this.renderContent()}</div>
        );
    }
}


 ReactDOM.render(<App/>, document.querySelector("#root"));

