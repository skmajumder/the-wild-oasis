import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 34px;
  font-weight: 600;
  text-transform: capitalize;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const StyledApp = styled.div({
  "background-color": "aliceblue",
  padding: "20px",
  "box-shadow": "2px 2px 2px rgba(0, 0, 0, 0.018)",
});

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
      </StyledApp>
    </>
  );
};

export default App;
