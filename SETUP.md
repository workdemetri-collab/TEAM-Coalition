# TEAM Coalition on Sanity + Next.js: setup

This package has three parts:

- `frontend/`: your Next.js app with the TEAM Coalition design, menus, homepage, news, search and style guide
- `sanity-import/content.ndjson`: all content from the old site as Sanity documents (334 pages + 980 news posts)
- `studio-additions/`: one small schema addition for your Studio

## Step 1: Studio (5 minutes)
1. Copy `studio-additions/htmlEmbed.ts` to `studio/src/schemaTypes/objects/htmlEmbed.ts`.
2. In `studio/src/schemaTypes/index.ts`: `import {htmlEmbed} from './objects/htmlEmbed'` and add `htmlEmbed` to the exported array.
3. In `studio/src/schemaTypes/objects/blockContent.tsx`, add `defineArrayMember({type: 'htmlEmbed'})` next to the existing `image` member in the `of: [...]` list.
4. In `studio/src/schemaTypes/documents/post.ts`, add this field (it powers the news category filter):

       defineField({name: 'categories', title: 'Categories', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),

5. Redeploy the Studio (`npm run dev` locally, or `npx sanity deploy`).

## Step 2: Clear the starter sample content
If you imported the template's sample data, delete its demo pages and posts in the Studio first (especially any page with slug `about`), so slugs don't collide.

## Step 3: Import the content
From the repo root:

    cd studio
    npx sanity dataset import ../sanity-import/content.ndjson production --replace

(Use your dataset name if it isn't `production`.) Documents are published immediately. Re-running is safe: `--replace` overwrites the same documents.

## Step 4: Replace the frontend
1. In your repo, replace the `frontend/` folder with this one. **Keep your own `.env.local`** (it isn't included).
2. Make sure the old `frontend/app/[slug]/` folder is gone. The new `app/[...slug]/` replaces it (pages now have paths like `training/state-laws`).
3. Commit and push. Vercel redeploys.

## What's in the frontend
- Brand: Futura headings, Century Gothic text and bold menus, #00267c and #1c76ab (`app/globals.css`). Jost and Montserrat load as look-alikes for devices without the real fonts.
- Menus: edit `lib/nav.ts` to change the main menu, utility links or sidebar groups.
- Homepage: `app/page.tsx` (no longer needs a Sanity "main document"). The latest-news cards come from Sanity.
- News: `/news` with category, year and paging. Search: `/search`. Style guide: `/style-guide` (not indexed).
- Old addresses: `proxy.ts` + `redirects.json` send about 1,100 old WordPress URLs to the new ones.
- Photos and PDFs from the old site load from teamcoalition.org. Before moving the domain, keep the old site reachable (for example old.teamcoalition.org) and set `NEXT_PUBLIC_MEDIA_BASE=https://old.teamcoalition.org` in Vercel. No re-import is needed.

## About "Missing a main document for /"
That message comes from the Studio's Presentation tool, not the website. It means no document is mapped to the `/` route. The homepage is now code, so it's harmless. To remove it, map `/` to the `settings` document in your Presentation config (send me `studio/sanity.config.ts` and I'll write it).

## Known limits
- I couldn't run `npm install` or `next build` here (no internet), so the code is untested. `next.config.ts` has `typescript.ignoreBuildErrors: true` so a stray type error won't block the first deploy. If the build fails, send me the Vercel log.
- Tables, buttons, FAQ accordions, staff cards and videos are stored as "HTML block" items (editable as HTML). Plain text, headings, lists and links are normal rich text.
- Forms are not included. The old pages that held forms show an "online form coming soon" notice.
- Images are loaded from the old site rather than uploaded to Sanity yet.
