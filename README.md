# PodOS - Landing with Payload CMS

Podology clinic website with integrated CMS system for easy content management.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

The project is already configured with Neon database. Check `.env.local`:

```env
DATABASE_URL="postgresql://..." # Already configured
PAYLOAD_SECRET="..."             # Already set
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

### 3. Start Dev Server

```bash
npm run dev
```

- **Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 📝 Content Management

### Login to Admin Panel

1. Open http://localhost:3000/admin
2. Login with your credentials

### Editing Services

1. Go to **Collections** → **Services**
2. Select language version:
   - 🇺🇦 **locale: ua** - Ukrainian
   - 🇵🇱 **locale: pl** - Polish
3. Click **Edit**
4. Modify:
   - Title, description, header text
   - Add/remove services (click **Add Item**)
   - Change prices, duration, descriptions
5. Click **Save** → **changes appear immediately on site!**

### Managing Certificates

1. **Upload Images First**:
   - Go to **Media** → **Create New**
   - Upload certificate image
   - Add alt text (description)
   - Save

2. **Add to Certificates Section**:
   - Go to **Certificates** → select language (ua/pl)
   - Click **Edit**
   - In "Certificates" section → **Add Item**
   - Select uploaded image
   - Add alt text
   - Save

### Adding New Service

1. Open **Services** (ua or pl)
2. Click **Edit**
3. Scroll to **Services** section
4. Click **Add Item**
5. Fill in:
   - **Title**: Service name (e.g., "Педикюр подологічний")
   - **Price**: Price (e.g., "від 200 злотих")
   - **Duration**: Duration (e.g., "до 1г 30хв")
   - **Treatment**: Description (optional)
6. Click **Save**

## 🌍 Localization

All content exists in two languages:

- **ua** - Ukrainian (primary)
- **pl** - Polish

When editing, make sure to update **both language versions**!

## 🏗️ Project Structure

```
podos-next/
├── app/
│   ├── (payload)/          # ⚙️ Admin panel (do not edit)
│   │   ├── admin/          # Admin UI
│   │   └── api/            # REST API
│   └── [locale]/           # 🌐 Frontend (ua/pl)
├── src/
│   ├── payload/
│   │   └── collections/         # Data structure definitions
│   ├── sections/                # Website sections
│   ├── lib/payload.ts           # API integration
│   └── translations/            # Static translations (non-CMS sections)
├── public/
│   └── media/                   # 📸 Uploaded images
└── payload.config.js            # CMS configuration
```

## 🔄 How It Works

1. **You edit content** in Admin Panel (http://localhost:3000/admin)
2. **Data saves to database** (Neon PostgreSQL)
3. **Website reads from CMS** every 60 seconds (auto-refresh)
4. **Changes appear automatically** - no deploy needed!

## 🚀 Deployment

### Deploy to Vercel

1. **Connect Repository** on Vercel
2. **Environment Variables** (copy from `.env.local`):
   - `DATABASE_URL` - your Neon connection string
   - `PAYLOAD_SECRET` - your secret key
   - `NEXT_PUBLIC_SERVER_URL` - `https://your-domain.vercel.app`
3. **Deploy!**

After deployment:

- Site: `https://your-domain.vercel.app`
- Admin: `https://your-domain.vercel.app/admin`

⚠️ **Change admin password immediately after first deployment!**

## 📚 Future: Adding Blog

When client needs a blog:

1. Create new collection in `src/payload/collections/BlogPosts.ts`
2. Add route in `app/[locale]/blog/[slug]/page.tsx`
3. Payload auto-generates admin UI!

Client will be able to:

- Write articles in rich text editor
- Add images
- Publish/unpublish
- All without developer help!

## 🐛 Troubleshooting

### Port 3000 is in use

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Can't login to admin

- Check credentials
- Go to http://localhost:3000/admin (without /ua or /pl prefix!)

### Changes don't appear on site

- Wait 60 seconds (cache)
- Or restart dev server: `Ctrl+C` → `npm run dev`

### Images not showing

- Check `public/media/` folder
- Make sure alt text is filled

## 📞 Need Help?

Check `INSTRUCTIONS_CLIENT.md` for detailed Ukrainian instructions for the client.

## 🛠️ Developer Commands

```bash
npm run dev              # Start development
npm run build            # Build for production
npm run payload          # Payload CLI
npm run type-check       # TypeScript check
```
