import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faTruck, faBiking, faBus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./Vehicle.sass";

class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {moving: true, offline: false};
        this.offlineTimeout = null;
        this.notMovingTimeout = null;
    }

    update() {
        // debounce the offline and not moving callbacks
        clearTimeout(this.offlineTimeout);
        clearTimeout(this.notMovingTimeout);

        const currentTime = Date.now();
        const {lastMoved, lastUpdated} = this.props.details;

        // Check if the vehicle is offline or not moved.
        if(currentTime - lastUpdated > 60000) {
            this.setState({offline: true});
        } else if(currentTime - lastMoved > 10000) {
            this.setState({moving: false, offline: false});
        } else {
            this.setState({moving: true, offline: false});
        }

        // If we don not get any updates in a stipulated time. We'll invoke these timeout to update the UI
        this.notMovingTimeout = setTimeout(() => {
            this.setState({moving: false});
        }, 10000);

        this.offlineTimeout = setTimeout(() => {
            this.setState({offline: true})
        }, 60000);
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.details.lastUpdated === this.props.details.lastUpdated)
            return;
        this.update();
    }

    componentWillUnmount() {
        clearTimeout(this.offlineTimeout);
        clearTimeout(this.notMovingTimeout);
    }

    getAppropriateIcon() {
        const {type} = this.props.details;
        switch(type) {
            case "BIKE":
                return <FontAwesomeIcon icon={faBiking}/>
            case "TRUCK":
                return <FontAwesomeIcon icon={faTruck} />
            case "BUS":
                return <FontAwesomeIcon icon={faBus} />
            default:
                return <FontAwesomeIcon icon={faCarSide} />
        }
    }

    render() {
        const { id, lat, lng, speed, lastUpdated } = this.props.details;
        const momentObject = moment(lastUpdated);
        return <div className={`${this.state.moving ? 'moving' : 'standing'} ${this.state.offline ? 'offline' : ''} vehicle`}>
            <section>
                <h2 className='section-heading'>Type</h2>
                <h2 className='section-content'>{this.getAppropriateIcon()}</h2>
            </section>
            <section>
                <h2 className='section-heading'>Unique Id</h2>
                <h6 className='section-content very-small'>{id}</h6>
            </section>
            <section>
                <h2 className='section-heading'>Lat.</h2>
                <h2 className='section-content'>{lat}&deg;</h2>
            </section>
            <section>
                <h2 className='section-heading'>Long.</h2>
                <h2 className='section-content'>{lng}&deg;</h2>
            </section>
            <section>
                <h2 className='section-heading'>Speed</h2>
                <h2 className='section-content'>{speed} <span className="small">Kmph</span></h2>
            </section>
            <section>
                <h2 className='section-heading'>Last Updated</h2>
                <h2 className='section-content'>{momentObject.format("hh:mm:ss")} <span className='small'>{momentObject.format('A')}</span></h2>           
            </section>
        </div>;
    }
}

export default Vehicle;