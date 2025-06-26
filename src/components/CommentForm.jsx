import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";

const schema = yup.object({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire")
    .max(500, "Le commentaire ne peut pas dépasser 500 caractères"),
  note: yup
    .number()
    .typeError("Veuillez sélectionner une note")
    .required("Veuillez sélectionner une note")
    .min(1, "Veuillez sélectionner une note")
    .max(5, "Veuillez sélectionner une note"),
  acceptConditions: yup
    .bool()
    .required("Vous devez accepter les conditions générales")
    .oneOf([true], "Vous devez accepter les conditions générales"),
});

const CommentForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      addComment({
        id: Date.now(),
        comment: data.comment,
        note: data.note,
      })
    );
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Commentaire */}
      <Form.Group className="mb-3">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          {...register("comment")}
          isInvalid={!!errors.comment}
        />
        <Form.Control.Feedback type="invalid">
          {errors.comment?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Note */}
      <Form.Group className="mb-3">
        <Form.Label>Note</Form.Label>
        <Form.Select
          defaultValue=""
          {...register("note")}
          isInvalid={!!errors.note}
        >
          <option value="" disabled>
            Sélectionner une note
          </option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Conditions */}
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="J'accepte les conditions générales"
          {...register("acceptConditions")}
          isInvalid={!!errors.acceptConditions}
        />
        <Form.Control.Feedback type="invalid">
          {errors.acceptConditions?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="mb-3">
        Ajouter
      </Button>
    </Form>
  );
};

export default CommentForm;
