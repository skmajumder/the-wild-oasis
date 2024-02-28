import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  background-color: rgba(240, 248, 255, 0.534);
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Button</Heading>
              <Button onClick={() => alert("Check In")}>Check In</Button>
              <Button
                variation="danger"
                size="large"
                onClick={() => alert("Check Out")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h2">Form</Heading>
            <div>
              <Input type="text" placeholder="City Name" />
              <Input type="number" placeholder="Total order" />
              <Button>Submit</Button>
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
};

export default App;
