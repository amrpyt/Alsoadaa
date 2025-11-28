# 🏷️ Git Tags - Complete Beginner's Guide

Welcome to your Git Tags learning journey! Think of me as your mentor guiding you step by step.

---

## 📖 **What Are Git Tags?**

### Simple Explanation:
Imagine you're writing a book and you save different versions:
- "Chapter 1 Draft" (commit)
- "Chapter 2 Draft" (commit)
- **"First Published Version"** ← This is a TAG!

**Git tags are like bookmarks** that mark important points in your project's history.

### Why Use Tags?
- ✅ Mark release versions (v1.0, v2.0)
- ✅ Remember important milestones
- ✅ Easy rollback to specific versions
- ✅ Deploy specific versions to production

---

## 🎯 **Real-World Example:**

Your Alsoadaa website journey:
```
Commit 1: "Initial setup"
Commit 2: "Added products page"
Commit 3: "Fixed bug"
Commit 4: "Added Sanity CMS"  ← Tag: v1.0.0 (First stable release!)
Commit 5: "Updated docs"
Commit 6: "New feature"       ← Tag: v1.1.0 (New version!)
```

Tags help you say: "Deploy v1.0.0 to production" instead of "Deploy that commit from 2 weeks ago... which one was it?"

---

## 📝 **Types of Tags:**

### 1. **Lightweight Tags** (Simple bookmark)
Like a sticky note: just a name pointing to a commit.

```bash
git tag v1.0.0
```

### 2. **Annotated Tags** (Professional bookmark)
Like a detailed note with:
- Tag name
- Your name
- Date
- Message explaining what this version is

```bash
git tag -a v1.0.0 -m "First stable release with Sanity CMS"
```

**🎓 Mentor Tip:** Always use annotated tags (-a) for releases! They're more professional.

---

## 🛠️ **Hands-On Practice:**

### **Step 1: Check Your Current Tags**
```bash
git tag
```
**What this does:** Shows all existing tags in your project.

### **Step 2: Create Your First Tag**
```bash
git tag -a v1.0.0 -m "Production deployment - Nov 12, 2025"
```

**Breaking it down:**
- `git tag` = Create a tag
- `-a` = Annotated (detailed)
- `v1.0.0` = Version name (your choice!)
- `-m "..."` = Your message

### **Step 3: View Tag Details**
```bash
git show v1.0.0
```
**What this shows:** Who created it, when, message, and the commit it points to.

### **Step 4: Push Tag to GitHub**
```bash
git push origin v1.0.0
```

**Or push ALL tags at once:**
```bash
git push origin --tags
```

---

## 📌 **Semantic Versioning (Version Numbers):**

Professional way to name versions:

```
v1.2.3
│ │ │
│ │ └── PATCH: Bug fixes (1.2.3 → 1.2.4)
│ └──── MINOR: New features (1.2.3 → 1.3.0)
└────── MAJOR: Breaking changes (1.2.3 → 2.0.0)
```

### Examples:
- `v1.0.0` - First release
- `v1.0.1` - Fixed a small bug
- `v1.1.0` - Added new feature (quote form)
- `v2.0.0` - Complete redesign

**🎓 Mentor Tip:** Start with v1.0.0 for your first production-ready version!

---

## 🎪 **Common Tag Commands:**

### **List All Tags**
```bash
git tag
# Shows: v1.0.0, v1.1.0, v2.0.0
```

### **List Tags with Pattern**
```bash
git tag -l "v1.*"
# Shows only: v1.0.0, v1.1.0, v1.2.0
```

### **Create Tag for Past Commit**
```bash
# First, find the commit hash
git log --oneline

# Then tag it
git tag -a v0.9.0 abc1234 -m "Beta release"
```

### **Delete a Tag Locally**
```bash
git tag -d v1.0.0
```

### **Delete a Tag on GitHub**
```bash
git push origin --delete v1.0.0
```

### **Checkout (Go to) a Tag**
```bash
git checkout v1.0.0
# WARNING: You'll be in "detached HEAD" state
# Just for viewing, not for editing!
```

---

## 🚀 **Using Tags with Dokploy:**

### **Scenario 1: Deploy Specific Version**

Instead of deploying "latest code", you can deploy a specific tagged version!

**In Dokploy:**
1. Go to your app settings
2. Change **Trigger Type** from "On Push" to "On Tag"
3. Now, Dokploy only deploys when you push a tag!

**Benefits:**
- ✅ Control EXACTLY when to deploy
- ✅ Test thoroughly before tagging
- ✅ No accidental deployments

### **Scenario 2: Stable Production Flow**

```bash
# 1. Work on features (many commits)
git commit -m "feat: add feature 1"
git commit -m "feat: add feature 2"
git commit -m "fix: bug fix"

# 2. Test everything locally
npm run build
npm run dev

# 3. When ready for production, create tag
git tag -a v1.1.0 -m "Release: New features and bug fixes"

# 4. Push tag to GitHub
git push origin v1.1.0

# 5. If Dokploy is set to "On Tag", it deploys automatically!
```

---

## 🎓 **Practice Exercise:**

Let's create your first production tag RIGHT NOW!

### **Exercise: Tag Your Current Production Deployment**

