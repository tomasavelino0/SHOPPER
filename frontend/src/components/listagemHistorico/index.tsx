import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Input, FormGroup, Label, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getToken, getUser } from '../../utils/token';
import { getHistoricoCorrida, getHistoricoCorridaWithDriverQuery } from '../../apiRequests/requestsApi';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const HistoricoCorridas = () => {
  const [driverFilter, setDriverFilter] = useState('todos');
  const [rides, setRides] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [msgError, setMsgError] = useState('');
  const user = getUser()
  const customerId = user.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchRidesHistoryData();
    }
  }, [driverFilter]);


  const fetchRidesHistoryData = async () => {
    const token = getToken();
    try {
      let response;
      if (driverFilter && driverFilter !== 'todos') {
        const responseWithouQuery = await getHistoricoCorridaWithDriverQuery(token, driverFilter, customerId);
        response = responseWithouQuery
      } else {
        const responseWithouQuery = await getHistoricoCorrida(token, customerId);
        response = responseWithouQuery
      }

      if (response.status === 200) {
        setRides(response.data.rides);
      } else {
        setMsgError('Erro ao carregar o histórico de corridas.');
      }
    } catch (error) {
      setMsgError('Erro ao carregar o histórico de corridas.');
      console.error(error);
    }
  };

  const fetchDrivers = async () => {
    const token = getToken();
    const responseWithouQuery = await getHistoricoCorrida(token, customerId);
    const uniqueDrivers = responseWithouQuery.data.rides.reduce((acc, ride) => {
      if (!acc.some(driver => driver.id === ride.driver.id)) {
        acc.push(ride.driver);
      }
      return acc;
    }, []);
    setDrivers(uniqueDrivers)
  }

  const handleFilterApply = () => {
    if (customerId) {
      fetchRidesHistoryData();
    } else {
      setMsgError('Por favor, insira um ID de usuário.');
    }
  };

  useEffect(() => {
    if (rides) {
      fetchDrivers();
    }
  }, [])

  return (
    <Container>
      <Header />
      <Row>
        <Col md="12">
          <h3>Histórico de Viagens</h3>
          <Form>
            <FormGroup row>
              <Label for="customer_id" sm={2}>
                ID do Usuário
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="customer_id"
                  id="customer_id"
                  value={user.id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="driver_filter" sm={2}>
                Seletor de Motorista
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="driver_filter"
                  id="driver_filter"
                  value={driverFilter}
                  onChange={(e) => setDriverFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id.toString()}>
                      {driver.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <Button color="primary" onClick={handleFilterApply}>
              Aplicar Filtro
            </Button>
            <Button style={{ marginLeft: '20px' }} color="primary" onClick={() => navigate('/corrida')}>
              Criar nova corrida!
            </Button>
          </Form>

          {msgError && <p style={{ color: 'red' }}>{msgError}</p>}

          {rides.length > 0 ? (
            <Row className="mt-4">
              {rides.map((ride) => (
                <Col md="6" key={ride.id} className="mb-4">
                  <Card style={{ borderRadius: '8px', border: '1px solid #ddd' }}>
                    <CardBody>
                      <CardTitle tag="h5">Viagem - {new Date(ride.date).toLocaleString()}</CardTitle>
                      <CardText>
                        <strong>Motorista:</strong> {ride.driver.name}
                      </CardText>
                      <CardText>
                        <strong>Origem:</strong> {ride.origin}
                      </CardText>
                      <CardText>
                        <strong>Destino:</strong> {ride.destination}
                      </CardText>
                      <CardText>
                        <strong>Distância:</strong> {ride.distance} km
                      </CardText>
                      <CardText>
                        <strong>Tempo:</strong> {ride.duration}
                      </CardText>
                      <CardText>
                        <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p style={{ color: 'gray' }}>Nenhuma viagem encontrada para este usuário.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HistoricoCorridas;
