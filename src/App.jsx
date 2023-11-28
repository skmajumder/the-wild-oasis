import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
  background-color: var(--color-grey-100);
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The wild oasis</Heading>
        <Heading as="h2">This is headline 2</Heading>
        <Heading as="h3">This is headline 3</Heading>
      </StyledApp>
    </>
  );
};

export default App;
