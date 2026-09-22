"use client";
export default function movieShortOverview(overview: string, maxLength = 200) {
  if (overview.length < maxLength) {
    return overview;
  }
  return `${overview.slice(0, maxLength)}...`;
}
