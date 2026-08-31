---
name: 'المؤمل'
description: 'A Baghdad signmaker’s printed sample book: ivory paper, green ink, orange vinyl and original material photography.'
colors:
  primary: '#173e33'
  primary-hover: '#295444'
  footer: '#142f28'
  background: '#f5f3ec'
  paper: '#fffdf7'
  primary-foreground: '#fffdf5'
  foreground: '#17372f'
  ink: '#16372f'
  muted-foreground: '#59665d'
  secondary: '#e5e9df'
  muted: '#e9e8df'
  accent: '#fa713b'
  ring: '#b34114'
  border: '#cbcfc4'
  field-border: '#9daa9e'
  destructive: '#b12c29'
  field-error-bg: '#fff8f3'
typography:
  display:
    fontFamily: "'Noto Kufi Arabic Variable', Tahoma, sans-serif"
    fontSize: 'clamp(38px, 4.65vw, 70px)'
    fontWeight: 720
    lineHeight: 1.6
    letterSpacing: '-1px'
  headline:
    fontFamily: "'Noto Kufi Arabic Variable', Tahoma, sans-serif"
    fontSize: '32px'
    fontWeight: 650
    lineHeight: 1.6
  title:
    fontFamily: "'Noto Kufi Arabic Variable', Tahoma, sans-serif"
    fontSize: '19px'
    fontWeight: 650
    lineHeight: 1.6
  body:
    fontFamily: "'IBM Plex Sans Arabic', Tahoma, sans-serif"
    fontSize: '17px'
    lineHeight: 1.9
  label:
    fontFamily: "'IBM Plex Sans Arabic', Tahoma, sans-serif"
    fontSize: '14px'
    fontWeight: 500
  button:
    fontFamily: "'IBM Plex Sans Arabic', Tahoma, sans-serif"
    fontSize: '15px'
    fontWeight: 500
  small-copy:
    fontFamily: "'IBM Plex Sans Arabic', Tahoma, sans-serif"
    fontSize: '13px'
    lineHeight: 1.8
rounded:
  square: '0px'
  control: '2px'
  dialog: '3px'
spacing:
  label-gap: '8px'
  control-gap: '12px'
  mobile-gutter: '20px'
  section-heading-gap: '38px'
  mobile-section: '48px'
  desktop-gutter: '56px'
  desktop-section: '84px'
  wide-section: '100px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.paper}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    padding: '12px 25px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  button-outline:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
    rounded: '{rounded.control}'
    padding: '12px 25px'
  button-outline-hover:
    backgroundColor: '{colors.secondary}'
  button-light:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.primary}'
    rounded: '{rounded.control}'
    padding: '12px 25px'
  button-light-hover:
    backgroundColor: '{colors.accent}'
  input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.control}'
    padding: '9px 13px'
    width: '100%'
  filter:
    backgroundColor: 'transparent'
    textColor: '{colors.muted-foreground}'
    rounded: '{rounded.square}'
    padding: '10px 19px'
  filter-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.paper}'
  navigation:
    textColor: '{colors.foreground}'
    typography: '{typography.label}'
  project-card:
    rounded: '{rounded.square}'
  service-index:
    textColor: '{colors.foreground}'
  cookie-banner:
    backgroundColor: '{colors.paper}'
    padding: '19px 22px'
  dialog:
    backgroundColor: '{colors.paper}'
    rounded: '{rounded.dialog}'
    padding: '34px'
---

# Design System: المؤمل

## Overview

**Creative North Star: "A Baghdad signmaker’s printed sample book"**

The system borrows its material character from print production: warm ivory stock, deep green ink, decisive orange vinyl and generous original photography. Strong Arabic sans-serif headings, precise rules and nearly square controls keep it commercially direct and grounded in Baghdad.

Photography carries the service and material story. Content uses editorial rows, offset image compositions and practical ledgers, while quotation and policy surfaces stay quieter and easier to read. These are recurring layout choices, not a requirement to repeat the home page on every route.

**Key Characteristics:**

- Arabic RTL with strong, serif-free display typography.
- Warm paper surfaces, green ink and concentrated orange emphasis.
- Original generated photography, openly labeled as illustrative.
- Flat editorial structure, fine rules and precise control corners.
- Honest local-only interaction states and visible keyboard focus.

### Documentation scope

This is a scan of the implemented system in `app/globals.css` and `components/site/`, including the shared UI primitives those components use. Frontmatter values are normative extraction from source, not proposed changes. The user delegated creative choices and prohibited a visual-choice interview; the existing direction is preserved. The final consent correction was captured and inspected at 390 × 844: body text is 12px, controls are at least 44px high with 12px labels, and the main quotation action remains unobscured. The final reviewer returned ship for the two scoped fixes. This is a scoped review result, not a claim of comprehensive visual or accessibility certification.

### Provenance follow-up

The original candidate-5 seed output was not retained. It is not corroboratable and this document does not claim otherwise. A new finish-audit roll on 2026-08-31 has key `5a718a57`, catalog `c3b204a1eed6`, mode persuade, assigned index 7. Its full output is retained in `docs/finish-direction-audit.txt`. This is newly generated evidence, not the missing original roll.

