# Extracted video stills

The three video posts (`01`, `02`, `07` in `../../posts.json`) originally had only
a thumbnail on file - see the "Two limits to know about" section of
`../../README.md`. Their signed CDN video URLs were still live when this was
done, so the videos were pulled and frame-sampled with a headless browser
(no ffmpeg on this machine) to get real mid-action stills instead.

Each post got ~10-14 evenly spaced candidate frames, reviewed visually, and
narrowed to the 3-4 that actually show the work, equipment, or finished result
without motion blur or dead space. The rejected candidates and the raw
downloaded `.mp4` source files (172MB combined) were deleted after selection -
too heavy to carry in git, and their job was done. If a different frame is
ever needed, the videos will need to be re-fetched, and their URLs may have
expired by then.

## 01-DdLeCkJT_S3 - Pool excavation, Boerne, TX

- `frame-01-topdown-excavator-digging.jpg` - straight overhead, excavator mid-dig
- `frame-02-excavator-worker-trampoline-context.jpg` - wide, shows backyard context (patio, trampoline, worker)
- `frame-03-excavator-trench-midwork.jpg` - excavator against the house, trench depth visible
- `frame-04-excavator-loading-dump-truck.jpg` - excavator loading a dump truck, two pieces of equipment in one frame

## 02-DdLw3rfTk6i - Fence refurbishment and staining

- `frame-01-finished-stained-gate.jpg` - finished stained gate, wide
- `frame-02-sprayer-staining-in-progress.jpg` - sprayer rig and worker mid-stain, shows process and equipment
- `frame-03-finished-stained-fence-closeup.jpg` - finished fence run, closeup

No genuine "before" frame exists in this video - the caption describes staining
an existing fence, not replacing it, and the footage starts after the old
finish was already removed.

## 07-DdLmODGTwAj - King Ranch fence, Fair Oaks, TX

- `frame-01-stucco-column-iron-fence-detail.jpg` - stucco column and iron fence, close detail
- `frame-02-finished-gate-stucco-column.jpg` - finished gate against the stucco column, the clearest single "result" shot
- `frame-03-stucco-column-freshly-built.jpg` - column on its own before the fence panel was attached, evidence of the masonry step described in the caption
