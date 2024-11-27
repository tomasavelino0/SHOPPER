import React, { useState } from "react";
import { Row, FormFeedback, Form, Input } from "reactstrap";

import Header from "../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, ContainerMain } from "./styles";
import { getToken, getUser } from "../../utils/token";
import { postEstimateRide } from "../../apiRequests/requestsApi";
import ListagemCorrida from "../../components/listagemCorrida";

const propis = {
  title: "Nova Corrida",
  text: "Preencha o formulário de criação"
};

const Corrida = (props) => {
  props = propis;
  const navigate = useNavigate();
  const [msgSucess, setMsgSucess] = useState("");
  const [msgError, setMsgError] = useState("");
  const [estimateData, setEstimateData]: any = useState(null);
  const token = getToken();
  const user = getUser();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_id: `${user.id}`,
      origin: "13 de maio, 1312, Dois Córregos",
      destination: "Maria de Lourdes Monteiro Freitas - Dois Córregos",
    },
    validationSchema: Yup.object({
      customer_id: Yup.number().required("customer_id não pode ser vazio!"),
      origin: Yup.string().required("A origem não pode ser vazia!"),
      destination: Yup.string().required("O destino não pode ser vazio!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values, customer_id: Number(user.id) };

        const createEstimateRide = await postEstimateRide(payload, token);

        if (createEstimateRide.status === 200) {
          setMsgSucess("Corrida estimada gerada com sucesso!");
          setEstimateData({ ...createEstimateRide.data, originText: values.origin, destinationText: values.destination });
          resetForm();
        }
      } catch (error) {
        console.log(error);
        setMsgError("Erro ao gerar a corrida, tente novamente!");
      }
    }
  });

  return (
    <React.Fragment>
      <Header />
      <ContainerMain>
        <Container>
          {!estimateData ? (
            <Row>
              <h4>{props.title}</h4>
              <p>{props.text}</p>
              <Form
                style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row className="mb-3">
                  <label htmlFor="customer_id" className="col-md-2 col-form-label">
                    Usuario da sessao
                  </label>
                  <div className="col-md-10">
                    <Input
                      name="customer_id"
                      className="form-control"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.customer_id || ""}
                      invalid={!!(validation.touched.customer_id && validation.errors.customer_id)}
                    />
                    {validation.touched.customer_id && validation.errors.customer_id ? (
                      <FormFeedback>{validation.errors.customer_id}</FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row className="mb-3">
                  <label htmlFor="origin" className="col-md-2 col-form-label">
                    Origem da Viagem
                  </label>
                  <div className="col-md-10">
                    <Input
                      name="origin"
                      className="form-control"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.origin || ""}
                      invalid={!!(validation.touched.origin && validation.errors.origin)}
                    />
                    {validation.touched.origin && validation.errors.origin ? (
                      <FormFeedback>{validation.errors.origin}</FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row className="mb-3">
                  <label htmlFor="destination" className="col-md-2 col-form-label">
                    Destino da Viagem
                  </label>
                  <div className="col-md-10">
                    <Input
                      name="destination"
                      className="form-control"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.destination || ""}
                      invalid={!!(validation.touched.destination && validation.errors.destination)}
                    />
                    {validation.touched.destination && validation.errors.destination ? (
                      <FormFeedback>{validation.errors.destination}</FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <div className="mt-3 d-grid" style={{ display: "flex", justifyContent: "center" }}>
                  {msgSucess && (
                    <FormFeedback style={{ color: "green" }}>
                      {msgSucess}
                    </FormFeedback>
                  )}
                  <button className="btn btn-primary btn-block" type="submit">
                    Estimar Viagem
                  </button>
                  {msgError && (
                    <FormFeedback style={{ color: "red" }}>
                      {msgError}
                    </FormFeedback>
                  )}
                </div>
              </Form>
            </Row>
          ) : (
            <ListagemCorrida {...estimateData} />
          )}
        </Container>
      </ContainerMain>
    </React.Fragment>
  );
};

export default Corrida;