Decision: preserve the existing printed-sample-book implementation reviewed above. This audit does not retrospectively substitute a new assignment for the original. Candidate 7 (receipt typography) would reduce the broad photographic/material presentation expressly required by the user. The new challengers—variable specimen, amber darkroom, linocut, camcorder, curved paper shell and ikebana—are declined for this finished commercial surface: their dominant mechanisms demonstrate type axes, chemical development, relief illustration, camera instrumentation, deformation or floral arrangement instead of the requested multi-service quotation journey. Retained disciplines are type hierarchy, photographic clarity, decisive scale, unobstructed imagery, material honesty and measured negative space. No new challenger world is claimed or copied. No selected catalog QUALITY BAR card exists for this bespoke grounded world.

## Colors

The palette combines warm stock with green printing ink and an orange vinyl accent. The frontmatter owns exact values; the names below explain usage.

### Primary

- **Green Ink** (`primary`): principal quote actions, image captions and selected filters.
- **Lifted Green Ink** (`primary-hover`): the primary action's hover state.
- **Deep Footer Green** (`footer`): the footer's quiet, dense information surface.

### Secondary

- **Orange Vinyl** (`accent`): the service strip, quotation band and text selection.
- **Burnt Orange** (`ring`): readable emphasis, current navigation marks and focus outlines. The bright vinyl accent and dark text accent serve different jobs.

### Neutral

- **Ivory Stock** (`background`): the page canvas.
- **White Paper** (`paper`): field surfaces, dialogue surfaces, light actions and captions.
- **Primitive Light Ink** (`primary-foreground`): the underlying shared button primitive's foreground; site action styles use White Paper.
- **Reading Green** (`foreground`) and **Dense Ink** (`ink`): body copy and copy on the orange strip.
- **Secondary Copy** (`muted-foreground`): supporting content and metadata.
- **Muted Green Stock** (`secondary`) and **Muted Stock** (`muted`): restrained panels, hover surfaces and image fallback fills.
- **Paper Rule** (`border`) and **Field Rule** (`field-border`): fine dividers and stronger form-field boundaries.
- **Error Red** (`destructive`) and **Warm Error Paper** (`field-error-bg`): invalid boundaries, error text and invalid field backgrounds. Error is also communicated in text.

**The Material Evidence Rule.** Let photographs show the surface, finish and installation context. Preserve the illustrative disclosure; never imply that generated examples are completed client work.

## Typography

**Display Font:** self-hosted Noto Kufi Arabic Variable, with Tahoma and sans-serif fallback.

**Body Font:** self-hosted IBM Plex Sans Arabic, with Tahoma and sans-serif fallback. Loaded body weights are 400, 500 and 600.

**Character:** firm geometric Arabic headings over open, practical Arabic body copy. There is no serif or separate monospace voice.

### Hierarchy

- **Display:** the home headline uses the frontmatter fluid scale, with weight 720, balanced wrapping and restrained negative tracking. Overrides are 43px at 950px, 46px at 760px, 41px at 380px, and 76px from 1700px. The final mobile leading is 1.65 and tracking is -0.6px.
- **Headline:** section headings use the recorded headline role; small-screen headings become 26px with 1.7 leading, while wide section headings reach 36px.
- **Title:** reusable lower-level headings use the recorded title role. Portfolio captions use 18px desktop and 16px mobile, dropping to 14px at the narrowest breakpoint.
- **Body:** the base role is 17px with 1.9 leading and paragraphs are capped at 68ch. Contextual prose ranges from 14–20px. Form controls remain 16px on mobile.
- **Label:** navigation and form labels use the recorded role. Supporting labels intentionally vary by component; do not promote small metadata sizes to body prose.

**The Arabic Reading Rule.** Keep Arabic text in normal case, allow generous leading and preserve the established font families. Do not compress text into fixed-height containers.

## Layout

The default centered content width is `calc(100% - 112px)`, capped at 1392px. Gutters reduce to 28px at 1050px, 20px at 760px and 16px at 380px. Sections use 84px vertical spacing, 48px on mobile, and 100px from 1700px. Spacing is contextual rather than a strict modular scale; frontmatter includes recurring established measurements only.

Editorial pairings use asymmetric grids, while image and specification pages use larger uninterrupted regions. Portfolio uses a five-column desktop grid with varied spans and a single column on mobile. The home featured pair is staggered on desktop; the offset is removed on mobile. Numbered process content retains two columns on mobile.

At 1150px wide compositions tighten. At 1050px the outer container narrows its gutters. At 950px dense content and footer compositions reflow. At 760px navigation becomes a focus-managed dialog, editorial pairs stack, forms become a single column and fixed prose heights are avoided. The 380px adjustment accommodates narrow phones. Wide adjustments exist at 1600px and 1700px. Preserve RTL reading order independently of visual composition.

## Elevation & Depth

