import PropTypes from "prop-types";
import { styled } from "styled-components";

const StyledMovieCard = styled.div`
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
  font-size: 3rem;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 3rem;
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

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.any,
  date: PropTypes.string.isRequired,
  running: PropTypes.string,
  director: PropTypes.string,
};

export default MovieCard;
