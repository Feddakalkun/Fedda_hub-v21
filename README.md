# FEDDA Hub v18

FEDDA Hub v18 is the modular distribution branch for a workflow-first local AI studio.

## v18 scope

The core UI stays focused on five areas:

- Image Studio
- Video Studio
- Gallery, with images and videos together
- LoRA & Character
- Ollama Models

Workflow families are being separated into core and booster modules so the app can stay usable even when an optional model pack or custom node set is not installed.

Current module ownership lives in:

```text
config\modules.json
```

v18 begins with a clean minimal git-repo (source of truth) + separate install/ test tree. The modular foundation (core + boosters) from the v16 pass is preserved. Modules describe ownership and guide installer node selection, but heavy workflow code has not been physically moved yet.

## Install layout

For local staging, put the one-click installer in any folder you want to use as the install root. The installer creates:

```text
<your chosen folder>\
  FEDDA_v18_Installer.bat
  app\                 # local runtime install target, ignored by git
  logs\                # installer logs
```

The single-file installer clones or updates:

```text
https://github.com/Feddakalkun/Fedda_hub-v18
```

into `install\app`, then runs `scripts\install.bat LITE`.

That same repository is the active v18 development remote.

## Runtime policy

Runtime and generated assets are not committed:

- `ComfyUI/`
- `python_embeded/`
- `venv/`
- `node_modules/`
- `ollama_embeded/`
- model folders and model binaries
- cache, logs, temp, output folders

The installer bootstraps those locally.

## Development checks

From the repo folder:

```powershell
cd <your repo folder>
.\scripts\smoke_clean_install.ps1
cd frontend
npm.cmd run build
```

Module manifest checks:

```powershell
python -m py_compile backend\module_service.py backend\server.py
powershell -ExecutionPolicy Bypass -Command ". .\scripts\module_nodes.ps1; Get-FeddaNodeConfig -RootPath (Get-Location).Path"
```

