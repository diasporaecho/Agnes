# Agnes Abroad

A complete static teacher-relocation field guide for Greece, Italy, Thailand, UAE, Spain, Portugal, Mexico and Panama. Research checked **November 8, 2026**. It uses explicitly labeled comparison assumptions; no personal qualifications, finances or health needs have been confirmed.

## Open the guide

Once GitHub Pages is enabled: **https://diasporaecho.github.io/Agnes/**

Download the repository-ready ZIP: https://github.com/diasporaecho/Agnes/archive/refs/heads/main.zip

You can also open `index.html` locally. The website has no build dependency, analytics, remote fonts, database or paid API. All website assets are included. External sources require internet access.

## Publish with GitHub Pages

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main**, folder **/(root)**, and **Save**.
4. Wait for the Pages build, then use the URL shown in Settings. Preserve the capital A in `/Agnes/`.

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The empty `.nojekyll` file keeps this a plain static website. No custom domain is configured.

## Files and updates

- `index.html`: shared planning content and page structure.
- `assets/styles.css`: responsive design and print styles.
- `assets/app.js`: country/role filters, ranking switch, budget calculator, checklist and source search.
- `assets/data.js`: generated country content, planning budgets and source directory.
- `assets/athens.jpg`: Athens photograph by Florian Wehde, used under the Unsplash License (https://unsplash.com/photos/uBtAxsurY3s). `assets/horizon.svg` is the unused original illustration.
- `research/research_*.json`: dated research snapshots with claim/source associations. These are research notes, not personal records.
- `build_data.py`: regenerates browser data from the research snapshots using Python's standard library.
- `VERIFY.md`: validation results and limits.

To update facts, edit the relevant research JSON and its source entries, then run `python build_data.py`. Review the generated page. Change rankings, authored budgets and summaries in `build_data.py` when new evidence warrants it; changing a research snapshot alone does not automatically re-rank countries. Update research dates in the HTML, JavaScript, generator and README consistently. Do not represent the original snapshot as newly verified merely by changing its date.

Check authoritative visa, work, nationality and tax rules before a decision. Refresh school postings and property asking examples near application time. Remove or clearly mark closed vacancies. Preserve gross/net, paid-month and benefit distinctions in salary evidence. A stipend is not a qualified-teacher salary.

## Calculator definitions

Amounts are authored planning allowances, not statistical market averages or quotes. Currency references are November 6, 2026: ECB EUR/USD 1.1165, BOT THB/USD 33.503, Banco de México MXN/USD 18.6297. The ACS UAE salary example uses its published AED/USD 3.67 conversion. Panama is modeled in USD.

Monthly spending = selected budget − directly employer-paid housing (capped at rent) − directly employer-paid insurance (capped at insurance allowance) + extra costs.

Monthly cash remaining = entered take-home income − monthly spending. Negative values are shown as shortfalls.

Upfront funds = setup allowance + two gross housing months as a deposit/advance placeholder + two months of modeled spending as a pay bridge + selected reserve months at full unsubsidized expenses including extras. This is a conservative scenario, not a legal deposit requirement. It excludes buying a home/car or investment-route principal. Reimbursements are not cash until received.

Checklist ticks are stored only in the current browser using `localStorage`; there is no remote sync. Clearing browser data removes them. Numeric calculator inputs are not persisted.

## Research limits

This is planning information, not individualized professional advice. Unknown citizenship, age, subject, credentials, pension and insurance needs can change every recommendation. Every source URL is supplied, but sources and listings can change or disappear. A current job posting does not establish sponsorship or applicant eligibility. Some school pay scales are not public. One source for Panama Friendly Nations was indexed but failed direct retrieval; the guide flags the uncertainty and links to the working official decree index.

For printing, use **Print / save PDF**. The page expands country sections and restores their previous state after the print dialog closes.

## Browser-uploaded deployment

The deployed edition keeps index.html, CSS, JavaScript and SVG assets together at the repository root. The included Agnes_Abroad_GitHub_Pages.zip preserves the full structured source, research snapshots and Python generator. After regenerating that source, copy assets beside index.html and remove the assets/ prefixes in index.html for this flat deployment.
