# Fix Repository Issues

## The Problem
The LG ALCESA assets were accidentally pushed to the developer_portfolio repository. Here's how to fix it:

## Step 1: Update the Main Portfolio Repository

```bash
cd /var/www/cal.lueshub.com
git push origin main
```

This will remove the LG_folder from the portfolio repository.

## Step 2: Set up the Fitness Website Repository

```bash
cd /var/www/cal.lueshub.com/temp_repos/mel_fitness
git init
git branch -m main
git add -A
git commit -m "Initial commit: FitLife Pro fitness trainer website"
git remote add origin https://github.com/Cal9233/mel_fitness.git
git push -u origin main
```

## Step 3: Set up the LG ALCESA Repository (with the correct assets)

```bash
cd /var/www/cal.lueshub.com/temp_repos/alcesa_corp
git init
git branch -m main
git add -A
git commit -m "Initial commit: LG ALCESA Corp construction services website with company assets"
git remote add origin https://github.com/Cal9233/alcesa_corp.git
git push -u origin main
```

## What This Fixes

1. **developer_portfolio** - Removes the LG_folder assets that don't belong there
2. **mel_fitness** - Creates a clean fitness website repository
3. **alcesa_corp** - Creates the construction website WITH the proper logo assets

## Verification

After pushing, verify:
- developer_portfolio should NOT have assets/LG_folder
- alcesa_corp SHOULD have assets/images/ with all the logo files
- mel_fitness should have just the index.html and README

## Note
The assets (Document.docx and logo images) are now properly included in the alcesa_corp repository where they belong.