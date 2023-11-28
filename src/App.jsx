import styled from "styled-components";

const H1 = styled.h1`
  font-size: 40px;
  text-transform: capitalize;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const StyledApp = styled.div`
  background-color: aliceblue;
  padding: 20px;
`;

const App = () => {
  return (
    <StyledApp>
      <H1>The wild oasis</H1>
    </StyledApp>
  );
};

export default App;
