# 🎯 Git Tags - Hands-On Practice

Let's practice with REAL commands you can run RIGHT NOW!

---

## 🏃 **Exercise 1: Your First Tag (5 minutes)**

### **Goal:** Create a tag for your current production code.

```bash
# 1. Open your terminal in the project folder
cd "d:\Vibe Coding\02-Real PRojects with Clints\Alsoadaa"

# 2. Check what branch you're on
git branch
# You should see: * main

# 3. Make sure you have latest code
git pull origin main

# 4. Create your FIRST production tag! 🎉
git tag -a v1.0.0 -m "Production Release - Alsoadaa with Sanity CMS
✅ Website: https://alsoadaa.coderaai.com
✅ Studio: https://alsoadaa.sanity.studio
✅ Features: Products, Pages, Services, Forms
✅ Deployed: Nov 12, 2025"

# 5. View your tag
git tag

# 6. See detailed info
git show v1.0.0

# 7. Push to GitHub
git push origin v1.0.0
```

### **✅ Success Check:**
- Go to GitHub: https://github.com/amrpyt/Alsoadaa/tags
- You should see `v1.0.0` there!

---

## 🏃 **Exercise 2: Practice with Docs (10 minutes)**

### **Goal:** Learn that tags mark SPECIFIC commits.

```bash
# 1. Make a small change (add this file to git)
git add learning/

# 2. Commit it
git commit -m "docs: add Git tags learning tutorial"

# 3. Push to GitHub
git push origin main

# 4. Create a NEW tag for this update
git tag -a v1.0.1 -m "Minor update: Added Git tags tutorial"

# 5. Push the tag
git push origin v1.0.1

# 6. View all your tags
git tag
# You should see:
# v1.0.0
# v1.0.1

# 7. See the difference between tags
git log v1.0.0..v1.0.1 --oneline
```

### **What You Learned:**
- Each tag points to a SPECIFIC commit
- You can have multiple tags
- You can see what changed between versions!

---

## 🏃 **Exercise 3: View Past Versions (5 minutes)**

### **Goal:** Time travel to previous versions.

```bash
# 1. See all your tags with dates
git tag

# 2. View code at v1.0.0
git checkout v1.0.0

# 3. Look around (files are at v1.0.0 state!)
ls

# 4. Go back to latest code
git checkout main

# 5. View code at v1.0.1
git checkout v1.0.1

# 6. Back to latest
git checkout main
```

### **⚠️ Important:**
When you `git checkout v1.0.0`, you're in "detached HEAD" state.
- **DON'T make changes here!**
- **Only for viewing!**
- **Always `git checkout main` to go back!**

---

## 🏃 **Exercise 4: Tag a Past Commit (Advanced)**

### **Goal:** Tag something you already committed.

```bash
# 1. View your commit history
git log --oneline -10

# You'll see something like:
# feedba7 docs: complete post-deployment tasks
# e2e2bf4 feat: add appId to Sanity CLI config
# 9e565ab docs: mark production deployment tasks

# 2. Let's say you want to tag the Sanity deployment
#    Copy the commit hash (e.g., e2e2bf4)

# 3. Create a tag for that specific commit
git tag -a v0.9.0 e2e2bf4 -m "Beta: Sanity Studio deployed"

# 4. View your tags
git tag
# Now you see: v0.9.0, v1.0.0, v1.0.1

# 5. Push it
git push origin v0.9.0
```

---

## 🏃 **Exercise 5: Fix a Mistake (5 minutes)**

### **Goal:** Learn to delete and recreate tags.

```bash
# 1. Create a tag with a typo
git tag -a v1.0.2 -m "Oops wrong version!"

# 2. Realize the mistake!
git tag
# Shows: v0.9.0, v1.0.0, v1.0.1, v1.0.2

# 3. Delete it locally
git tag -d v1.0.2

# 4. Verify it's gone
git tag
# Shows: v0.9.0, v1.0.0, v1.0.1

# 5. If you already pushed it, delete from GitHub too:
# git push origin --delete v1.0.2
```

