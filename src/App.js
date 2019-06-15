import React, {Component} from 'react';
import socket from 'socket.io-client';
import './App.sass';
import Vehicle from './components/Vehicle/Vehicle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {vehicles: []};
    this.socket = socket('https://real-time-vehicle-tracking.herokuapp.com/');
  }

  componentDidMount() {
    this.socket.on('initial-data', (vehicles) => {
      this.setState({vehicles})
    });

    this.socket.on('new-vehicle', vehicle => {
      this.setState(prevState => ({vehicles: [...prevState.vehicles, vehicle]}));
    });

    this.socket.on('update', vehicle => {
      const targetIndex = this.state.vehicles.findIndex(v => v.id === vehicle.id);
      if(targetIndex !== -1) {
        const formerVehicles = this.state.vehicles.slice(0, targetIndex);
        const targetVehicle = {...vehicle};
        const laterVehicles = this.state.vehicles.slice(targetIndex + 1, );
        this.setState({vehicles: [...formerVehicles, targetVehicle, ...laterVehicles]});
      }
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="App">
        {
          this.state.vehicles.map((vehicle) => <Vehicle key={vehicle.id} details={vehicle} />)
        }
      </div>
    );
  }
}

export default App;
