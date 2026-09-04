import React from "react";

const advantages = [
  {
    id: 1,
    image: "/images/advantage-1.jpg",
    text: "40+ unique cars for rent from our fleet",
  },
  {
    id: 2,
    image: "/images/advantage-2.jpg",
    text: "Delivery and return of cars in Dubai 24/7",
  },
  {
    id: 3,
    image: "/images/advantage-3.jpg",
    text: "Insurance without a deductible for each car",
  },
  {
    id: 4,
    image: "/images/advantage-4.jpg",
    text: "No video or audio recording in the car",
  },
  {
    id: 5,
    image: "/images/advantage-5.jpg",
    text: "24/7 technical support",
  },
  {
    id: 6,
    image: "/images/advantage-6.jpg",
    text: "All models have a premium package",
  },
];

export default function Advantages() {
  return (
    <section className="advantages-section">
      <h2 className="advantages-title">Advantages</h2>

      <div className="advantages-grid">
        {advantages.map((item) => (
          <article className="advantage-card" key={item.id}>
            <img src={item.image} alt="" />

            <div className="advantage-overlay"></div>

            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}