```bash
# Step 1: Make sure you're on main branch
git checkout main

# Step 2: Pull latest changes
git pull origin main

# Step 3: Create your first production tag
git tag -a v1.0.0 -m "Production Release - Alsoadaa Website with Sanity CMS
- Website deployed to alsoadaa.coderaai.com
- Sanity Studio deployed to alsoadaa.sanity.studio
- All features working correctly
- Deployed on Nov 12, 2025"

# Step 4: View your tag
git tag
git show v1.0.0

# Step 5: Push to GitHub
git push origin v1.0.0
```

---

## 🎯 **Real-World Workflow Example:**

### **Week 1: Development**
```bash
# Working on new features
git commit -m "feat: add product search"
git commit -m "feat: add filters"
git push origin main
```
❌ **NOT deployed** (because you set Dokploy to "On Tag" only)

### **Week 2: Ready for Release**
```bash
# Everything tested and working
git tag -a v1.1.0 -m "Release: Product search and filters"
git push origin v1.1.0
```
✅ **DEPLOYED!** Dokploy sees the tag and deploys automatically

### **Emergency Hotfix**
```bash
# Quick bug fix
git commit -m "fix: critical bug in search"
git tag -a v1.1.1 -m "Hotfix: Search bug"
git push origin v1.1.1
```
✅ **DEPLOYED!** New version deployed quickly

---

## 📊 **Tag Strategy for Your Project:**

### **Development Phase:**
- `v0.1.0`, `v0.2.0` - Beta versions
- Test with real users
- Iterate quickly

### **First Release:**
- `v1.0.0` - First production version
- This is what you have NOW!

### **Future Updates:**
- `v1.0.1` - Bug fixes
- `v1.1.0` - New features (like product search)
- `v1.2.0` - More features (like user accounts)
- `v2.0.0` - Major redesign or breaking changes

---

## 🚨 **Common Mistakes (And How to Avoid Them):**

### ❌ **Mistake 1: Forgetting -a flag**
```bash
git tag v1.0.0  # Lightweight tag (not recommended)
```
**Fix:** Always use `-a` for annotated tags:
```bash
git tag -a v1.0.0 -m "Your message"
```

### ❌ **Mistake 2: Forgetting to push tags**
```bash
git tag -a v1.0.0 -m "Release"
git push origin main  # ❌ Tag NOT pushed!
```
**Fix:**
```bash
git push origin v1.0.0  # ✅ Tag pushed!
```

### ❌ **Mistake 3: Typo in tag name**
```bash
git tag -a v1.0.0 -m "Release"
# Oops! Wanted v1.1.0
```
**Fix:**
```bash
# Delete locally
git tag -d v1.0.0
# Recreate with correct name
git tag -a v1.1.0 -m "Release"
```

---

## 🎉 **Advanced Tips (When You're Ready):**

### **1. Tag + Release Notes on GitHub**
After pushing a tag, go to GitHub → Releases → Create Release
- Attach binaries
- Write detailed changelog
- Professional!

### **2. Automatic Changelog**
Generate changelog from commits between tags:
```bash
git log v1.0.0..v1.1.0 --oneline
```

### **3. Rollback with Tags**
If v1.1.0 has a bug, rollback to v1.0.0:
```bash
git checkout v1.0.0
# Test it works
# Then deploy this version
```

---

## 📚 **Quick Reference Cheat Sheet:**

```bash
# CREATE TAGS
git tag -a v1.0.0 -m "Message"     # Create annotated tag
git tag v1.0.0                      # Create lightweight tag

# VIEW TAGS
git tag                             # List all tags
git show v1.0.0                     # Show tag details
git tag -l "v1.*"                   # List tags matching pattern

# PUSH TAGS
git push origin v1.0.0              # Push specific tag
git push origin --tags              # Push all tags

# DELETE TAGS
git tag -d v1.0.0                   # Delete locally
git push origin --delete v1.0.0    # Delete on GitHub

# USE TAGS
git checkout v1.0.0                 # View code at this tag
git describe                        # Show nearest tag
```

---

## 🎯 **Your Next Steps:**

1. ✅ **Read this guide** (you're doing it!)
2. ✅ **Create your first tag** (v1.0.0 for current production)
3. ✅ **Push it to GitHub**
4. ✅ **See it in GitHub** (go to your repo → Tags/Releases)
5. ✅ **Configure Dokploy** to deploy on tags (optional)

---

## 🤝 **Questions?**

As your mentor, I want you to understand:

**Q: When should I create a tag?**
A: When your code is tested and ready for production!

**Q: Can I move a tag to a different commit?**
A: Yes, but avoid it! Tags should be permanent markers.

**Q: What if I make a mistake in a tagged version?**
A: Create a new tag (v1.0.1) with the fix. Don't modify old tags!

**Q: Do I need tags if I'm not using Dokploy's "On Tag" feature?**
A: Yes! Tags help YOU track versions and roll back if needed.

---

## 🎓 **Graduation Task:**

Complete this to master Git tags:

1. Create tag `v1.0.0` for your current production code
2. Make a small change (add a comment somewhere)
3. Commit it
4. Create tag `v1.0.1`
5. Push both tags to GitHub
6. View them on GitHub
7. Try `git log v1.0.0..v1.0.1` to see the difference

**Congrats! You now understand Git tags!** 🎉

---

**Remember:** Tags are your friends. They help you:
- 📌 Mark important versions
- 🚀 Deploy with confidence
- ↩️ Rollback when needed
- 📊 Track your project's history

Now go create your first tag! 💪
