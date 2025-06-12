# GitHub Setup Instructions

## 1. Main Portfolio Repository

The main portfolio is ready to push. Run these commands:

```bash
cd /var/www/cal.lueshub.com
git remote add origin https://github.com/Cal9233/developer_portfolio.git
git push -u origin main
```

If prompted for authentication, use your GitHub username and personal access token.

## Repository Structure

This repository contains:
- `index.html` - Main portfolio website
- `assets/` - Images and resources (excluding LG_folder which is gitignored)
- `.gitignore` - Configured to exclude sandbox projects

The sandbox projects have been excluded as they have their own repositories.