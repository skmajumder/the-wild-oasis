import styled, { css } from "styled-components";

const horizontal = css`
  justify-content: space-between;
  align-items: center;
`;

const vertical = css`
  flex-direction: column;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  ${(props) => props.type === "horizontal" && horizontal}
  ${(props) => props.type === "vertical" && vertical}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
