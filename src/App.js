import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      timezone: ""
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d";
    axios.get(url).then(resp => {
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name,
        timezone: resp.data.timezone
      });
    });
    var elems = document.querySelectorAll(".modal");
    var instances = window.M.Modal.init(elems);
  }

  searchCity = (e)=>{
    e.preventDefault();
    const city = document.getElementById('city').value;
    console.log(`you are in ${city}`);
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    axios.get(url).then(resp => {
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name,
        timezone: resp.data.timezone
      });
    });
  }

  render() {
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>{this.state.temp}</h1>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#modal1"
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
            <input type="text" id="city" placeholder="Enter a City Name" />
            </form>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>
              High: {this.state.high} - Low: {this.state.low}
            </p>
            <p>
              {this.state.weather} <img src={iconUrl} alt="whether-icon" />
            </p>
            <p>Time now is {this.state.timezone}!</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
