export function mergeRefs(...refs) {
  return (el) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(el);
      else r.current = el;
    });
  };
}