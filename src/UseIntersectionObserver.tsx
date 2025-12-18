import { useState, useEffect } from "react";

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const opts: IntersectionObserverInit = {
      threshold: 0.1,
      ...(options || {}),
    };

    const observer = new IntersectionObserver((ioEntries) => {
      ioEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          setEntries((prev) => [...prev, entry]);
          entry.target.classList.add("visible");
        }
      });
    }, opts);

    const elements = document.querySelectorAll(".observe");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options || {})]);

  return entries;
};

export default useIntersectionObserver;
