import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik, FormikErrors } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

import logo from "../../assets/images/carrinhoLogo.png";
import { loginToken } from "../../apiRequests/requestsApi";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  document.title = "Tomas Shopper";

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const validation = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      email: "tomasdc2016@gmail.com",
      password: "1234",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email").email("Invalid email format"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        const token = await loginToken('/login', { email: values.email, password: values.password });
        if (token.token) {
          localStorage.setItem("authUser", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(token.user));
          navigate('/dashboard');
        }
      } catch (error: any) {
        if (error.status !== 200) {
          setError("Email ou senha inválido!");
        }
      }
    }
  });

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div style={{ backgroundColor: '#019d85' }}>
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4"></div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-dark">
                      <div>
                        <span>
                          <img src={logo} alt="Logo" className="" height="80" width="400" style={{ borderRadius: 10 }} />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error && <Alert color="danger">{error}</Alert>}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email}
                          invalid={!!(validation.touched.email && validation.errors.email)}
                        />
                        {validation.touched.email && validation.errors.email && (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Senha</Label>
                        <Input
                          name="password"
                          autoComplete="off"
                          value={validation.values.password}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={!!(validation.touched.password && validation.errors.password)}
                        />
                        {validation.touched.password && validation.errors.password && (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        )}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          style={{ backgroundColor: '#019d85', border: 'none' }}
                          type="submit"
                        >
                          Entrar
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
