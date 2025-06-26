import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "./redux/commentSlice";
import CommentForm from "./components/CommentForm";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

const App = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/random/1")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMovie(data[0]);
        } else {
          throw new Error("Réponse API inattendue");
        }
      })
      .catch((err) => console.error("Erreur lors du chargement du film :", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {loading ? (
            <p>Chargement en cours...</p>
          ) : movie ? (
            <Card className="mb-4">
              {movie.poster_path && (
                <Card.Img
                  variant="top"
                  src={movie.poster_path}
                  alt={movie.original_title}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Date de sortie : {movie.release_date}
                </Card.Subtitle>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Text>
                  Note moyenne : {movie.vote_average} ({movie.vote_count})
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p>Pas de film disponible</p>
          )}

          <h4>Commentaires</h4>
          <CommentForm />

          {comments.length === 0 ? (
            <Alert variant="primary">Aucun commentaire pour le moment</Alert>
          ) : (
            comments.map((c) => (
              <Card key={c.id} className="mb-2">
                <Card.Body>
                  <p className="mb-2 text-dark fw-bold">Note : {c.note}/5</p>
                  <Card.Text>{c.comment}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(deleteComment(c.id))}
                    >
                      Supprimer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
