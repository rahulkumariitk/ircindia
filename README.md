# IRC – Indian Recycle Company website

Company website for **Indian Recycle Company (IRC)**, an industrial recycling company for a clean and green India. IRC is in its research and development phase and begins commercial operations in 2027, starting with lithium-ion battery recycling.

It is a plain static website (HTML, CSS and JavaScript). There is no build step and nothing to install.

## Project structure

```
irc-website/
├── index.html            All page content and sections
├── css/
│   └── styles.css        Colours, fonts, layout and animations
├── js/
│   └── main.js           Countdown, hero animation, element explorer,
│                         process animation and the contact form
└── assets/
    ├── logo/             Logo files (SVG for editing, PNG for documents)
    └── icons/            Favicon and app icon
```

## Making changes

| What you want to change | Where |
|---|---|
| Any text on the page | `index.html`. Each section starts with a comment such as `<!-- ABOUT -->`, `<!-- CONTACT -->` |
| Email that receives form messages | `js/main.js`, line `const CONTACT_EMAIL = ...`. Also update the email shown in the Contact section and footer of `index.html` |
| Launch countdown date | `js/main.js`, line `const LAUNCH_DATE = ...` |
| Brand colours | `css/styles.css`, the `:root` block near the top (light mode) and the two dark-mode blocks right after it |
| Fonts | The Google Fonts `<link>` in `index.html` and the `--f-display`, `--f-body`, `--f-mono` variables in `css/styles.css` |
| Logo | Replace the files in `assets/logo/` (keep the same file names) |
| Element explorer text (Li, Ni, Co…) | `js/main.js`, the `EL = { ... }` list |
| Process animation captions | `js/main.js`, the `SC = [ ... ]` list |

To preview, open `index.html` in a browser. The contact form only sends email when the site is online (see below).

## Publishing with GitHub Pages on ircind.com

The site is set up to run on **https://ircind.com** (the `CNAME` file in this repository holds the domain).

**1. Turn on GitHub Pages**
1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*, branch **main**, folder **/ (root)**, then **Save**.
3. Under **Custom domain**, make sure it shows `ircind.com`.

**2. Point the domain at GitHub** (at the company where you bought ircind.com, in its DNS settings)

| Type | Host / Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | rahulkumariitk.github.io |

Optional IPv6 (AAAA, host @): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Delete any other A, AAAA or CNAME records for `@` and `www` (for example a "parked page" record from your registrar).

**3. Turn on HTTPS**
DNS changes can take from a few minutes up to 24 hours. Once **Settings → Pages** shows the DNS check as successful, tick **Enforce HTTPS**.

**Recommended:** verify the domain under your GitHub profile **Settings → Pages → Add a domain**, which protects it from being claimed by other GitHub accounts.

Every push to `main` updates the live site automatically.

## Turning on the contact form (one-time)

The form sends messages to `info.aviragroup@gmail.com` through [FormSubmit](https://formsubmit.co), a free form-to-email service.

1. Once https://ircind.com is live, send a test message through the contact form.
2. FormSubmit sends a confirmation email to that inbox (check Spam/Promotions too). Click **Activate Form**.
3. From then on, every enquiry arrives in the inbox with the sender's name, organisation, email, phone, enquiry type and message. Replying goes straight to the sender.

The form cannot send when `index.html` is opened directly from your computer or inside a preview sandbox. In that case it shows the email address so visitors can still reach you.

**Optional:** FormSubmit's activation email offers a random alias address. Put that alias in `CONTACT_EMAIL` in `js/main.js` to keep your real address out of the page code.

## Facts and figures

Market, policy and industry figures on the site come from public sources, including JMK Research (India lithium-ion market), the IEA Policy Database and Down To Earth (Battery Waste Management Rules, 2022), Ministry of Mines / Cabinet announcements via The Tribune and ANI (₹1,500 crore critical-mineral recycling scheme), Outlook Business, Autocar Pro and Indian Chemical News (company capacities), and Atia et al. (2019) on hydrometallurgical recycling. Review and update these figures periodically.

## Licence

© Indian Recycle Company (IRC). All rights reserved. The IRC name and logo may not be reused without permission.
