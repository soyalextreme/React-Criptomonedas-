import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Axios from "axios";
import PropTypes from "prop-types";

//components
import Error from "../components/Error";

// personal hook
import useCoin from "../hooks/useCoin";
import useCripto from "../hooks/useCripto";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #326ac0;
  }
`;

const Form = ({ setCriptom, setMonedad, setSubmit }) => {
  const [criptolist, setCriptolist] = useState([]);
  const [error, setError] = useState(false);

  const coins = [
    { code: "MXN", name: "Moneda Mexicana" },
    { code: "USD", name: "Moneda Estadunidense" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra Esterlina" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const uri =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const result = await Axios.get(uri);
      setCriptolist(result.data.Data);
    };
    fetchData();
  }, []);

  const [coin, SelectCoin, setCoin] = useCoin(
    "Selecciona tu moneda:",
    "",
    coins
  );

  const [cripto, SelectCripto, setCripto] = useCripto(
    "Seleccionar una Criptomoneda",
    "",
    criptolist
  );

  const cleanData = () => {
    setCoin("");
    setCripto("");
  };

  // llamado a la api

  const handleSubmit = e => {
    e.preventDefault();

    // validacion de los campos
    if (coin.trim() === "" || cripto.trim() === "") {
      setError(true);
      setSubmit(false);
      return;
    }
    setError(false);
    setMonedad(coin);
    setCriptom(cripto);
    setSubmit(true);
    cleanData();
  };

  return (
    <>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <form onSubmit={handleSubmit}>
        <SelectCoin />
        <SelectCripto />
        <Button type="submit" title="Buscar" />
      </form>
    </>
  );
};

Form.propTypes = {
  setCriptom: PropTypes.func.isRequired,
  setMonedad: PropTypes.func.isRequired,
  setSubmit: PropTypes.func.isRequired
};

export default Form;
