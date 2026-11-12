# Landing page copy

Voice: Enter's. Headings of 7 words or fewer with one idea. Exactly one support line under a heading. Verb first. Concrete nouns: ₱100, 3 days, 8 posts, Facebook, messages, candles. No "AI", "powered", "smart", "seamless", "unlock". Nothing that explains how Hunch reasons. Sentence case everywhere. No exclamation marks. Numbers come from the data (`data.ts`), shown here with Elle's sample values.

One metaphor: a hunch becomes messages. Say "hunch" for the guess, "messages" for the proof.

## header.tsx (done)

- Logo: the mark, then the wordmark `hunch` (aria-label "Hunch, home")
- Link: How it works
- Link: Elle's test
- Button: Try your product

## hero (done): hero/headline.tsx, hero/post-ring.tsx

- H1: Find out who buys.
- Support line: Boost 8 posts with ₱100 each on Facebook and see who messages.
- No count bubble and no captions on the posts. The mark above the headline carries no words.
- Post button aria-label: Open the post for {audience}

## prompt-box.tsx (done)

- Field label (screen readers): What do you sell?
- Typewriter examples, each short enough for one line in the box at 390 px: Soy candles, ₱350 a jar / Matcha in 30 g tins, ₱480 / Calamansi soap, ₱120 a bar / Crochet plant hangers / Thrifted denim jackets
- Send button aria-label: Write my 8 posts
- Empty submit tooltip: Type what you sell first.
- Hint, sample mode: Sample run. Your product's name and price go into a saved test.
- Hint, live mode: Next you add a photo. Nothing is posted for you.
- Link after the hint: Open Elle's test

## audiences.tsx (the 8 kinds of buyers)

- Heading: 8 hunches about who buys.
- Support line: Meet the 8 kinds of buyers Hunch picked for Elle's candles.
- Each buyer: the audience name as the title, its post as a phone frame beside it, and the `situation` sentence from the data as the only text. No field labels.
- Control to see the rest: Show all 20 / Show the 8
- A buyer that was not picked: its name, struck through softly, and its cut reason from the data.
- Post button aria-label: Open the post for {audience}
- Empty state (no audiences in the data): No buyers yet. Type what you sell.
- The list opens with all 20 names, strikes the 12, then settles on the 8. No line explains it.
- Under the phone: the lit buyer's `situation` sentence, nothing else.
- Cut reason fallback (a cut with no reason in the data): Not picked for this test.

## how-it-works.tsx and how/

- Heading: Run it in 3 days.
- Support line: Follow 4 steps from one line to real messages.
- Step 1 title: Type what you sell.
- Step 1 line: Add a photo, a price and where you sell.
- Step 2 title: Get 8 posts.
- Step 2 line: Read one post for each kind of buyer.
- Step 3 title: Boost each with ₱100.
- Step 3 line: Run them on your own Facebook page for 3 days.
- Step 4 title: See who messaged.
- Step 4 line: Type in the results and see which buyers sent the most messages.
- Step 1 mock, the start screen: What do you sell? / typed line "Soy candles poured at home" / Add a photo / Price, with the price from the data ("₱350 per 180 g jar") / Where you sell, with the channels from the data ticked (Shopee, Instagram, Facebook) / button: Write my 8 posts
- Step 2 mock: Your 8 posts / One for each kind of buyer / under each post, the audience name from the data
- Step 3 mock: Boosted on Facebook / Day 1 of 3, then 2, then 3, with "₱800 spent" counting beside it / under each post: ₱100 and a bar in 3 parts, one per day
- Step 4 mock: Most messages / the winner's audience name / `14` messages / ₱7 a message / then all 8 audience names, most messages first, one dot per message and the count
- Steps carry no numbers. Only the open step shows its line. On phones only the open step shows at all.

## your-people.tsx and proof/ (the result)

Results (cream), `proof/results.tsx`:

- Heading: ₱800 found Elle's buyers.
- Support line: See which of the 8 posts got people to message.
- Above each post: `{n}` messages (or "1 message", "No messages"), set in type. The winner's count is the big red one.
- Under each bar: the audience name, nothing else.
- Post button aria-label: Open the post for {audience}

Winner (red field), `proof/winner.tsx`:

