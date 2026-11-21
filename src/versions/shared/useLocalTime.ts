import { useEffect, useMemo, useState } from "react";

/** Wall-clock time in a given zone, refreshed every 15 seconds. */
export function useLocalTime(timeZone = "Asia/Kolkata") {
  const format = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [timeZone],
  );
  const [now, setNow] = useState(() => format.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setNow(format.format(new Date())), 15_000);
    return () => window.clearInterval(id);
  }, [format]);

  return now;
}
