export default function randIntBetween(from, to) {
  return from + Math.round(Math.random() * (to - from));
}
