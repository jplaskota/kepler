import { styled } from "styled-components";

export const StyledMovieCard = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #dbd9d2;
  padding: 10px;
  border-radius: 10px;
  color: #1c1818;

  & img {
    width: 250px;
    object-fit: cover;
  }
`;

export const Title = styled.span`
  width: 250px;
  font-size: 3rem;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 3rem;
  word-wrap: break-word;
`;

export const Info = styled.span`
  font-size: 1rem;
  font-family: "Fira Sans Extra Condensed", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 1px;
`;

export const InLine = styled.section`
  display: flex;
  gap: 5px;
`;
