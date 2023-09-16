import React from "react";
import Card from "react-bootstrap/Card";
import "../Style/movieCard.css";
import { AiFillStar } from "react-icons/ai";
function MovieCard({ img, title, date, id, rate }) {
  return (
    <Card className="movie-card">
      <div className="movie-img">
        <Card.Img variant="top" src={img} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="details">
          <div className="date">{`date released: ${date}`}</div>
          <div className="rate">
            <AiFillStar />
            {` ${rate} /10`}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
