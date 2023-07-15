import { useEffect, useRef, useState } from "react";

const useIntersectedViewport = (options?: IntersectionObserverInit) => {
  // only get image url after the component is or has intersected viewport
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setHasIntersected(true);
      observer.disconnect();
    }, options);
    observer.observe(ref.current);
  }, []);

  return { ref, hasIntersected };
};

export default useIntersectedViewport;
