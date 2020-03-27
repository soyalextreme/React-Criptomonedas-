import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Axios from "axios";
import Result from "./components/Result";
import Spinner from "./components/spinner/Spinner";

const Container = styled.div`
  /* ... */
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    height: 6px;
    width: 100px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  //esatdo
  const [monedad, setMonedad] = useState("");
  const [cripto, setCriptom] = useState("");
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submit) {
      const fetchApi = async () => {
        const URI = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${monedad}`;
        const result = await Axios(URI);
        setLoading(true);
        setInterval(() => {
          setData({ ...result.data.DISPLAY[cripto][monedad] });
          setLoading(false);
          setSubmit(false);
        }, 3000);
      };
      fetchApi();
    }
  }, [submit, cripto, monedad]);

  const result = loading ? <Spinner /> : <Result data={data} />;

  return (
    <Container>
      <div>
        <Image src={require("./cryptomonedas.png")} alt="Image Cripto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form
          setMonedad={setMonedad}
          setCriptom={setCriptom}
          setSubmit={setSubmit}
        />

        {result}
      </div>
    </Container>
  );
}

export default App;
