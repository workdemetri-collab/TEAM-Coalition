# TEAM Coalition website: hosting guide

A complete static website (no database, no PHP): 781 files, under Cloudflare's 1,000-file limit.
Photos and PDFs are NOT stored in this folder. They load from your existing WordPress site
(https://teamcoalition.org/wp-content/uploads/... and /documents/...), which still hosts them.

## 1. Host it (free)
- Cloudflare Pages: Workers & Pages > Create > Pages > Upload assets, drag this whole folder in.
  (Netlify also works.) `_redirects` holds ~1,080 old-URL to new-URL rules (Cloudflare allows 2,000).
- Test the preview address on a phone first. Images will load from your live old site.

## 2. IMPORTANT: before you point teamcoalition.org at the new site
Once your domain points to the new site, teamcoalition.org/wp-content/uploads/... will stop working,
and every photo disappears. So first:
1. Have your WordPress host keep the old site reachable on a different address, e.g.
   old.teamcoalition.org (ask your host or IT; usually a subdomain pointed at the old hosting).
2. Check that https://old.teamcoalition.org/wp-content/uploads/2014/07/favicon.ico opens.
3. In this folder run:   python3 set_media_base.py https://old.teamcoalition.org
4. Re-upload the folder, then switch your domain to the new site.
Keep the old hosting paid and online for as long as the site uses its images. To bring images
fully inside the new site later, use a separate image host (Cloudflare R2 / Images, or Cloudflare Pages
project #2 containing only `wp-content/uploads`), then run set_media_base.py with that address.

## 3. Older news
News from 2011-2016 is grouped into one page per year under /news/archive/ (to stay under the
file limit). 2017 onward each have their own page. Old links redirect to the right place.

## 4. Homepage photos (optional)
Put `hero.jpg`, `venue.jpg`, `fans.jpg` in an `images/` folder (landscape, ~1600px, under 400 KB).
Until then a gradient shows. This adds only 3 files.

## 5. Before launch
- Set brand colors at the top of `css/style.css` (the `:root` block).
- Forms (pledge, newsletter, certification card, training registration) are NOT included: connect
  Formspree, Netlify Forms or your email platform. Trainer Login links to your existing
  trainingdatabase.teamcoalition.org.
- Submit `sitemap.xml` in Google Search Console after launch.
