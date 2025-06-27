import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

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
    .oneOf([true], "Vous devez accepter les conditions générales"),
});

const CommentForm = () => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: "",
      acceptConditions: false,
    },
  });

  const onSubmit = (data) => {
    if (!data.acceptConditions) {
      setFormError(
        "Vous devez accepter les conditions générales pour soumettre le formulaire."
      );
      return;
    }
    setFormError("");

    const now = new Date();
    const formattedDate = now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    dispatch(
      addComment({
        id: formattedDate,
        comment: data.comment,
        note: data.note,
      })
    );
    reset();
  };

  return (
    <>
      {formError && <Alert variant="danger">{formError}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Ajouter un commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            {...register("comment")}
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.comment?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Select
            {...register("note")}
            isInvalid={!!errors.note}
            defaultValue=""
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

        <Form.Group className="mb-3" controlId="acceptConditions">
          <Form.Check
            type="checkbox"
            label="J'accepte les conditions générales"
            {...register("acceptConditions")}
            isInvalid={!!errors.acceptConditions}
            feedback={errors.acceptConditions?.message}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" className="mb-3">
          Ajouter
        </Button>
      </Form>
    </>
  );
};

export default CommentForm;
