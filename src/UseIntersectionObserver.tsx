import { useState, useEffect } from "react";

const useIntersectionObserver = (options: unknown) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.5) {
            // Trigger at 50% visibility
            setEntries([...entries, entry]);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    const elements = document.querySelectorAll(".observe");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options]);

  return entries;
};

export default useIntersectionObserver;
