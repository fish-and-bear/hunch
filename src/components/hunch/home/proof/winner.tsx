"use client"

import { useRef, type CSSProperties } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { lowerFirst } from "@/components/hunch/screens/shared"

import { LetterRoll } from "../letter-roll"
import { HomePost } from "../ugc-post"
import { costPeso, focusPosts, isRunnerUpDay, isSample, persona, runnerUp, unitWord, winner } from "./data"
import { useReveal } from "./reveal"
import { useMoving } from "../scroll/film"

type Fact = { before?: string; figure: string; label: string; line?: string }

const forThem = focusPosts.filter((p) => !isRunnerUpDay(p)).length

/** The winning buyers, what they did, and what comes next. */
export function Winner({ onOpen }: { onOpen: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, 24)
  const moving = useMoving()
  // The field rises as a dome that flattens, the post settles as it passes, and the words hang back as the next sheet covers them.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.12"] })
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["end end", "end start"] })
  const dome = useTransform(enter, [0, 1], [1, 0])
  const tilt = useTransform(pass, [0.15, 0.85], [5, -2])
  const lift = useTransform(pass, [0.15, 0.85], [64, -34])
  const sink = useTransform(leave, [0, 1], [0, 150])
  if (!winner) return null
  const next = runnerUp && runnerUp.v.id !== winner.v.id ? runnerUp : null
  const cost = costPeso(winner.m)
  const nextCost = next ? costPeso(next.m) : null
  const rounded = winner.m.spend % Math.max(1, winner.n) !== 0

  const facts: Fact[] = [{ figure: String(winner.n), label: unitWord(winner.n) }]
  if (cost) facts.push({ before: rounded ? "about" : undefined, figure: cost, label: "each" })
  const second = next ? `${next.v.audienceName} came second with ${next.n}${nextCost ? `, at ${nextCost} each` : ""}.` : null

  return (
    <div ref={ref} className="pw hh-field hh-field-sili hh-grain">
      <motion.svg aria-hidden className="pw-dome" viewBox="0 0 100 100" preserveAspectRatio="none" style={moving ? { scaleY: dome } : undefined}>
        <path d="M0 0H100V100A50 100 0 0 0 0 100Z" />
      </motion.svg>
      <motion.div className="pw-in" data-rise style={moving ? { y: sink } : undefined}>
        <div className="pw-words">
          <h3 className="pw-name hh-display pw-rise">{winner.v.audienceName}</h3>
        </div>
        <div className="pw-stage pw-rise" style={{ "--rd": "0.12s" } as CSSProperties}>
          <motion.div style={moving ? { rotate: tilt, y: lift } : undefined}>
            <button type="button" className="pw-post" aria-label={`Open the post for ${lowerFirst(winner.v.audienceName)}`} onClick={() => onOpen(winner.v.id)}>
              <HomePost version={winner.v} boosted />
            </button>
          </motion.div>
        </div>
        <ul className="pw-facts">
          {facts.map((f, i) => (
            <li key={f.label} className="pw-fact pw-rise" style={{ "--rd": `${0.2 + i * 0.09}s` } as CSSProperties}>
              <p className="pw-fig">
                {f.before ? <span className="pw-before">{f.before}</span> : null}
                <b>{f.figure}</b>
              </p>
              <p className="pw-label">{f.label}</p>
              {f.line ? <p className="pw-sub">{f.line}</p> : null}
            </li>
          ))}
        </ul>
        {second ? (
          <p className="pw-next-line pw-rise" style={{ "--rd": "0.4s" } as CSSProperties}>
            {second}
          </p>
        ) : null}
        {forThem > 0 ? (
          <div className="pw-next pw-rise" style={{ "--rd": "0.5s" } as CSSProperties}>
            <p className="pw-next-line">{`Next week, ${forThem} of ${focusPosts.length} posts go to them.`}</p>
            <a href="#next-week" className="hh-pill hh-pill-light group">
              <LetterRoll text="See next week’s posts" />
            </a>
          </div>
        ) : null}
        {isSample ? <p className="pw-note hh-label">{`Sample numbers. ${persona} is a made-up seller.`}</p> : null}
      </motion.div>
    </div>
  )
}
