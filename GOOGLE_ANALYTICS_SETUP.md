# 📊 Google Analytics Setup Guide

Complete step-by-step guide for setting up Google Analytics (GA4) on your Roots Dental website.

---

## Step 1: Create a Google Account (if you don't have one)

1. Go to [Google Account](https://accounts.google.com)
2. Create a free account using your email
3. Keep the login details handy — you'll use this for GA and other Google services

---

## Step 2: Sign In to Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click **Start measuring** to create a new property

---

## Step 3: Create a GA4 Property

1. Enter your **Property Name** → e.g., `Roots Dental Speciality`
2. Choose **Reporting Time Zone** → your local time
3. Select **Currency** → e.g., `INR`
4. Click **Next**
5. Fill in your **Business Information** (Industry & Business Size) → optional for minimal setup
6. Click **Create**

---

## Step 4: Set Up a Web Data Stream

1. Click **Data Streams** → **Add Stream** → **Web**
2. Enter your **Website URL** → e.g., `https://www.rootsdentalspeciality.com`
3. Name the stream → e.g., `Homepage`
4. Click **Create Stream**

---

## Step 5: Get the Tracking Code (Global Site Tag)

1. Under the **Tagging Instructions** section → choose **"Add new on-page tag"** → **Global Site Tag (gtag.js)**
2. Copy the code snippet provided:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. Replace `G-XXXXXXXXXX` with your GA4 Measurement ID

---

## Step 6: Add the Code to Your Website

1. Open your homepage HTML or template (`index.html`)
2. Paste the snippet inside the `<head>` tag on every page you want to track
3. Save changes and upload to your server (`public_html` for cPanel users)

### Where to Add:

**For Homepage (`index.html`):**
```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Roots Dental Speciality Clinic</title>
    
    <!-- Google Analytics - Add Here -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
    
    <link rel="stylesheet" href="css/main.css" />
</head>
```

**For Sub-pages (`privacy-policy.html`, `terms-of-service.html`):**
- Add the same code in the `<head>` section of each page

---

## Step 7: Verify Installation

1. Open your website in a new tab
2. Go to **Google Analytics** → **Realtime Report**
3. You should see your visit appear immediately

✅ **If yes** → tracking is working!

---

## Step 8: Enable Minimal Click Tracking (Optional)

GA4 has **Enhanced Measurement** by default, which tracks:
- ✅ Pageviews
- ✅ Scroll tracking
- ✅ Outbound link clicks
- ✅ File downloads

### Track Specific Button Clicks (e.g., "Book Appointment"):

```html
<button onclick="gtag('event', 'book_appointment', {'event_category':'CTA','event_label':'Header Button'});">
  Book Appointment
</button>
```

Event will appear in **GA → Events** → track user engagement.

---

## Step 9: Test Events

1. Click buttons on your website
2. Check **Realtime** → **Events** in GA4
3. Confirm they appear correctly

---

## Step 10: Done! Optional Improvements

### Additional Setup:
1. **Link GA4 to Google Search Console** → track organic search traffic
2. **Add Conversions** for booking submissions
3. **Set up Goals or Events** if you want detailed tracking later

---

## ✅ Minimal Setup Summary

1. ✅ Create GA4 property → Web data stream
2. ✅ Copy Global Site Tag → paste in `<head>`
3. ✅ Use Enhanced Measurement for clicks & pageviews
4. ✅ Optional: add `gtag('event')` for CTA buttons

---

## 📝 After Setup Checklist

- [ ] GA4 property created
- [ ] Web data stream configured
- [ ] Tracking code added to `<head>` of all pages
- [ ] Code uploaded to server
- [ ] Realtime report shows active users
- [ ] Enhanced Measurement enabled
- [ ] (Optional) Custom events for booking button
- [ ] (Optional) Linked to Google Search Console

---

## 🔧 Troubleshooting

### Issue: No data showing in Realtime Report

**Solutions:**
- Check if code is in `<head>` section
- Verify Measurement ID is correct
- Clear browser cache and reload
- Check browser console for errors
- Ensure ad blockers are disabled

### Issue: Events not tracking

**Solutions:**
- Verify Enhanced Measurement is enabled
- Check event syntax in button onclick
- Test in Incognito mode
- Allow 24-48 hours for some reports

---

## 📊 What You Can Track

With this minimal setup, you'll see:

1. **Pageviews** - Which pages users visit
2. **User Location** - Where visitors come from
3. **Device Type** - Mobile, Desktop, Tablet
4. **Traffic Sources** - Google, Direct, Social Media
5. **Engagement Time** - How long users stay
6. **Scroll Depth** - How far users scroll
7. **Outbound Clicks** - Links to social media, etc.
8. **Custom Events** - Book Appointment clicks (if configured)

---

## 🎯 Next Steps

1. Monitor traffic for a few days
2. Check which pages get most views
3. Track conversion rate for booking appointments
4. Use data to optimize your website

---

**🎉 Congratulations! Your website now has Google Analytics tracking!**
