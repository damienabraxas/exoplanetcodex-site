# RYA-589 — founder identity audit

## Root cause

The Exoplanet Codex website repeatedly links to repositories owned by the GitHub account `damienabraxas`. Historic commits also identify that handle as an author. Search systems can therefore mistake the account handle for a person's name when the site does not provide an equally explicit, machine-readable identity graph.

The public GitHub profile currently has the correct display name (**Ryan Schmitt**), company (**The Exoplanet Codex**), location, and website. However, its biography is empty, both Codex repositories have empty homepage metadata fields, and their canonical owner paths expose the handle. Those incomplete fields amplify the username even though the profile's display name is correct.

The visible About page names Ryan Schmitt as founder, but the site previously lacked canonical URLs, `Person`/`Organization` JSON-LD, profile Open Graph metadata, and cross-profile `sameAs` links. Invalid smart quotation marks in the founder profile HTML also prevented that section's class and image attributes from parsing reliably.

## Changes in this branch

- Declare Ryan Schmitt as creator and founder in homepage JSON-LD.
- Declare the GitHub handle and LinkedIn profile as identifiers for the same person.
- Add a dedicated `ProfilePage` graph and profile Open Graph metadata to `/about/`.
- Add canonical URLs to the homepage and founder profile.
- Repair invalid founder-profile HTML attributes.
- State the handle-to-person relationship explicitly in the repository README.
- Add `robots.txt` and a sitemap prioritizing the homepage and founder profile.

## External follow-up

1. Add a concise GitHub profile bio such as “Founder of The Exoplanet Codex · Open-science stellar spectroscopy.” The display name, company, location, and website are already correct.
2. Set `https://exoplanetcodex.org/` as the homepage for both `damienabraxas/exoplanetcodex` and `damienabraxas/exoplanetcodex-site`. Renaming the GitHub username is optional and has broader URL implications.
3. After deployment, validate both pages with Google's Rich Results Test and Schema Markup Validator.
4. Add and verify `https://exoplanetcodex.org/` in Google Search Console.
5. Submit `https://exoplanetcodex.org/sitemap.xml` and request reindexing for `/` and `/about/`.
6. Use the Google feedback control on the incorrect AI Overview to report the founder attribution after the corrected pages are live.
7. Recheck indexed snippets and the AI Overview periodically. Search-engine and AI-generated results can lag behind deployment and cannot be changed directly from this repository.
