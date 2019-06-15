const URL = 'https://real-time-vehicle-tracking.herokuapp.com'

const headers = {
    'Content-Type': 'application/json'
};

function getRandomInt(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}

function getRandomNumber(min, max) {
    return (max - min) * Math.random() + min;
}

class Simulation {
    constructor() {
        this.vehicles = [];
        this.stopped = [];
        this.offline = [];
    }

    async init() {
        const response = await fetch(URL, { mode: "cors" }).then(res => res.json());
        if (response.status === "SUCCESS") {
            this.vehicles = response.data;
        }
    }

    static getRandomType() {
        const types = ['TRUCK', 'CAR', 'BIKE', 'BUS'];
        return types[getRandomInt(0, types.length)];
    }

    static getRandomLatLng() {
        return getRandomNumber(0, 20).toFixed(4);
    }

    static updatedLatLng(value) {
        const magnitude = getRandomNumber(0.5, 2);
        const probability = Math.random();
        if (probability > 0.5)
            return parseFloat(value + magnitude).toFixed(4);
        return Math.max(0, value - magnitude).toFixed(4);
    }

    async addVehicle() {
        const response = await fetch(`${URL}/add`, {
            method: "PUT",
            mode: "cors",
            headers,
            body: JSON.stringify({
                type: Simulation.getRandomType(),
                lat: Simulation.getRandomLatLng(),
                lng: Simulation.getRandomLatLng(),
                speed: getRandomInt(0, 100)
            })
        }).then(res => res.json());

        if (response.status === "SUCCESS") {
            this.vehicles.push(response.data);
        }
    }

    async update(idx) {
        const { id, speed, lat, lng, type } = this.vehicles[idx];
        if (this.stopped.includes(idx)) {
            return fetch(`${URL}/update/${id}`, {
                method: "POST",
                mode: "cors",
                headers,
                body: JSON.stringify({
                    type,
                    lat,
                    lng,
                    speed
                })
            });
        } else if (this.offline.includes(idx)) {
            return;
        }
        const response = await fetch(`${URL}/update/${id}`, {
            method: "POST",
            mode: "cors",
            headers,
            body: JSON.stringify({
                speed: getRandomInt(0, 100),
                lat: Simulation.updatedLatLng(lat),
                lng: Simulation.updatedLatLng(lng)
            })
        });
        if (response.status === "SUCCESS") {
            this.vehicles[idx] = response.data;
        }
    }

    makeOffline() {
        let idx = getRandomInt(0, this.vehicles.length);
        while (this.stopped.includes(idx) || this.offline.includes(idx)) {
            idx = getRandomInt(0, this.vehicles.length);
        }
        this.offline.push(idx);
    }

    stopMoving() {
        let idx = getRandomInt(0, this.vehicles.length);
        while (this.stopped.includes(idx) || this.offline.includes(idx)) {
            idx = getRandomInt(0, this.vehicles.length);
        }
        this.stopped.push(idx);
    }

    run() {
        // Adding 10 vehicles in interval of 4 seconds.
        const addVehicleInterval = setInterval(() => {
            if (this.vehicles.length === 10) {
                clearInterval(addVehicleInterval);
                return;
            }
            this.addVehicle();
        }, 5000);

        // Update vehicles every 5 seconds.
        setInterval(() => {
            this.vehicles.forEach((v, i) => {
                this.update(i);
            });
        }, 3000);

        // Make 2 vehicles offline & 3 not moving at random
        setTimeout(() => {
            this.makeOffline();
            this.makeOffline();
            this.stopMoving();
            this.stopMoving();
        }, 1000);
    }
}

const simulation = new Simulation();
simulation.init();
simulation.run();