# 🏷️ Git Tags - Quick Cheat Sheet

**Print this and keep it on your desk!** 📌

---

## ⚡ **Most Common Commands**

```bash
# CREATE TAG (most important!)
git tag -a v1.0.0 -m "Your message here"

# PUSH TAG TO GITHUB
git push origin v1.0.0

# VIEW ALL TAGS
git tag

# SHOW TAG DETAILS
git show v1.0.0

# DELETE TAG
git tag -d v1.0.0                  # Delete locally
git push origin --delete v1.0.0   # Delete on GitHub
```

---

## 📝 **Version Numbering**

```
vMAJOR.MINOR.PATCH

v1.2.3
│ │ │
│ │ └── PATCH: Bug fixes (1.2.3 → 1.2.4)
│ └──── MINOR: New features (1.2.3 → 1.3.0)
└────── MAJOR: Breaking changes (1.2.3 → 2.0.0)
```

**Examples:**
- `v1.0.0` = First release
- `v1.0.1` = Bug fix
- `v1.1.0` = New feature
- `v2.0.0` = Major update

---

## 🎯 **When to Tag?**

✅ **DO tag when:**
- Ready for production
- Tested and working
- Want to deploy this version
- Reached a milestone

❌ **DON'T tag when:**
- Still developing
- Code not tested
- Just minor doc changes
- Experimental features

---

## 🚀 **Dokploy Integration**

### **On Push Mode** (Current)
- Every commit → Deploy
- Fast but risky
- Good for: Development

### **On Tag Mode** (Recommended)
- Only tags → Deploy
- Controlled releases
- Good for: Production

**Switch in Dokploy:**
General Tab → Trigger Type → "On Tag"

---

## 📊 **Typical Workflow**

```bash
# 1. Work on features
git commit -m "feat: new feature"
git push origin main

# 2. Test locally
npm run build
npm run dev

# 3. Ready for production?
git tag -a v1.1.0 -m "Release: New features"
git push origin v1.1.0

# 4. Deployed! 🎉
```

---

## 🔥 **Emergency Commands**

### **Rollback to Previous Version**
```bash
# 1. Find the good version
git tag

# 2. Checkout that version
git checkout v1.0.0

# 3. Create new branch
git checkout -b hotfix

# 4. Or just deploy that tag in Dokploy
```

### **Fix Wrong Tag**
```bash
# Delete locally
git tag -d v1.0.0

# Delete on GitHub
git push origin --delete v1.0.0

# Create correct tag
git tag -a v1.1.0 -m "Correct version"
git push origin v1.1.0
```

---

## 💡 **Pro Tips**

1. **Always use `-a` for tags**
   ```bash
   git tag -a v1.0.0 -m "Message"  # ✅ Good
   git tag v1.0.0                  # ❌ Bad
   ```

2. **Write good messages**
   ```bash
   # ✅ Good
   git tag -a v1.1.0 -m "Release: Product search feature
   - Added search bar
   - Added filters
   - Fixed bugs"

   # ❌ Bad
   git tag -a v1.1.0 -m "update"
   ```

3. **Push tags separately**
   ```bash
   git push origin main   # ❌ Doesn't push tags
   git push origin v1.0.0 # ✅ Pushes tag
   ```

4. **View tags on GitHub**
   ```
   https://github.com/YOUR-USERNAME/YOUR-REPO/tags
   ```

---

## 📅 **Release Schedule Example**

```
v1.0.0 - Nov 12, 2025 - Initial release
v1.0.1 - Nov 15, 2025 - Bug fixes
v1.1.0 - Nov 20, 2025 - New features
v1.1.1 - Nov 22, 2025 - Hotfix
v1.2.0 - Nov 30, 2025 - More features
v2.0.0 - Dec 15, 2025 - Major redesign
```

---

## ⚠️ **Common Mistakes**

| Mistake | Solution |
|---------|----------|
| Forgot to push tag | `git push origin v1.0.0` |
| Used lightweight tag | Always use `-a` flag |
| Typo in version | Delete and recreate |
| Tag wrong commit | Delete, checkout correct commit, tag again |
| Can't see tag on GitHub | Did you push it? |

---

## 🎯 **Quick Decision Tree**

```
Need to deploy?
    │
    ├─ Yes → Is code tested?
    │         │
    │         ├─ Yes → Create tag! 🎉
    │         │         git tag -a vX.X.X -m "Message"
    │         │         git push origin vX.X.X
    │         │
    │         └─ No → Test first!
    │
    └─ No → Just commit and push
              git push origin main
```

---

## 📚 **Learn More**

- README.md - Complete tutorial
- PRACTICE.md - Hands-on exercises
- [Git Docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

---

## ✅ **Your First Tag Checklist**

```bash
[ ] git tag -a v1.0.0 -m "First production release"
[ ] git push origin v1.0.0
[ ] Check on GitHub
[ ] Configure Dokploy (optional)
[ ] Celebrate! 🎉
```

---

**Keep this cheat sheet handy!** 
You'll refer to it often when creating releases. 📌
