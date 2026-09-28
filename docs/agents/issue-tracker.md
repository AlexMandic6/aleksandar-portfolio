# Issue tracker: GitHub

Issues and specs for this repo live in GitHub Issues at `AlexMandic6/aleksandar-portfolio`. Use the `gh` CLI for issue operations. Run commands from this checkout so `gh` resolves the `origin` remote, or pass `--repo AlexMandic6/aleksandar-portfolio` explicitly.

## Operations

- Create: `gh issue create --title "..." --body-file <file>`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open`
- Comment: `gh issue comment <number> --body-file <file>`
- Label: `gh issue edit <number> --add-label "<label>"`
- Close: `gh issue close <number>`

**PRs as a request surface: no.** Set this to `yes` if this repo later treats external PRs as feature requests in the triage queue.

When a skill says "publish to the issue tracker," create a GitHub issue. When it says "fetch the relevant ticket," read the referenced issue and comments.

## Wayfinding

Use one map issue with child issues. Record blockers as GitHub issue dependencies when available; otherwise add a `Blocked by: #<number>` line to the child issue. Claim an unblocked ticket by assigning it to the person or agent doing the work. Resolve it with an answer comment, close it, and link the answer from the map.
