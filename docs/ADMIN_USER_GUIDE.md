# CEUS Admin User Guide

A guide for society executives managing the CEUS website. No coding required.

**Admin URL:** [https://www.ceusunsw.com/admin/login](https://www.ceusunsw.com/admin/login)

---

## Getting access

Admin accounts are created by the development team in Supabase. If you need access:

1. Email the IT director or development team with your society email address.
2. You will receive login credentials (email and password).
3. Sign in at `/admin/login`.

To reset a forgotten password, contact the development team — password resets are handled through Supabase.

---

## Signing in

1. Go to **https://www.ceusunsw.com/admin/login**
2. Enter your email and password.
3. Click **Sign In**.
4. You will land on the **Dashboard**.

To sign out, click **Sign Out** at the bottom of the sidebar.

> **Tip:** On mobile, tap the menu icon (☰) in the top-left to open the sidebar.

---

## Dashboard overview

The dashboard shows counts for:

| Stat | What it means |
|------|---------------|
| Total Events | Events listed on the public site |
| Total Sponsors | Sponsor companies on the sponsors page |
| Team Members | People shown on the team page |
| Contact Submissions | Messages from the contact form (new ones highlighted in red) |

Use the **Quick Actions** links to jump to each section.

---

## Managing events

**Admin:** `/admin/events` · **Public page:** `/events`

### Add an event

1. Click **Add Event**.
2. Fill in the form:

| Field | Guidance |
|-------|----------|
| Title | Event name as it should appear on the site |
| Date | Date and time of the event |
| Category | Flagship, Careers, Social, Academic, Welfare, Recruitment, Collaboration, or Other |
| Description | Short summary shown on the event card |
| Image | Upload a poster (max 5 MB; JPG or PNG recommended) |
| Facebook Event Link | Full URL to the Facebook event page (optional) |

3. Click **Save**.

Changes appear on the public events page immediately.

### Edit or delete an event

- Click a row in the table to **edit**.
- Click the delete icon to **remove** an event. You will be asked to confirm.

### Tips

- Upload a portrait-oriented poster image for best display on event cards.
- Past events can be deleted once the semester ends, or left up as a record.
- Use the **Flagship** category for major society events (O-Week, Industry Night, etc.).

---

## Managing sponsors

**Admin:** `/admin/sponsors` · **Public page:** `/sponsors`

### Add a sponsor

1. Click **Add Sponsor**.
2. Fill in the form:

| Field | Guidance |
|-------|----------|
| Name | Company name |
| Tier | Diamond, Gold, Silver, Bronze, Community, Major, Supporting, or Other |
| Description | Text shown when a visitor clicks the sponsor logo |
| Logo | Upload the company logo (transparent PNG works best) |
| Website URL | Link to the sponsor's website |
| Featured | Check to highlight this sponsor in the spotlight section |

3. Click **Save**.

### Tips

- Match tier names to sponsorship agreements for the year.
- Only one or two sponsors should be marked **Featured** at a time.
- Logo images should be roughly horizontal (wider than tall).

---

## Managing team members

**Admin:** `/admin/team` · **Public page:** `/team`

### Add a team member

1. Click **Add Member**.
2. Fill in the form:

| Field | Guidance |
|-------|----------|
| Name | Full name |
| Role | Position title (e.g. "President", "Events Director") |
| Categories | One or more groups: Executives, Year Representatives, IT, Marketing, Socials, Industry, Admin |
| Sort Order | Number controlling display order within a category (lower = first) |
| Photo | Upload a headshot (square works best) |
| Email | Society or UNSW email (optional, shown on team page) |
| LinkedIn URL | Full LinkedIn profile URL (optional) |

3. Click **Save**.

A member can belong to multiple categories (e.g. an Executive who is also in Marketing).

### Handover at end of year

1. Add new executives with updated roles and photos.
2. Remove or update outgoing members.
3. Adjust **Sort Order** so the President appears first within Executives.

---

## Managing jobs

**Admin:** `/admin/jobs` · **Public page:** `/jobs`

### Add a job listing

1. Click **Add Job**.
2. Fill in the form:

| Field | Guidance |
|-------|----------|
| Title | Role title (e.g. "Process Engineering Intern") |
| Company Name | Hiring company |
| Company Website | Optional |
| Company Logo | Optional — upload or leave blank |
| Type | Internship, Graduate Program, Vacation Program, etc. |
| Locations | One location per line (e.g. "Sydney, NSW") |
| Industry Field | Select from the dropdown or type a custom field |
| Working Rights | Select all visa/citizenship requirements that apply |
| Description | Full job description |
| One-liner | Short summary shown on the job card (optional) |
| Application URL | Link where students apply |
| Source URLs | One URL per line — where the listing was found (optional) |
| Close Date | When applications close (optional) |
| Sponsored | Check if this is a CEUS partner listing |
| Outdated | Check to hide stale listings without deleting them |

3. Click **Save**.

### Tips

- Mark listings as **Outdated** instead of deleting them — this hides them from the public page while keeping a record.
- Review the job board at the start of each semester and flag outdated roles.
- Use **Sponsored** for positions from CEUS sponsor companies.

---

## Managing contact submissions

**Admin:** `/admin/contacts`

When someone submits the contact form on `/contact`, their message appears here.

### View a message

Click a row to open the full message. Opening a **New** message automatically marks it as **Read**.

### Update status

Inside the message view, change the status:

| Status | Meaning |
|--------|---------|
| New | Just received, not yet opened |
| Read | Opened by an executive |
| Replied | You have responded to the sender |

### Delete a message

Click delete and confirm. Use this for spam or resolved enquiries you no longer need.

### Tips

- Check contacts regularly — the dashboard highlights the count of new messages.
- Reply to the sender's email directly (the admin panel does not send replies on your behalf).

---

## Uploading images

Image uploads are built into the event, sponsor, team, and job forms.

1. Click the upload area or **Choose Image**.
2. Select a file from your computer.
3. Wait for the upload to complete — a preview will appear.
4. Save the form.

**Limits:**

- Images only (JPG, PNG, GIF, WebP)
- Maximum file size: **5 MB**
- Images are stored in Supabase and served on the public site automatically

**Recommendations:**

| Content | Recommended format |
|---------|-------------------|
| Event posters | JPG, ~800×1200 px |
| Sponsor logos | PNG with transparent background |
| Team photos | JPG or PNG, square crop |
| Company logos (jobs) | PNG, ~200×200 px |

---

## Common questions

**Changes aren't showing on the public site**

- Hard-refresh the page (Ctrl+Shift+R or Cmd+Shift+R).
- Confirm you clicked **Save** and saw the table update.
- If the issue persists, contact the development team.

**I can't log in**

- Check you are using the correct email and password.
- Make sure you are on `/admin/login`, not the public site.
- Contact the development team to reset your password.

**Upload failed**

- Check the file is under 5 MB and is an image format.
- Try a different browser.
- Contact the development team if the error persists.

**I accidentally deleted something**

- Contact the development team immediately — deleted records may be recoverable from Supabase backups.

---

## Quick reference

| Task | Where |
|------|-------|
| Log in | `/admin/login` |
| Dashboard | `/admin` |
| Add/edit events | `/admin/events` |
| Add/edit sponsors | `/admin/sponsors` |
| Add/edit team | `/admin/team` |
| Add/edit jobs | `/admin/jobs` |
| View contact messages | `/admin/contacts` |
| View public site | `/` (click "Back to website" on the login page) |

---

## Getting help

For technical issues, new admin accounts, or features not covered here, contact the CEUS IT team or development team.

Developer documentation: [docs/README.md](README.md)
