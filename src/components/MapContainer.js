import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    temp: '',
    temp_max: '',
    temp_min: '',
    pressure: '',
    humidity: '',
    icon: ''
  };

  async componentDidMount(){
    let dataCallApi = {
      appi_url: process.env.REACT_APP_API_URL,
      appi_key: process.env.REACT_APP_API_KEY,
      lat: 6.19780,
      long: -75.719862,
      units: 'metric'
    }
    const res = await fetch(dataCallApi.appi_url + 
      '/data/2.5/weather?lat=' 
      + dataCallApi.lat + '&lon=' + dataCallApi.long 
      + '&appid='+ dataCallApi.appi_key 
      + '&units='+ dataCallApi.units 
    +'')

    const data = await res.json()
    this.setState({
      currentWeather: data,
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      icon: data['weather'][0]['icon']
    })  
  }

  renderIcon = () => {
    let icon = {
      url: process.env.REACT_APP_API_URL_ICON + "/img/wn/"+ this.state.icon + "@2x.png",
      scaledSize: new this.props.google.maps.Size(90, 80)
    };

    return icon
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
    
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  dataWeather = () => {
    return <div>
      <b>Temperatura:</b> {this.state.temp} C&#176;<br/>
      <b>Temp Max:</b> {this.state.temp_max} C&#176;<br/>
      <b>Temp Min:</b> {this.state.temp_min} C&#176;<br/>
      <b>Presion:</b> {this.state.pressure} C&#176;<br/>
      <b>Humedad:</b> {this.state.humidity} C&#176;<br/>
    </div>
  };

  render() {
    return <div>
    <Map
      onClick={this.onMapClicked}
      google={this.props.google}
      style={{width: '80%', height: '60%', position: 'relative'}}
      initialCenter={{
        lat: 6.197803,
        lng: -75.719862
      }}
      zoom={12}>
      <Marker
        onClick={this.onMarkerClick}
        onMouseover={this.onMouseoverMarker}
        position={{lat: 6.197803, lng: -75.719862}}
        icon={this.renderIcon()}
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div>
            {this.dataWeather()}
          </div>
      </InfoWindow>
    </Map>
    </div>
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_API_KEY_MAP)
})(MapContainer)