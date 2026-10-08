<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep this brochure-style experience on the home route with in-page section links; the current scope is a single business site without separate content pages.
- Store the site's visual palette and editorial effects in global semantic CSS tokens; it keeps brand styling consistent across sections.
- Keep catalog entries in a browser-safe data module with stable entry IDs independent of manufacturer codes, because variants can share codes; source product photos through CDN asset pointers and never execute imported HTML scripts.
- Keep home media constants in a browser-safe data module rather than the route module so automatic route splitting always imports stable exports.
