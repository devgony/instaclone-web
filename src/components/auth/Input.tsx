import styled from "styled-components";
// : React.FC<{ hasError: boolean }>
const Input = styled.input<{ hasError?: boolean }>`
  color: rgb(38, 38, 38);
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${props => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

// const Input: React.FC<{ type: string; placeholder: string }> = props => {
//   return <SInput {...props} />;
// };

export default Input;
