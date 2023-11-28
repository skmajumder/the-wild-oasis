import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 40px;
  color: var(--color-brand-700);
  text-transform: capitalize;
  font-weight: 600;
`;

const StyledApp = styled.div`
  background-color: var(--color-grey-100);
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The wild oasis</H1>
      </StyledApp>
    </>
  );
};

export default App;
