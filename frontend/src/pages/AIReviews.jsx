import { useState } from "react";

function AIReviews() {
  const [review, setReview] = useState("");

  const generateReview = () => {
    setReview(
      "Project structure is good. Consider improving code organization, adding error handling, and optimizing performance."
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        AI Reviews
      </h1>

      <button
        onClick={generateReview}
        className="bg-cyan-500 px-4 py-2 rounded-lg"
      >
        Generate Review
      </button>

      {review && (
        <div className="bg-slate-800 p-6 rounded-xl mt-6">
          <h2 className="text-xl font-bold mb-3">
            AI Feedback
          </h2>

          <p>{review}</p>
        </div>
      )}
    </div>
  );
}

export default AIReviews;