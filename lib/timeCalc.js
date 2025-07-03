export default function formatTimeAgo(ms) {
  const diff = Date.now() - ms;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (day < 1) {
    if (hr >= 1) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
    if (min >= 1) return `${min} minute${min > 1 ? "s" : ""} ago`;
    return "Just now";
  }
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  if (day < 30) {
    const wk = Math.floor(day / 7);
    return `${wk} week${wk > 1 ? "s" : ""} ago`;
  }
  const d = new Date(ms);
  return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
}
