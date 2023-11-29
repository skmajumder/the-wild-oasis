import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}

   ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.7rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

export default Heading;
