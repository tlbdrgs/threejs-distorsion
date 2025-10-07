const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));

let scrollPercent = 0; // 0...100

function updateScrollPercent() {
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = doc.scrollTop || body.scrollTop || 0;
    const full = (doc.scrollHeight || body.scrollHeight || 0) - doc.clientHeight;

    scrollPercent = full > 0? (scrollTop / full) * 100 : 0;

    console.log(scrollPercent)
}

window.addEventListener('scroll', updateScrollPercent, { passive: true });
window.addEventListener('resize', updateScrollPercent, { passive: true });
updateScrollPercent();

export default function scrollProgress(start = 0, end = 100, smooth = 0) {
  const denom = end - start || 1;
  const target = clamp((scrollPercent - start) / denom, 0, 1) * 100; // 0..100
  if (smooth > 0) {
    if (typeof scrollProgress._v !== 'number') scrollProgress._v = target; // fix
    scrollProgress._v += (target - scrollProgress._v) * smooth;
    return scrollProgress._v;
  }
  return target;
}