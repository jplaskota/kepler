import Masonry from "react-masonry-css";
import { styled } from "styled-components";

export const StyledContentList = styled(Masonry)`
  height: fit-content;
  width: fit-content;
  display: flex;
  gap: 20px;

  div {
    margin-bottom: 20px;
  }
`;
