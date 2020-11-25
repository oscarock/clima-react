import React, {Component} from 'react';

import {Container,Row,Col,Navbar} from 'react-bootstrap';

import MapContainer from './components/MapContainer'
import CardsWeather from './components/CardsWeather'

class App extends Component{
  render(){
    return <div>
      <Container>
        <>
          <Navbar bg="light">
            <Navbar.Brand>Paperos del Occidente S.A.</Navbar.Brand>
          </Navbar>
        </><br />
        <h2 style={{textAlign:'center'}}>Condiciones meteorológicas de la finca</h2>
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
