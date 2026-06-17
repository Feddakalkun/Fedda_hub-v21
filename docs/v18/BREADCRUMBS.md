# FEDDA Hub v18 Breadcrumbs

## 2026-06-12 - v18 Clean Bootstrap & Migration
- Created H:\Fedda-Hub\Fedda_hub_v18\git-repo (clean source of truth) and \install (test clone).
- Selective robocopy ONLY from H:\Fedda-Hub\Fedda_hub_v18\git-repo using strict runtime excludes (/XD ComfyUI python_embeded node_modules dist logs __pycache__ etc. + /XF *.db).
- Pruned docs/v18/ and handoff_latest.md (old detailed history / personal notes).
- Created fresh docs/v18/HANDOFF.md + BREADCRUMBS.md.
- Performed full reference hygiene: v17 → v18, Fedda_hub_v17 → Fedda_hub_v18, Fedda_hub_v16/v15 → new github (Fedda_hub-v18), APP_VERSION_LABEL, storage keys, remotes in scripts, generated_for in modules.json, README layout description, etc.
- Reused the complete v16-proven modular foundation (registry, module_service, config/modules.json, shared WorkflowWorkbench/cockpit, HF-downloader template, all current workflow JSONs, scripts/*).
- Initialized git inside git-repo/, added remote https://github.com/Feddakalkun/Fedda_hub-v18.git, first clean commit.
- Bootstrapped install/app/ as a copy of the cleaned git-repo (ready for runtime + installer testing).
- Validation: frontend build, py_compile, absence of all runtime folders, git status clean.


## 2026-06-14 - LTX Aspect Ratio Stability + Comfy Startup Robustness

- Fixed persistent "HTTPConnectionPool ... 127.0.0.1:8199 /upload/image" connection refused errors:
  - Added HTTP readiness probe in run.bat (after TCP listen, polls /system_stats until Comfy is fully responsive)
  - ComfyUI now also logs to logs/comfyui_latest.log while still showing live in the dedicated console window
  - Clean, user-friendly 503 errors from backend instead of raw requests ConnectionPool spam (with actionable "check the FEDDA ComfyUI Console window" guidance)
- Major LTX Video 2.3 fix: aspect ratios now actually work (no more forced 1:1)
  - Created shared frontend/src/config/ltx.ts with getLtxDimensions() + getSafeLtxAspect()
  - Proper pixel sizes (snapped to multiples of 32) for 16:9, 9:16, 4:3, 3:4, 1:1, 21:9 etc. at sensible resolutions
  - Explicit width + height now injected into the size-controlling nodes (AspectRatioImageSize for FLF, ImageResizeKJv2 for img2vid)
  - For the picky AspectRatioImageSize validator (only accepts 1:1/16:9/4:3/... not 9:16), we send a safe approved aspect string while the numeric w/h drive the real latent + resize
  - Both LtxFlfPage and LtxImg2VidPage now expose the ratio picker + live WxH feedback
  - Updated workflow_api.json mappings and LTX-23-flf.json default
- Other: cleaned stray .git in install/app, followed selective source-only sync rules for this commit
This file is the running trail for v18. Add a new dated entry after every meaningful update.

(Previous detailed v16 work is preserved in the v17 source tree and in backups if needed for archaeology.)
