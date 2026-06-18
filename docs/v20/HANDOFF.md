# FEDDA Hub v20 Handoff

## Migration Note (2026-06-12)
- Clean v18 workspace created at H:\Fedda-Hub\Fedda_hub_v18\
- git-repo/ = minimal source-of-truth (this repo)
- install/  = test installation clone (bootstrapped from git-repo + runtime added locally)
- Source was selectively copied **only** from H:\Fedda-Hub\Fedda_hub_v18\git-repo (no writes to v17 ever occurred).
- All v17 / v16 path references, version labels, and old GitHub URLs updated to v18 + https://github.com/Feddakalkun/Fedda_hub-v18.git
- docs/v20/ and handoff_latest.md (detailed history) deliberately excluded per "extremely clean and minimal at the start" rule.
- First commit will be the clean modular foundation.

## Latest Update - Workflow Standard Baseline (carried from v16)
- New workflows follow docs/v20/WORKFLOW_STANDARD.md (copy/adapt the proven template).
- Use backend/workflows/HF-downloader/HFdownloadernode.json as the reusable downloader template.
- Preserve working core even when booster modules are disabled.
- Do not move runtime folders into git (ComfyUI, embedded Python, Ollama, models, outputs, cache, logs, venvs, node_modules stay local/runtime only).
- Keep breadcrumbs updated in docs/v20/BREADCRUMBS.md.

## Current Goal
Turn FEDDA Hub into a maintainable modular core + booster-pack architecture (already achieved in v16 foundation) while keeping a pristine, minimal git history and strict separation between the git development tree and test install trees.

## Current State (post v18 bootstrap)
- git-repo at H:\Fedda-Hub\Fedda_hub_v18\git-repo (this)
- install test clone at H:\Fedda-Hub\Fedda_hub_v18\install\app
- Frontend module registry: frontend/src/modules/registry.ts
- Backend module manifest + loader: config/modules.json + backend/module_service.py
- Shared workflow pages + cockpit UI present
- All essential workflow JSONs under backend/workflows/
- Installer / update logic in scripts/ (module-aware via module_nodes.ps1)
- Fresh docs/v20/ only

## Important Constraints
- Preserve a working core build even when booster modules are disabled.
- Runtime folders NEVER in git-repo.
- git-repo and install/app stay easy to keep in sync (copy from git-repo â†’ install/app after each dev change).
- Update this handoff after every meaningful step.

## Next Recommended Steps
1. Verify npm run build + python compiles + git status in git-repo.
2. Bootstrap a full test run in install/ (copy runtime or execute install scripts).
3. Confirm key workflows still work from the FEDDA UI.
4. Append to BREADCRUMBS.md.
5. Push first commit.

## Latest Update (2026-06-18)
- Major run.bat launcher overhaul complete: quoting normalized, main thread no longer blocks on waits/probes, services in separate titled persistent consoles.
- Launcher window now guaranteed to stay open with clear "done" message + pause + cmd/k.
- BREADCRUMBS.md and HANDOFF updated in both repo/docs/v20 and install/app/docs/v20.
- Always sync run.bat changes between repo and install/app after fixes.