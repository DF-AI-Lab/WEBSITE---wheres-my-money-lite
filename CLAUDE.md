# Where's My Money? Lite: the WEBSITE

This repo = the website that shows off the Lite app. The app itself lives in DF-AI-Lab/wheres-my-money-lite
(live: https://df-ai-lab.github.io/wheres-my-money-lite/, demo: .../demo/). Never use any other repo.

- Plain HTML + CSS + JS, no build. GitHub Pages from `main`, root folder (`.nojekyll`).
- Pages, in story order: `index.html` (1 Wake) → `tour.html` (2 Tour) → `month.html` (3 Month) → `play.html` (4 Play) → `features.html` (5 Everything).
- Shared: `site.css` + `site.js` (chapter nav, next-chapter band, `Hand.print(screen, {...})` = thumb print swiping the glass, `Hand.follow(screen, scroller, wrap)` = print under a finger / mouse wheel).
- Numbers are the demo's example month (pay £2,500, bills £1,183.73, spare £1,209.57). Never real money.
- Darren: short replies, spacing, one next step. Copy-paste things in a code block.
- Check every page at 1280 and 390 wide (Playwright): no sideways scroll, no script errors.
- 28 Oct v1: built from the 5 mocks + Darren's notes (hand on Wake + Play, Tour phone scrolls with a thumb print, Month tighter).
  The hand is a drawn SVG for now; a Higgsfield / real-looking one later.
- NEXT (agreed 28 Oct): Higgsfield + motion = a CONCEPT LAB first. 1) Darren connects the Higgsfield connector. 2) Make 3-4 hand/phone
  concepts side by side on one test page (lab/), real hand loops as webm/mp4 + poster. 3) Measure each: file size, load time, looks at
  390 + 1280, smooth loop, reduced motion. 4) Darren picks; only the winner goes into the real pages (drawn SVG hand stays as fallback).
- 1 Nov SIMPLE (Darren): ALL hands removed (no Hand.wrap, no float). Only the thumb print swiping the screen stays (Hand.print /
  Hand.follow). Higgsfield lab parked; amendments later.
- 1 Nov: Wake page styles = Fingerprint + PIN only (thumb / tap / lift gone, no Wake it button). PIN = any 4 numbers (keypad or keyboard).
- 1 Nov: Tour page 'Motion notes for Higgsfield / Remotion' section removed; text kept in MOTION_NOTES.md for later.
- 1 Nov: no text highlight anywhere (site.css body user-select none; inputs still selectable).
- 1 Nov: Tour New payday card (demo numbers: pay 2500.00, left 0.00, 28th, Work it out, Save a backup) OPENS on stop 3 (thumb print taps
  the pay; its line + reticle point UP at the Pay box in the card) and stays open on stop 4 'Or tap the little arrow' (t:'tab'); closed on every other stop. 11 stops.
- 1 Nov: Tour Autoplay REMOVED (Darren). Voice + Next work together: Next stops the old line and reads the new stop. Closed New payday card = 0 height (.c.newpay).
- 1 Nov: Month page side card = the app's FULL top card (key line, ring, Pay, Left, − Bills so far, − Spends £0 (pot spends come off
  Pots left, like the app), Pots left/over, Starting spare £716.27, Actual spare = big number); changed rows flash. Pots bars stay (PC only).
  Phone (≤900): card sticks on top; the day = the beat in the middle of the space UNDER the card.
