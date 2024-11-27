import React from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { IEstimateCorrida } from './interfacesListagem';
import { useNavigate } from 'react-router-dom';
import { getToken, getUser } from '../../utils/token';
import { IConfirmCorrida, patchConfirmCorrida } from '../../apiRequests/requestsApi';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDA8d8V-QdOiQbxX5BrOyT3wLYy2Ak_zOg';

const ListagemCorrida = (props: IEstimateCorrida) => {
  const { options, origin, destination, distance, duration } = props;
  const navigate = useNavigate();
  const confirmarViagem = async (driverId: number) => {
    const token = getToken();
    const user = getUser();
    const driverOption = options.find((driver) => driver.id === driverId);
    if (!driverOption) {
      console.error('Motorista não encontrado!');
      return;
    }
    console.log({ props });

    const payloadConfirm: IConfirmCorrida = {
      customer_id: Number(user.id),
      origin: props.originText,
      destination: props.destinationText,
      distance,
      duration,
      driver: {
        id: driverOption.id,
        name: driverOption.name,
      },
      value: driverOption.value,
    };
    console.log(payloadConfirm);

    try {
      await patchConfirmCorrida(payloadConfirm, token);
      navigate('/historico');
    } catch (error) {
      console.error('Erro ao confirmar corrida:', error);
    }
  };

  const getStaticMapUrl = (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ) => {
    const originCoordinates = `${origin.latitude},${origin.longitude}`;
    const destinationCoordinates = `${destination.latitude},${destination.longitude}`;

    return `https://maps.googleapis.com/maps/api/staticmap?size=400x300&maptype=roadmap&markers=color:green|label:A|${originCoordinates}&markers=color:red|label:B|${destinationCoordinates}&path=color:blue|weight:5|${originCoordinates}|${destinationCoordinates}&key=${GOOGLE_MAPS_API_KEY}`;
  };

  return (
    <Container>
      <Row>
        <Col md="6" lg="4" className="mb-4">
          <CardTitle tag="h3">Opções de Motoristas</CardTitle>
          <Card style={{ borderRadius: '8px', border: '1px solid #ddd', width: '350px' }}>
            <CardBody>
              <CardTitle tag="h5">Mapa da Rota</CardTitle>
              <CardImg
                src={getStaticMapUrl(origin, destination)}
                alt="Mapa da rota estimada"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {options.map((motorista) => (
          <Col md="6" lg="4" className="mb-4" key={motorista.id}>
            <Card style={{ borderRadius: '8px', border: '1px solid #ddd' }}>
              <CardBody>
                <CardText><strong>Nome:</strong> {motorista.name}</CardText>
                <CardText><strong>Descrição:</strong> {motorista.description}</CardText>
                <CardText><strong>Veículo:</strong> {motorista.vehicle}</CardText>
                <CardText><strong>Avaliação:</strong> {motorista.review.rating} estrelas</CardText>
                <CardText><strong>Comentário:</strong> "{motorista.review.comment}"</CardText>
                <CardText><strong>Valor da Viagem:</strong> R$ {motorista.value.toFixed(2)}</CardText>
                <Button
                  color="primary"
                  block
                  onClick={() => confirmarViagem(motorista.id)}
                >
                  Escolher
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListagemCorrida;
