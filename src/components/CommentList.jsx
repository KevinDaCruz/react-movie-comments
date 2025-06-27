import { useDispatch } from "react-redux";
import { Card, Button, Alert } from "react-bootstrap";
import { deleteComment } from "../redux/commentSlice";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  if (!comments || comments.length === 0) {
    return <Alert variant="info">Aucun commentaire pour le moment</Alert>;
  }

  return (
    <>
      {comments.map((c) => (
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
      ))}
    </>
  );
};

export default CommentList;
