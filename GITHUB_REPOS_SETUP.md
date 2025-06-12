# GitHub Repositories Setup Guide

This guide will help you push all three projects to their respective GitHub repositories.

## Prerequisites
- Git installed on your system
- GitHub account with access to all three repositories
- GitHub Personal Access Token (if using HTTPS) or SSH keys configured

## 1. Main Portfolio - developer_portfolio

The main portfolio is already initialized with git. Push it using:

```bash
cd /var/www/cal.lueshub.com
git remote add origin https://github.com/Cal9233/developer_portfolio.git
# If you haven't already added the remote, otherwise skip the above line
git push -u origin main
```

## 2. Fitness Website - mel_fitness

```bash
cd /var/www/cal.lueshub.com/temp_repos/mel_fitness
git init
git branch -m main
git add -A
git commit -m "Initial commit: FitLife Pro fitness trainer website"
git remote add origin https://github.com/Cal9233/mel_fitness.git
git push -u origin main
```

## 3. LG ALCESA Website - alcesa_corp

```bash
cd /var/www/cal.lueshub.com/temp_repos/alcesa_corp
git init
git branch -m main
git add -A
git commit -m "Initial commit: LG ALCESA Corp construction services website"
git remote add origin https://github.com/Cal9233/alcesa_corp.git
git push -u origin main
```

## Authentication Options

### Option 1: HTTPS with Personal Access Token
When prompted for username and password:
- Username: Your GitHub username
- Password: Your Personal Access Token (not your regular password)

### Option 2: SSH
If you have SSH keys set up, change the remote URLs:
```bash
git remote set-url origin git@github.com:Cal9233/[repository-name].git
```

## After Pushing

1. Visit each repository on GitHub to verify the files were uploaded
2. Consider adding:
   - License file
   - GitHub Pages deployment (Settings > Pages)
   - Repository description and topics

## Repository Contents

### developer_portfolio
- Main portfolio website (index.html)
- Excludes sandbox projects (they have their own repos)

### mel_fitness
- Single-page fitness trainer website
- Fully responsive design
- Contact form ready for backend integration

### alcesa_corp
- Multi-section construction company website
- Complete with assets (logo images)
- Service showcase and contact functionality

## Deployment with GitHub Pages

To deploy any of these sites:
1. Go to repository Settings
2. Navigate to Pages section
3. Select Source: Deploy from a branch
4. Select Branch: main, folder: / (root)
5. Save and wait a few minutes
6. Your site will be available at: https://[username].github.io/[repository-name]/

---

Created: January 2024