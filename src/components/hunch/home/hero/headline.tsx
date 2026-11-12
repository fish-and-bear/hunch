import { Fragment } from "react"

const LINES = [
  ["Find", "out"],
  ["who", "buys."],
]

export const HEADLINE = LINES.map((l) => l.join(" ")).join(" ")
export const SUPPORT = "Boost 8 posts with ₱100 each on Facebook and see who messages."

// One line on wide screens, two on phones.
export function HeroHeadline() {
  return (
    <h1 id="hero-title" className="hx-h1 hh-display">
      {LINES.map((words, i) => (
        <Fragment key={i}>
          <span className="hx-line">
            {words.map((w, k) => (
              <Fragment key={k}>
                <span className="hx-w hx-hide" data-hx-word>
                  {w}
                </span>
                {k < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
          {i < LINES.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  )
}
