import React from "react";

const reviewItems = [
  {
    id: 1,
    image: "/images/review-1.jpg",
    alt: "Review 1",
  },
  {
    id: 2,
    image: "/images/review-2.jpg",
    alt: "Review 2",
    video: true,
  },
  {
    id: 3,
    image: "/images/review-3.jpg",
    alt: "Review 3",
  },
  {
    id: 4,
    image: "/images/review-4.jpg",
    alt: "Review 4",
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reviews</h2>

      <div className="reviews-grid">
        {reviewItems.map((item) => (
          <div className="review-card" key={item.id}>
            <img src={item.image} alt={item.alt} />

            {item.video && (
              <button
                className="play-button"
                type="button"
                aria-label="Play video"
              >
                <span></span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}