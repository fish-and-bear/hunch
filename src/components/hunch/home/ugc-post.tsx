"use client"

import type { CSSProperties } from "react"

import type { Version } from "@/lib/hunch/types"
import { cn } from "@/lib/utils"

import { metricsByVersion, photoUrlOf, run } from "./data"
import "./ugc.css"

type TextStyle = "classic" | "shadow" | "box"

export type UgcStats = { likes: number; comments: number; saves: number; shares: number }

export type UgcPostProps = {
  /** On-video text, the handle line and the caption all come from this post. */
  version: Pick<Version, "id" | "code" | "hook" | "caption" | "cta">
  photo?: string
  avatar?: string
  handle: string
  /** Price sticker text, e.g. "₱350 per jar". Leave out for no sticker. */
  price?: string
  /** Shows "Sponsored" and the message button, the way a boosted post looks. */
  boosted?: boolean
  stats?: UgcStats
  /** 4:5 feed crop instead of 9:16. */
  feed?: boolean
  /** Photo only, with the progress bar: for very small posts. */
  bare?: boolean
  className?: string
  style?: CSSProperties
}

const STYLES: TextStyle[] = ["box", "classic", "classic", "shadow", "box", "classic", "shadow", "box"]

const sentences = (s: string) => s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean)
const bare = (s: string) => s.replace(/[.!?]+$/, "")
const lower = (s: string) => (s.length > 1 && /[A-Z0-9]/.test(s[1] ?? "") ? s : s.charAt(0).toLowerCase() + s.slice(1))

// Wraps words into short lines for the white text boxes; breaks early after a colon or a comma near the limit.
function boxLines(text: string, max = 22) {
  const out: string[] = []
  let line = ""
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (line && (next.length > max || /:$/.test(line) || (/,$/.test(line) && next.length > max - 5))) {
      out.push(line)
      line = word
    } else line = next
  }
  if (line) out.push(line)
  // No lone short word on the last line.
  const last = out[out.length - 1] ?? ""
  const prev = out[out.length - 2]?.split(" ") ?? []
  if (last.length < 8 && prev.length > 2) {
    out[out.length - 1] = `${prev.pop()} ${last}`
    out[out.length - 2] = prev.join(" ")
  }
  return out
}

// The punch line: its last word turns yellow (two words when the last one is tiny).
function punch(text: string) {
  const words = bare(text).split(/\s+/)
  const take = words.length > 2 && (words[words.length - 1]?.length ?? 0) <= 3 ? 2 : 1
  return { head: lower(words.slice(0, -take).join(" ")), hot: words.slice(-take).join(" ") }
}

function onVideo(hook: string, index: number) {
  const parts = sentences(hook)
  const style = STYLES[index % STYLES.length] ?? "classic"
  if (parts.length < 2 || style === "box") {
    return { style: "box" as const, lines: boxLines(lower(bare(parts.join(" ")))), punch: null }
  }
  return { style, lines: [bare(parts.slice(0, -1).join(" "))], punch: punch(parts[parts.length - 1] ?? "") }
}

// Photos fade in once decoded, so none pops in.
const shown = (img: HTMLImageElement | null) => {
  if (img?.complete && img.naturalWidth > 0) img.dataset.in = ""
}

/** One post as it looks on a phone: the seller's photo, the hook as on-video text, the app's own chrome. */
export function UgcPost({ version, photo, avatar, handle, price, boosted, stats, feed, bare: photoOnly, className, style }: UgcPostProps) {
  const index = Math.max(0, Number(version.code.replace(/\D/g, "")) - 1)
  const text = onVideo(version.hook, index)
  const caption = sentences(version.caption)[0] ?? version.caption
  const played = 22 + ((index * 37) % 50)
  return (
    <span
      className={cn("ugc", feed && "ugc--feed", className)}
      style={{ "--played": `${played}%`, ...style } as CSSProperties}
    >
      <span className="ugc-fill" />
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ugc-photo" src={photo} alt="" draggable={false} ref={shown} onLoad={(e) => shown(e.currentTarget)} />
      ) : null}
      {photoOnly ? null : (
        <>
          <span className="ugc-copy">
            <span className={cn("ugc-text", text.style)}>
              {text.lines.map((l, i) => (
                <span key={i} className={text.style === "box" && i === text.lines.length - 1 && i > 0 ? "hot" : undefined}>
                  {l}
                </span>
              ))}
            </span>
            {text.punch ? (
              <span className="ugc-text cap">
                <span>
                  {text.punch.head} <b>{text.punch.hot}</b>
                </span>
              </span>
            ) : null}
          </span>
          {price ? (
            <b className={cn("ugc-price", index % 2 ? "red" : null)} style={{ "--x": 8, "--y": 50 } as CSSProperties}>
              {price}
            </b>
          ) : null}
          <span className="ugc-rail">
            <span className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {avatar ? <img src={avatar} alt="" draggable={false} /> : null}
            </span>
            <span className="like">{stats?.likes ?? 0}</span>
            <span className="comment">{stats?.comments ?? 0}</span>
            <span className="save">{stats?.saves ?? 0}</span>
            <span className="share">{stats?.shares ?? 0}</span>
            <span className="disc" />
          </span>
          <span className="ugc-meta">
            <b>@{handle}</b>
            {boosted ? <i>Sponsored</i> : null}
            <span className="ugc-cap">{caption}</span>
            <small>original audio · {handle}</small>
            {boosted ? <span className="ugc-cta">{version.cta || "Message us"}</span> : null}
          </span>
        </>
      )}
    </span>
  )
}

// Elle's run, for the landing page.
const handle = run.product.name.toLowerCase().replace(/[^a-z0-9]/g, "")
const avatar = photoUrlOf(run.versions[5] ?? run.versions[0])

/** A post from the sample run by version. Decorative by default; wrap it in a button to make it open. */
export function HomePost({ version, ...rest }: { version: Version } & Partial<Omit<UgcPostProps, "version">>) {
  const m = metricsByVersion.get(version.id)
  return (
    <UgcPost
      version={version}
      photo={photoUrlOf(version)}
      avatar={avatar}
      handle={handle}
      stats={m ? { likes: m.reactions ?? 0, comments: m.comments ?? 0, saves: m.saves ?? 0, shares: m.shares ?? 0 } : undefined}
      {...rest}
    />
  )
}
