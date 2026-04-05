# DevSecOps Automated Security Pipeline

A production-ready DevSecOps pipeline built with GitHub Actions, featuring automated secret scanning, container vulnerability scanning, and continuous deployment.

## Live Demo
🌍 [Git Survival Guide](https://devsecops-secure-pipeline-production.up.railway.app)

## Pipeline Architecture
git push → Secret Scan (Gitleaks) → Container Scan (Trivy) → Deploy (Railway)

Every push to main triggers automatic security checks before deployment.
If any scan fails → deployment is blocked automatically.

## Security Tools

| Tool | Purpose | Trigger |
|------|---------|---------|
| Gitleaks | Detect leaked API keys, passwords, tokens | Every push |
| Trivy | Scan Docker image for CVEs | Every push |

## Tech Stack

- **Frontend** — React.js
- **Container** — Docker + nginx
- **CI/CD** — GitHub Actions
- **Secret Scanning** — Gitleaks v8.18.2
- **Container Scanning** — Trivy (CRITICAL severity)
- **Deployment** — Railway

## How It Works

### 1. Secret Scanning
Gitleaks scans every commit for hardcoded secrets using 150+ detection patterns including AWS keys, GitHub tokens, and database passwords.

### 2. Container Scanning  
Trivy scans the Docker image against the CVE database and blocks deployment if any CRITICAL vulnerability is found.

### 3. Auto Deploy
Only after both scans pass, the app is automatically deployed to Railway. No manual deployment needed.

## What I Learned
- Shift-left security — catching vulnerabilities at commit time
- Docker multi-stage builds for smaller, more secure images
- GitHub Actions workflow orchestration with job dependencies
- Real-world DevSecOps tooling (Gitleaks, Trivy)

## Project Structure

devsecops-secure-pipeline/
├── .github/
│   └── workflows/
│       └── security.yml    # Pipeline definition
├── src/                    # React app
├── Dockerfile              # Multi-stage build
├── nginx.conf              # Web server config
└── README.md

## Troubleshooting & Lessons Learned

Real problems I faced during this project and how I solved them.

---

### Problem 1 — Docker Desktop failed to start
**Error:** `Virtualization support not detected`

**Cause:** Hyper-V and WSL2 were not enabled on Windows.

**Solution:**
```powershell
dism /online /enable-feature /featurename:HypervisorPlatform /all /norestart
dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
bcdedit /set hypervisorlaunchtype auto
wsl --install
```
Then restarted the PC. Docker Desktop started normally after that.

**Lesson:** Docker on Windows requires WSL2 as a Linux kernel layer.
Docker is a Linux technology — it needs a Linux kernel to run,
even on Windows.

---

### Problem 2 — Gitleaks detected secrets but did not block the pipeline
**Error:** Pipeline stayed green even with leaked AWS credentials.

**Cause:** `gitleaks/gitleaks-action@v2` requires a paid license
to block the pipeline with exit code 1. Without a license,
it only shows a warning.

**Solution:** Install Gitleaks directly on the GitHub Actions runner
and run it manually with `--exit-code 1` flag:
```yaml
- name: Install Gitleaks
  run: |
    wget https://github.com/gitleaks/gitleaks/releases/download/v8.18.2/gitleaks_8.18.2_linux_x64.tar.gz
    tar -xzf gitleaks_8.18.2_linux_x64.tar.gz
    sudo mv gitleaks /usr/local/bin/

- name: Run Gitleaks
  run: |
    gitleaks detect \
      --source . \
      --log-opts "HEAD~1..HEAD" \
      --exit-code 1 \
      --verbose
```

**Lesson:** Always read the licensing terms of security tools.
Free tiers often have limitations that are not obvious at first.

---

### Problem 3 — TruffleHog kept blocking even after removing secrets
**Error:** Pipeline stayed red after removing AWS credentials from code.

**Cause:** TruffleHog scans the full Git history by default.
Even after removing credentials, they still existed in previous commits.
TruffleHog detected them in the diff of the "fix" commit itself
(the removed lines are still visible in the diff).

**Solution:** Switched back to Gitleaks with `--log-opts "HEAD~1..HEAD"`
to scan only the latest commit diff, not the full history.

**Lesson:** Secrets committed to Git are permanently compromised —
even after deletion. In a real company, you must:
1. Revoke the secret immediately
2. Purge Git history using BFG Repo Cleaner
3. Rotate with a new secret

---

### Problem 4 — Railway CLI kept failing with different errors
**Error 1:** `unexpected argument '--project-id' found`
**Error 2:** `--environment is required when using --project`
**Error 3:** `Multiple services found. Please specify --service`

**Cause:** Railway CLI changes its syntax frequently between versions.
Each new version broke the previous command flags.

**Solution:** Bypassed the CLI entirely and used Railway's GraphQL API
directly via `curl`:
```yaml
- name: Deploy via Railway API
  run: |
    curl -X POST \
      -H "Authorization: Bearer ${{ secrets.RAILWAY_TOKEN }}" \
      -H "Content-Type: application/json" \
      -d '{"query": "mutation { deploymentCreate(input: { projectId: \"${{ secrets.RAILWAY_PROJECT_ID }}\", environmentId: \"${{ secrets.RAILWAY_ENVIRONMENT_ID }}\" }) { id } }"}' \
      https://backboard.railway.app/graphql/v2
```

**Lesson:** When a CLI tool is unstable, go one level deeper
and use the API directly. APIs are more stable than CLIs
because they are versioned and documented contracts.

---

### Key Takeaways

| Problem | Root Cause | What I Learned |
|---------|-----------|----------------|
| Docker not starting | WSL2 missing | Docker needs Linux kernel on Windows |
| Gitleaks not blocking | Free tier limitation | Always check tool licensing |
| TruffleHog seeing old secrets | Git history is permanent | Secrets in Git = always compromised |
| Railway CLI failing | Unstable CLI syntax | Use APIs when CLIs are unreliable |