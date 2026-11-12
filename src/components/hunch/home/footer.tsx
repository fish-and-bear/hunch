"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { STEPS } from "@/components/hunch/shell/steps"

import { LetterRoll } from "./letter-roll"
import { isSample, persona } from "./proof/data"
import { useMoving } from "./scroll/film"
import "./proof/base.css"
import "./proof/closing.css"

// Start is empty; every other step opens on the sample.
const LINKS = STEPS.map((s) => ({ href: s.id === "start" ? s.href : `${s.href}?demo=1`, label: s.label }))

export function HomeFooter() {
  const ref = useRef<HTMLElement>(null)
  // The field above lifts off the footer, which waits underneath; the wordmark comes up last.
  const moving = useMoving()
  const { scrollYProgress: bared } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const under = useTransform(bared, [0, 1], ["-46%", "0%"])
  const word = useTransform(bared, [0.25, 1], ["18%", "0%"])
  return (
    <motion.footer ref={ref} id="footer" className="ft" style={moving ? { y: under } : undefined}>
      <div className="ft-top">
        <p className="hh-title ft-tag">Find out who buys.</p>
        <nav aria-labelledby="footer-steps" className="ft-nav">
          <p id="footer-steps" className="ft-nav-title">{`Open a step with ${persona}’s sample`}</p>
          <ul className="ft-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="ft-link group">
                  <LetterRoll text={l.label} step={12} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <motion.div style={moving ? { y: word } : undefined}>
        <Link href="/" aria-label="Hunch, back to the top" className="ft-mark" />
      </motion.div>
      <div className="ft-small">
        <p>Made in Manila for sellers just starting out.</p>
        {isSample ? <p>Sample data. No real ads were run.</p> : null}
      </div>
    </motion.footer>
  )
}
