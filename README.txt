AIS HOMEPAGE — PILLAR HOVER FIX
================================

Upload:
assets/css/pillar-hover-fix.css

Then add this stylesheet AFTER the existing homepage-image-overrides.css
in index.html:

<link rel="stylesheet" href="assets/css/pillar-hover-fix.css">

The fix:
- prevents the hover card from jumping upward
- gives the hovered card a controlled lighter-navy treatment
- forces the heading to remain white and readable
- brightens the description text
- retains the orange accent
- adds a restrained premium shadow/highlight

This patch is deliberately isolated so it does not disturb the rest of the
homepage design.
