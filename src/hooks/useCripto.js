import React, { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  /* ... */
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  /* ... */
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCripto = (labelTitle, initialState, options) => {
  // state de el hook personalizado
  const [state, setState] = useState(initialState);

  const Component = () => (
    <>
      <Label>{labelTitle}</Label>
      <Select onChange={e => setState(e.target.value)} value={state}>
        <option value="">--Pick one--</option>
        {options.map(option => (
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
            {option.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </>
  );

  return [state, Component, setState];
};

export default useCripto;
