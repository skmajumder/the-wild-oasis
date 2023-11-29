import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Button from "./ui/Button";

const StyledApp = styled.div`
  background-color: var(--color-grey-100);
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The wild oasis</Heading>
            <Heading as="h2">This is headline 2</Heading>
          </Row>
          <Row>
            <Heading as="h3">This is headline 3</Heading>
            <Heading as="h4">This is headline 4</Heading>
          </Row>

          <div>
            <Button variation="danger" size="large">
              Button 1
            </Button>
            <Button variation="secondary" size="medium">
              Button 2
            </Button>
            <Button>Button 3</Button>
          </div>
        </Row>
      </StyledApp>
    </>
  );
};

export default App;