---

## 🏃 **Exercise 6: Configure Dokploy (10 minutes)**

### **Goal:** Make Dokploy deploy ONLY when you create tags.

### **Step 1: Go to Dokploy**
1. Open: https://dokploy.coderaai.com
2. Navigate to your `alsoadaa-website-main` app
3. Click **General** tab

### **Step 2: Change Trigger Type**
1. Find **Trigger Type** dropdown
2. Change from "On Push" to **"On Tag"**
3. Click **Save**

### **Step 3: Test It!**
```bash
# A. Make a small change
echo "<!-- Test -->" >> index.html

# B. Commit and push
git add index.html
git commit -m "test: add comment"
git push origin main
```
**Result:** ❌ No deployment! (because no tag)

```bash
# C. Create a tag
git tag -a v1.1.0 -m "Release: Tag-based deployment test"
git push origin v1.1.0
```
**Result:** ✅ Deployment starts! (because of tag)

---

## 🎓 **Challenge: Professional Workflow**

### **Scenario:** You're adding a new feature.

```bash
# Day 1-3: Development
git checkout -b feature/product-search
# ... work on feature ...
git commit -m "feat: add product search"
git commit -m "feat: add filters"
git push origin feature/product-search

# Day 4: Merge to main
git checkout main
git merge feature/product-search
git push origin main
# ❌ Not deployed yet (On Tag mode)

# Day 5: Test locally
npm run dev
# Everything works!

# Day 6: Release to production
git tag -a v1.2.0 -m "Release v1.2.0: Product Search Feature

New Features:
- ✨ Product search functionality
- ✨ Advanced filters
- ✨ Better UX

Testing:
- ✅ Local testing passed
- ✅ All features working
- ✅ No bugs found"

git push origin v1.2.0
# ✅ Deployed automatically!
```

---

## 📊 **Your Tagging Strategy**

Copy this and customize it:

### **For Small Changes:**
```
v1.0.0 → v1.0.1 (bug fixes)
v1.0.1 → v1.0.2 (more bug fixes)
```

### **For New Features:**
```
v1.0.2 → v1.1.0 (new feature!)
v1.1.0 → v1.2.0 (another feature!)
```

### **For Major Changes:**
```
v1.9.0 → v2.0.0 (complete redesign!)
```

---

## ✅ **Completion Checklist**

Check off as you complete:

- [ ] Exercise 1: Created v1.0.0 tag
- [ ] Exercise 2: Created v1.0.1 tag
- [ ] Exercise 3: Viewed past versions
- [ ] Exercise 4: Tagged a past commit
- [ ] Exercise 5: Deleted a tag
- [ ] Exercise 6: Configured Dokploy to "On Tag"
- [ ] Viewed tags on GitHub
- [ ] Understand semantic versioning
- [ ] Know when to use tags
- [ ] Can create, view, and delete tags

---

## 🎉 **Congratulations!**

You now know:
- ✅ What Git tags are
- ✅ When to use them
- ✅ How to create them
- ✅ How to use them with Dokploy
- ✅ Professional versioning strategy

**You're no longer a beginner in Git tags!** 🚀

---

## 📞 **Need Help?**

Common issues:

**Q: "git push origin v1.0.0" says "already exists"**
A: You already pushed it! Check `git tag` to see all tags.

**Q: Tag doesn't appear on GitHub**
A: Did you `git push origin v1.0.0`? Just `git push` won't push tags!

**Q: Dokploy still deploys on every commit**
A: Check Trigger Type is set to "On Tag", not "On Push".

**Q: Can't find my tags on GitHub**
A: Go to: https://github.com/amrpyt/Alsoadaa/tags

---

## 🎓 **Next Learning Steps:**

Once you master tags, learn:
1. **Git Branches** (you already know basics!)
2. **Git Rebase** (advanced)
3. **Git Stash** (save work temporarily)
4. **GitHub Releases** (professional releases with notes)

**Keep learning! You're doing great!** 💪
