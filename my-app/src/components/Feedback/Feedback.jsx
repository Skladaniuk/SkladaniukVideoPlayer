import React, { useState } from 'react';

const Feedback = ({ video }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Feedback for ${video}: Rating: ${rating}, Comment: ${comment}`);
    };

    return (
        <div>
            <h4>Feedback</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        min="1"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <label>
                    Comment:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;