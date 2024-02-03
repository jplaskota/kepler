import { styled } from "styled-components";

const StyledMovieCard = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  background-color: #dbd9d2;
  padding: 10px;
  border-radius: 10px;
  color: #1c1818;

  & img {
    width: 250px;
    object-fit: cover;
  }
`;

const Title = styled.span`
  width: 250px;
  font-size: 3rem;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 3rem;
  word-wrap: break-word;
`;

const Info = styled.span`
  font-size: 1rem;
  font-family: "Fira Sans Extra Condensed", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 1px;
`;

const InLine = styled.div`
  display: flex;
  gap: 5px;
`;

function MovieCard({ title, img, date, running, director }) {
  return (
    <StyledMovieCard>
      <img src={img} alt="poster" />
      <Title>{title}</Title>
      <InLine>
        <Info>[ {date} ]</Info>
        <Info>[ {running} ]</Info>
      </InLine>
      <Info>{director}</Info>
    </StyledMovieCard>
  );
}

export default MovieCard;
