import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Alert } from "react-bootstrap";
import { deleteComment } from "../redux/commentSlice";

const CommentList = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  if (!comments || comments.length === 0) {
    return <Alert variant="info">Aucun commentaire pour le moment</Alert>;
  }

  return (
    <ListGroup>
      {comments.map((c) => (
        <ListGroup.Item
          key={c.id}
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <div className="fw-bold mb-1">Note : {c.note}/5</div>
            <div>{c.comment}</div>
            {c.date && (
              <div className="text-muted small mt-1">Posté le : {c.date}</div>
            )}
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(deleteComment(c.id))}
          >
            Supprimer
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
