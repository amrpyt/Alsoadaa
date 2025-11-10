# Migration Instructions

## 🚨 Action Required: Add Sanity Token

Before running the migration, you need to add your Sanity write token to `.env.local`.

### Steps:

1. **Get your Sanity write token:**
   - Go to https://www.sanity.io/manage
   - Select your project: `wptd4h7v`
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Give it a name (e.g., "Migration Script")
   - Set permissions to "Editor" or "Administrator"
   - Copy the generated token

2. **Add token to .env.local:**
   - Open `.env.local`
   - Replace `your-write-token-here` with your actual token:
   ```env
   VITE_SANITY_TOKEN=skp1234567890abcdef...
   ```

3. **Run migration:**
   ```bash
   npm run migrate
   ```

## 📋 What the migration does:

- ✅ Imports 18 products from mockData.ts as Arabic documents
- ✅ Uploads images to Sanity CDN
- ✅ Creates initial page content (About, Contact) in Arabic
- ✅ Creates initial services in Arabic
- ✅ Shows progress and error messages

## 🔄 After Migration:

1. **Verify data in Studio:**
   ```bash
   cd studio
   npm run dev
   ```

2. **Translate content using AI Assist:**
   - Open any Arabic product in Studio
   - Click "Translate" button (AI Assist)
   - Select "English" and translate
   - Review and save
   - Repeat for "Russian"

3. **Test the application:**
   ```bash
   npm run dev
   ```
   - Navigate to Products page
   - Switch languages
   - Verify content loads correctly

## 🆘 Troubleshooting:

**Error: "Missing VITE_SANITY_TOKEN"**
- Make sure you added your token to `.env.local`
- Restart your terminal/IDE after adding the token

**Error: "Permission denied"**
- Verify your token has write permissions
- Check you're using the correct project ID: `wptd4h7v`

**Error: "Document already exists"**
- Delete existing documents in Studio first
- Or run with fresh dataset

## 📞 Need Help?

Check `scripts/README.md` for detailed migration documentation
Or refer to `SANITY_IMPLEMENTATION_STATUS.md` for current progress