- Title: the audience name (Hosts getting the sala ready)
- Line under it: the audience `who` sentence from the data (Someone who has guests over this December and gets the sala ready before they arrive.)
- Fact 1: `14` messages / The next best got 10.
- Fact 2: about `₱7` a message / The next best paid ₱10. ("about" only when the cost was rounded)
- Fact 3: `28.6%` cheaper / than the next best, with at least 10 messages. A clear lead. (the percent comes from the two costs; "at least 10" is the engine's bar for a high verdict and shows only when the verdict is high and the winner cleared it; otherwise the line is "than the next best.")
- Next: Next week, 6 of 7 posts go to them.
- Button: See next week's posts (jumps to the next section)
- Sample note (corner): Sample numbers. Elle is a made-up seller.
- Post button aria-label: Open the post for {audience}
- Gone: "How sure: High" dial and its tooltip, "Who saw it, by age", "Next best: {audience}, 10 messages", the number bubbles on the post, the price sticker on the post.

## next-week.tsx

- Heading: Post to them next week.
- Support line: Get 7 new posts, 6 for the buyers who messaged.
- Day label: Mon, Dec 14 (weekday and date only)
- Second line under the runner-up day, plain text: Testing the runner-up
- Side tests heading: Try 2 small tests.
- Side tests line: Spend ₱100 on each to check a second hunch.
- Button: Copy the caption
- Toast after copying: Caption copied.
- Toast if copying fails: Copy blocked. Select the caption and copy it by hand.
- Label under each side test: the audience name only
- Post button aria-label: {day}. Open the post for {audience}
- The copy button copies tomorrow's caption. The reply shows in a message bubble under the button, not in the app's toast.

## post-sheet.tsx and proof/sheet*.tsx (a post, opened)

No tabs, no bracket label, no badges. One phone frame on the left, the words on the right, in this order.

- Title: the audience name
- Line under the title: the audience `who` sentence from the data
- Result (if tested): `14` messages · `₱7` a message
- Section: The caption (followed by the full caption and hashtags)
- Button: Copy the caption
- Button: Save the image
- Section, only when a draft was sent back: First draft, sent back
- Line: the reviewer's reason from the data, as written
- Language switch: Taglish / English / Tagalog
- Previous and next (aria-labels): Previous post / Next post
- Close (aria-label): Close
- Empty state (no checks saved): Nothing was flagged on this post.
- Under the phone, next week's posts only: Mon, Dec 14 (plus " · Testing the runner-up" on that day)
- After copying: Caption copied. / Copy blocked. Select the caption and copy it by hand. (a message bubble inside the sheet)
- Not shown: the empty state above. The sheet only speaks about a draft when one was sent back.
- Save the image saves the post's photo.

## faq.tsx

A chat with Hunch. At most 4 questions; each answer is one line of 12 words or fewer and leads with Yes, No or Never.

- Heading: Ask before you spend ₱800.
- Support line: none. The questions do the work.
- Chat name, next to the drop: Hunch
- Q: Does Hunch post or boost for me?
  A: No. You post and boost on your page. Hunch never logs in.
- Q: Do I connect my Facebook?
  A: No. Type the numbers or upload the Ads Manager CSV.
- Q: Can the posts be in Tagalog?
  A: Yes. Every post comes in Taglish, English and Tagalog.
- Q: Does it target by age or religion?
  A: Never. Not by age, religion or health.
- Quick replies under the thread: the questions not asked yet, word for word.
- Button after the last answer (and when the whole thread shows at once): Try your product
- The first question sends itself. No "typing" label, no timestamps, no "Seen".

## cta-band.tsx

- Heading: Test your hunch.
- Support line: Type what you sell and get your 8 posts.
- Then the same try box as the hero (prompt-box.tsx copy above).

## footer.tsx

- Line under the wordmark: Find out who buys.
- Links heading: Open a step with Elle's sample
- Links: Start / Studio / Your 8 hunches / Your 8 posts / Run the test / Results / Next week
- Small print: Made in Manila for sellers just starting out.
- Small print, sample mode: Sample data. No real ads were run.
- Wordmark link aria-label: Hunch, back to the top

## hidden-ending.tsx

- Heading: Every dot could be a buyer.
- Hint (mouse): Move around to find yours.
- Hint (touch): Tap to find yours.
- Button: Back to top

## Lines to delete wherever they still appear

"The 8 picked are the most different from each other, so a test can tell them apart." / "Why it fits" / "The moment" / "Where they are" / "How to talk to them" / "Made for" / "Passed 3 checks" / "See the post" / "01 of 20" / "[ the test ]" / "[ after the test ]" / "[ why it was sent back ]" / "Hunch thinks of 20 kinds of buyers, then picks the 8 most different." / "Every post got ₱100 for 3 days, so the ranking is fair." / "It runs the same steps you just saw." / "Plain answers about posting, ads and the sample on this page." / "Sample run" chip in the header.
