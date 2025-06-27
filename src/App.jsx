import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "./App.css";

import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

const App = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch("https://jsonfakery.com/movies/random/1");
        if (!res.ok) throw new Error(`Échec du chargement : ${res.status}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Aucun film trouvé dans la réponse API");
        }

        setMovie(data[0]);
      } catch (err) {
        console.error("Erreur lors du chargement du film :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <p>Chargement en cours...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger">Erreur : {error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <p>Pas de film disponible</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4">
            {movie.poster_path && (
              <Card.Img
                variant="top"
                src={movie.poster_path}
                alt={movie.original_title}
                className="movie-poster"
              />
            )}
            <Card.Body>
              <Card.Title>{movie.original_title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Sortie le {" "}
                {new Date(movie.release_date).toLocaleDateString("fr-FR")}
              </Card.Subtitle>
              <Card.Text>{movie.overview}</Card.Text>
              <Card.Text>
                Note moyenne : {movie.vote_average} ({movie.vote_count})
              </Card.Text>
            </Card.Body>
          </Card>

          <h4>Commentaires</h4>
          <CommentForm />

          <CommentList comments={comments} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
