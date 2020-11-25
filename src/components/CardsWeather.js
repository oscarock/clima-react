import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Card} from 'react-bootstrap';

export default class CardsWeather extends Component {

  state = {
    list: []
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
      '/data/2.5/onecall?lat=' 
      + dataCallApi.lat + '&lon=' + dataCallApi.long 
      + '&appid='+ dataCallApi.appi_key 
      + '&exclude=current,minutely,hourly,alerts'
      + '&units='+ dataCallApi.units 
    +'')
    const data = await res.json()

    this.setState({
      list: data.daily,
    })  
  }

  renderIcon = (CardIcon) => {
    let icon = process.env.REACT_APP_API_URL_ICON + "/img/wn/"+ CardIcon + "@2x.png"
    return icon
 }

  render() {
    return (
      <div>
        <Container>
          <h1 style={{textAlign:'center'}}>Promedio del clima ultimos 8 dias</h1>
          <Row>
            {
              this.state.list.map(card => {
                return (
                  <div>
                    <Card style={{ width: '15rem'}}>
                      <Card.Body>
                        <Card.Text>
                          <img src={this.renderIcon(card['weather'][0]['icon'])}></img><br/>
                          <b>Temperatura:</b> {card.temp.day} C&#176;<br />
                          <b>Presion:</b> {card.pressure} C&#176;<br/>
                          <b>Humedad:</b> {card.humidity} C&#176;<br/>
                          <b>Velo del Aire:</b> {card.wind_speed} Km<br/>
                        </Card.Text>
                      </Card.Body>
                    </Card> 
                  </div>
                )
              })
            }   
          </Row>
        </Container> 
      </div>
    )
  }
}