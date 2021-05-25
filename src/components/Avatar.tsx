import styled from "styled-components";
import { me_me } from "../__generated__/me";

interface lg {
  lg: boolean;
}

const SAvatar = styled.div<lg>`
  width: ${props => (props.lg ? "30px" : "25px")};
  height: ${props => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FC<Partial<me_me & lg>> = ({ avatar = "", lg = false }) => {
  // const Avatar: React.FC<{ avatar?: string | null }> = ({ avatar = "" }) => {
  return (
    <SAvatar lg={lg}>
      {avatar !== "" && avatar !== null ? <Img src={avatar} /> : null}
    </SAvatar>
  );
};
export default Avatar;
