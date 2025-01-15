import { useState } from "react";
import usePlayerStore from "../../store/playerStore";
import { Rating, Textarea, Button, Stack, Text, Divider } from "@mantine/core";
import styles from "./Feedback.module.scss";


export const Feedback = () => {
    const { currentSource, addReview, addRating, reviews } = usePlayerStore();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating > 0 && comment.trim()) {
            addReview(currentSource, { rating, comment });
            addRating(currentSource, rating);
            setRating(0);
            setComment("");
        }
    };

    return (
        <div className={styles.feedbackContainer}>
            <h4 className={styles.title}>Your Feedback</h4>
            <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                <Stack spacing="md">
                    <div>
                        <Text size="md" weight={500}>
                            Rating:
                        </Text>
                        <Rating value={rating} onChange={setRating} size="lg" count={5} />
                    </div>
                    <div>
                        <Text size="md" weight={500}>
                            Comment:
                        </Text>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your feedback..."
                            autosize
                            minRows={3}
                            maxRows={6}
                        />
                    </div>
                    <Button type="submit" variant="filled" fullWidth>
                        Submit
                    </Button>
                </Stack>
            </form>

            {reviews[currentSource]?.length > 0 && (
                <div className={styles.feedbackList}>
                    <Divider my="md" />
                    <h5>Previous Feedback:</h5>
                    {reviews[currentSource].map((fb, index) => (
                        <div key={index} className={styles.feedbackItem}>
                            <Rating value={fb.rating} readOnly size="sm" count={5} />
                            <Text className={styles.comment}>{fb.comment}</Text>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
