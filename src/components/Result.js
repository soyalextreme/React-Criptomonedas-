import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

// components styled
const Container = styled.div`
  /* ... */
  color: #fff;
  font-family: "Bebas Neue", cursive;
  text-align: center;
`;

const InfoExtra = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;

const Price = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
  }
`;

const Result = ({ data }) => {
  let Content = (
    <>
      <Container>
        <Price>
          El precio es: <span>{data.PRICE}</span>
        </Price>
        <InfoExtra>
          Precio Mas alto del dia: <span>{data.HIGHDAY}</span>
        </InfoExtra>
        <InfoExtra>
          El precio mas bajo del dia: <span>{data.LOWDAY}</span>
        </InfoExtra>
        <InfoExtra>
          Variacion Ultimas 24hrs: <span>{data.CHANGEPCT24HOUR}</span>
        </InfoExtra>
        <InfoExtra>
          Ultima Actualizacion: <span>{data.LASTUPDATE}</span>
        </InfoExtra>
      </Container>
    </>
  );

  return <>{Object.keys(data).length === 0 ? null : Content}</>;
};

Result.propTypes = {
  data: PropTypes.object.isRequired
};

export default Result;
