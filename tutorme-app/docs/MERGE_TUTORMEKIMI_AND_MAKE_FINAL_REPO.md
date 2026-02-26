# Merge TutorMekimi and make it the final repo

## Current state

- **Reconciled repo (all merges done):**  
  `Tutor-2` = `/Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor-2`  
  Connected to GitHub: `https://github.com/Stephen-Nazieh/Tutor`

- **TutorMekimi (has extra differences):**  
  `/Users/nazy/ADK_WORKSPACE/TutorMekimi`  
  Goal: merge it in, then make **TutorMekimi** the single local repo connected to GitHub.

---

## Step 1: Merge TutorMekimi into Tutor-2 and push to GitHub

Run in **Tutor-2**:

```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor-2

git remote add tutor-mekimi /Users/nazy/ADK_WORKSPACE/TutorMekimi
git fetch tutor-mekimi
git merge tutor-mekimi/main --allow-unrelated-histories -m "Merge TutorMekimi into reconciled repo"
# If conflicts: fix, then git add . && git commit -m "Resolve merge conflicts with TutorMekimi"

git push origin main
```

---

## Step 2: Make TutorMekimi the final local repo

Run in **TutorMekimi**:

```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi

git remote set-url origin git@github.com:Stephen-Nazieh/Tutor.git
git fetch origin
git checkout main
git reset --hard origin/main
```

After this, **TutorMekimi** is your one local repo, connected to GitHub.

---

## How to verify everything really merged into one repo

Use these checks in the repo you consider “final” (Tutor-2 before Step 2, or TutorMekimi after Step 2).

### 1. See that all four sources are in history

You should see commits that came from Tutor, Tutor-1, Tutor-2, and TutorMekimi (merge commits and their parents):

```bash
cd /path/to/your/final/repo   # Tutor-2 or TutorMekimi

git log --oneline -30
```

Look for merge commits like “Merge Tutor-1”, “Merge Tutor”, “Merge TutorMekimi”.

### 2. List every file in the repo (no .git)

From repo root:

```bash
cd /path/to/your/final/repo
find . -type f -not -path './.git/*' | sort > /tmp/all_files.txt
cat /tmp/all_files.txt
```

Confirm that important folders appear, e.g.:

- `tutorme-app/` (Next.js app)
- `infrastructure/` (CDK)
- Any other top-level dirs you expect from Tutor, Tutor-1, Tutor-2, TutorMekimi.

### 3. Compare file list with each source repo

Generate a file list from each of the four folders and diff. If nothing is missing, the merged repo has at least the same files (content may differ if you resolved conflicts).

```bash
# In your final repo (e.g. Tutor-2)
cd /Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor-2
find . -type f -not -path './.git/*' | sort > /tmp/tutor2_files.txt

# From each other repo (adjust paths if needed)
cd /Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor
find . -type f -not -path './.git/*' | sort > /tmp/tutor_files.txt

cd /Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor-1
find . -type f -not -path './.git/*' | sort > /tmp/tutor1_files.txt

cd /Users/nazy/ADK_WORKSPACE/TutorMekimi
find . -type f -not -path './.git/*' | sort > /tmp/tutormekimi_files.txt

# Combined list of all paths that existed in any repo (strip leading ./ for comparison)
cat /tmp/tutor2_files.txt /tmp/tutor_files.txt /tmp/tutor1_files.txt /tmp/tutormekimi_files.txt | sed 's|^\./||' | sort -u > /tmp/all_unique_paths.txt
wc -l /tmp/all_unique_paths.txt

# Check if your final repo has every path (paths in final repo)
cd /Users/nazy/ADK_WORKSPACE/TutorMeAnti/Tutor-2
find . -type f -not -path './.git/*' | sed 's|^\./||' | sort -u > /tmp/final_files.txt
# Any path in all_unique_paths that's missing from final?
comm -23 /tmp/all_unique_paths.txt /tmp/final_files.txt
```

If `comm -23` prints nothing, the final repo has at least one file for every path that existed in any of the four repos (so “all folders and files” are represented). If it prints paths, those are only in the other repos and not in the final one.

### 4. Spot-check important paths

Confirm these exist in the final repo (run from repo root):

```bash
# From Tutor-2 / AWS work
test -f tutorme-app/Dockerfile && echo "Dockerfile present" || echo "MISSING Dockerfile"
test -f tutorme-app/.github/workflows/deploy-aws.yml && echo "deploy-aws.yml present" || echo "MISSING"
test -d infrastructure && echo "infrastructure present" || echo "MISSING infrastructure"

# App and config
test -d tutorme-app/src && echo "tutorme-app/src present" || echo "MISSING"
test -f tutorme-app/package.json && echo "package.json present" || echo "MISSING"
test -f tutorme-app/prisma/schema.prisma && echo "prisma schema present" || echo "MISSING"
```

Add similar lines for any folder or file you know should have come from Tutor, Tutor-1, or TutorMekimi.

### 5. Confirm GitHub matches your final local

After pushing from Tutor-2 (and after Step 2, from TutorMekimi):

```bash
git fetch origin
git status
# Should say: Your branch is up to date with 'origin/main'.
git log origin/main --oneline -5
```

If `git status` says up to date and the log matches what you expect, the GitHub repo and your local final repo are the same.

---

## Summary

- **Merge steps:** Section above (add tutor-mekimi remote, merge, push; then in TutorMekimi fetch and reset to `origin/main`).
- **Verification:** Use the same repo as “final”, then run the checks in sections 1–5. When the file lists and spot-checks pass and `git status`/`git log origin/main` look right, you can treat that folder (and GitHub) as the one merged repo.
