import React, {Component} from 'react';

import {Container,Row,Col} from 'react-bootstrap';

import MapContainer from './components/MapContainer'
import CardsWeather from './components/CardsWeather'

class App extends Component{
  render(){
    return <div>
      <Container>
        <MapContainer />
        <Row>
          <Col xs={6} md={12} style={{marginTop: '400px'}}>
          <CardsWeather />
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default App;
