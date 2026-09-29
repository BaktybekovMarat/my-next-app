"use client";
export default function getRatingColor(movieRating: number) {
  if (movieRating < 3) return "#E90000";
  if (movieRating > 3 && movieRating <= 5) return "#E97E00";
  if (movieRating > 5 && movieRating <= 7) return "#E9D100";
  if (movieRating > 7) return "#66E900";
}
