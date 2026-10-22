# Aditya Bhati — Portfolio

My personal portfolio website, live at **[adityabdev.com](https://adityabdev.com)**.

A minimal, monochrome single-page site that introduces who I am, what I've worked on, and how to reach me. It's dark by default with a light theme option, and it's built to work on any screen size, from small phones to wide desktop monitors.

## Sections

- **Home**: a short introduction.
- **About Me**: more detail about me, my roles, a few quick stats, and links to my resume and contact info.
- **Experience**: a timeline of my work experience in the industry.
- **Skills**: an interactive grid of the languages, frameworks, and tools I've worked with, filterable by category.
- **Projects**: cards for the projects I've built, with links to their GitHub repos and live sites where available.
- **Education**: my university, major, GPA, and the courses I've taken that are relevant to my field, along with their status.
- **Contact**: links to email me or visit my LinkedIn profile.

## Features

- **Floating navigation bar**: a rounded pill with an icon for each section. It highlights the section you're currently viewing and collapses to icons only on smaller screens.
- **Light and dark themes**: a monochrome palette in both. Your choice is remembered between visits, and the browser-tab icon follows your system theme.
- **Custom animations**: section content fades in as you scroll, numbers count up, images wipe into view, and skill cards animate when the filter changes. All motion is turned off for visitors who have "reduce motion" enabled.
- **Loading screen**: my logo inside a ring that fills as the site loads.
- **Custom 404 page**: shown for any page that doesn't exist, styled to match the rest of the site, with a link back home.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com), with `clsx` and `tailwind-merge` for combining class names |
| Animation | [Motion](https://motion.dev) |
| Routing | [React Router](https://reactrouter.com) |
| Icons | [Lucide](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons/) |
| Fonts | [Geist and Geist Mono](https://vercel.com/font) |
| Code quality | ESLint with `typescript-eslint` |

## Deployment

The site is hosted on **[Vercel](https://vercel.com)** and served from the custom domain [adityabdev.com](https://adityabdev.com).

- **Continuous deployment**: Vercel builds and deploys the site automatically whenever changes are pushed to the repository.
- **Routing**: a `vercel.json` rewrite sends every path to the app, so React Router can show the custom 404 page for links that don't exist.
- **Monitoring**: [Vercel Analytics](https://vercel.com/docs/analytics) tracks visits and page views, and [Vercel Speed Insights](https://vercel.com/docs/speed-insights) tracks real-world performance.
- **Project demos**: some projects are hosted live on their own subdomains, such as [damagedetector.adityabdev.com](https://damagedetector.adityabdev.com) and [gallery.adityabdev.com](https://gallery.adityabdev.com).

## Future Developments

- Adding more skills and projects as I work on them.
- A contact form so visitors can send me a message directly from the site.

## License

© Aditya Bhati. All rights reserved. This is a proprietary website; the source code, design, and content may not be copied, modified, or redistributed without permission.
