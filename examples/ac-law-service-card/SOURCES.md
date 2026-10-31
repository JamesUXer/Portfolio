# Live service-card source

Verified against https://aclaw-firm.com/ on 31 October 2026. The probate card markup and four stylesheets match the published website. The original fonts and vector assets are copied from the matching local client project.

The demo wrapper isolates the component from portfolio styles, fixes its viewport footprint, opens its service link in a new tab and adds an explicit state-preview button for touch readers. The preview applies the same back state; it is an inspection aid, not a claim about touch behaviour on the client website. Reduced motion disables demo transitions.

| File | SHA-256 |
| --- | --- |
| styles.css | adc77a8cbe4880905a535df9ef4d4d217a53ca1516c2e24a3c0c414b9197fdab |
| interaction-review.css | 290bdb6e7330a4cf6f2b9c88abc86c66db226fc06ff98c00f493d4a1c3449b22 |
| service-card-hover.css | 9244a68d3ae5d32eb74c513818da3ab0acaa23fe4e28cddb4566fe11298150f4 |
| interaction-motion.css | cf108fa936ef800258ff2471104fdcfb3c4bde2f77fc82ff2f212cd92e01f79c |
| assets/eb-garamond.ttf | ef9512f92f6d579e5dc75af59a5a4b1b8b47d2eda89e00b954d44520e5369027 |
| assets/eb-garamond-italic.ttf | bba2c4499c93c9612b90b9825d32b07da52fce2fe57562a1eb6b833553f93c4e |
| assets/inter-v3.woff2 | 17fe38ab302c7e5dbfb5c3d87801092d79be958500db6412ed3bc0f126bd53d3 |
| assets/home-imgGroup.svg | 5333f4fae8b3b54b3ee36763aa4cda019be6b2bc91df6ee39dccc4c646f592ce |
| assets/home-imgEllipse1.svg | 61f180446dab61ce18857fe46507b8056b979d65f9dd61a66606af3d529fb095 |
| assets/service-hover-rule.svg | 3d37429e8c11d3d8096881f424d71f3b033f555989843e0a4832132dc407ca54 |

## Single-card comparison

The Earlier mode is a labelled HTML reconstruction of the probate card’s content and hierarchy in Figma 47:802, not an original render or a claim about an earlier live interaction. It preserves the category, situation, description and separate action; the original illustration is omitted. The Shipped mode retains the authentic component and its hover/focus styles. Only one version is visible at a time. Version changes reset the preview state. The frame reports its content height to its same-origin parent, which validates the sender and bounds the resize.
