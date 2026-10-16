"use client";
import { useEffect, useState } from "react";

/**
 * matchMedia as state, and it keeps listening. Reading it once on mount is not enough: a tab that mounts while
 * hidden or zero-width reports min-width queries as false and the heavy layer never turns on.
 */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}
