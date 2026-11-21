import { Fragment } from "react";

/**
 * Wraps each word in a clipping mask so it can slide up into view. The outer
 * span pads the bottom so descenders are not cut off.
 */
export function SplitWords({
  text,
  wordClassName = "js-word",
  className = "",
}: {
  text: string;
  wordClassName?: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className={`inline-block will-change-transform ${wordClassName} ${className}`}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}
