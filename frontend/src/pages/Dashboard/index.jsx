import React, { useState } from "react";
import { Row } from "reactstrap";
import Header from '../../components/Header'
import { getUser } from '../../utils/token'

const Dashboard = (props) => {
  const user = getUser();

  return (
    <div>
      <Row className="mb-3">
        <Header />
      </Row>
    </div>
  );
};

export default Dashboard;
