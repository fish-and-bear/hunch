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
  // The field above lifts off the footer, which waits underneath.
  const moving = useMoving()
  const { scrollYProgress: bared } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const under = useTransform(bared, [0, 1], ["-40%", "0%"])
  return (
    <motion.footer ref={ref} id="footer" className="ft" style={moving ? { y: under } : undefined}>
      <div className="ft-top">
        <nav aria-labelledby="footer-steps" className="ft-nav">
          <p id="footer-steps" className="ft-nav-title">{`See each step with ${persona}’s sample`}</p>
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
      <div className="ft-small">
        <p>Made in Manila for sellers just starting out.</p>
        {isSample ? <p>Sample data. No real ads were run.</p> : null}
        <a href="#top" className="ft-up" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" }))}>
          Back to top
        </a>
      </div>
    </motion.footer>
  )
}