Ordinary content is flat. Depth comes from paper tones, green caption bands, photographic scale and fine separators. The floating cookie panel uses the single custom ambient shadow (`0 7px 30px #12291d20`). Dialogs use an opaque tinted backdrop (`#10261ecc`), no backdrop blur, and the shared primitive's fine foreground ring; they do not introduce a decorative card-shadow system.

**The Flat Surface Rule.** Separate normal sections with stock tones, spacing and rules. Reserve the custom ambient shadow for the floating consent panel.

Motion is small and functional: button colors transition over 0.2s, service rows over 0.25s, project photographs scale to 1.025 over 0.6s using `cubic-bezier(0.16, 1, 0.3, 1)`, and lightbox zoom uses 0.35s. Shared dialog primitives use 100ms entry/exit motion. Reduced-motion preference removes animation and transitions and disables smooth scrolling.

## Shapes

Controls and lightboxes have precise 2px corners; branded dialogs use 3px. Portfolio images, filters and editorial rows stay square. One-pixel rules establish boundaries without enclosing every content block. Photograph crops are rectangular and communicate material scale; avoid pill silhouettes and ornamental clipping.

## Components

### Buttons

Confident rectangular actions with a clear label and optional inline arrow. Standard actions use White Paper text on Green Ink, 12px 25px padding and 54px minimum height. Small actions use 8px 17px padding and 46px minimum height. The outline variant uses a transparent surface and Paper Rule border; hover adds Muted Green Stock. Light actions use White Paper with Green Ink and become Orange Vinyl on hover. Primary hover uses Lifted Green Ink.

Links and buttons receive a 3px Burnt Orange focus outline with 5px offset; shared button primitives also provide disabled opacity and a one-pixel active displacement. Mobile hero, header and consent actions have separate source overrides; do not flatten them into a universal size claim.

### Chips

Portfolio filters are rectangular text controls, not pills. Default filters have transparent surfaces and borders with secondary copy; hover adds muted green stock. `aria-pressed` selection switches to Green Ink with White Paper text. Desktop minimum height is 44px; the current mobile filter override is 42px. This is an implementation record, not a universal touch-target compliance claim.

### Cards / Containers

Project cards are open photographic entries with metadata beneath the image, not raised panels. Images use a 1.4 aspect ratio in the common card treatment and a very small hover enlargement; the title remains the keyboard-accessible route. Captions use an 18px top gap on desktop and 14px on mobile. Illustrative disclosure belongs beside the collection. Material and service containers use plain paper, green stock or dividers according to their content role.

### Inputs / Fields

Fields use White Paper, Field Rule borders, 2px corners, 9px 13px padding and 49px minimum height. Arabic labels sit above fields. Controls stay at 16px, and textareas have a 140px minimum height with vertical resizing. Focus adds a 2px Burnt Orange outline with 2px offset and changes the border. Invalid fields use Error Red boundaries plus warm error stock and associated text. Preserve explicit labels, help, errors, and local-only file selection disclosure.

### FAQ

Questions form a quiet ruled list with strong Arabic labels and plain supporting answers. Controls use predictable question/answer ID pairs so their accessible relationships remain stable across server and client rendering.

### Navigation

The sticky header uses the canvas color. Desktop links are compact Arabic text with a dark-orange hover and a 2px current-page underline. At 760px they move into a paper dialog capped at `min(420px, calc(100% - 24px))`, with 30px padding, 18px links and fine row dividers. Dialog close controls have 44px minimum dimensions; the narrowest menu-trigger source override is 40px wide and 44px high. Preserve focus management and route-change dismissal from the shared dialog implementation.

### Service index and material ledger

Text and rules provide structure beside large photographs. Service links use strong display text, quieter body labels and a clear arrow. Rows change ink and stock on hover. Material ledgers align short labels with practical descriptions; do not replace them with interchangeable icon cards.

### Consent panel and dialogs

The paper consent panel is fixed above the page with a fine rule and the ambient shadow. Its mobile body is 12px, title is 14px, and actions are at least 44px high; this records the last accepted source correction. Desktop body remains 11px and actions 38px minimum in current source. Settings use a scrollable paper dialog with a maximum height of 90dvh and separately labeled required and optional choices. No optional service is activated in this mock implementation. Preserve the explicit close action and the storage-failure notice.

## Do's and Don'ts

### Do:

- Do retain RTL flow and use logical spacing properties for reusable layouts.
- Do use the self-hosted Arabic display and body fonts with generous line height.
- Do use the original local photographs and keep illustrative and fictional-data disclosures visible.
- Do preserve the corrected mobile consent title, body text and controls at 14px, 12px and 44px minimum height respectively.
- Do provide visible focus, inline validation, a real empty state and a reduced-motion path.
- Do describe form completion as a local simulation with a download; selected files are not uploaded.

### Don't:

- Don't introduce a SaaS visual style, excessive gradients, pill controls or repetitive card grids.
- Don't add decorative shadows to normal cards, service rows or material ledgers.
- Don't replace the photographic material story with stock illustration or fabricated client proof.
- Don't treat synthetic sidecar tonal ramps as additional approved production colors.
- Don't generalize the final scoped reviewer disposition into comprehensive visual or accessibility certification.
