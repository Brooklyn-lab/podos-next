# Google Tag Manager Setup for PodOS

## 🎯 What's Being Tracked

### 1. Forms (form_submit)

- **When**: Contact form submissions
- **Data**: `form_type`, `success`, `timestamp`

### 2. Contacts (contact_click)

- **When**: Click on phone/email in header
- **Data**: `contact_type` (phone/email), `contact_value`

### 3. Social Media (social_click)

- **When**: Click on Facebook/Instagram/Google Maps
- **Data**: `social_platform`, `social_url`

### 4. Navigation (navigation_click)

- **When**: Menu clicks (ready for future use)
- **Data**: `section`, `source`

### 5. Language (language_change)

- **When**: Website language switching (ready for future use)
- **Data**: `from_language`, `to_language`

## ⚙️ GTM Configuration

### Step 1: Create Variables

Go to **Variables** → **User-Defined Variables** → **New**:

1. **Event Name**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `event`

2. **Form Type**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `form_type`

3. **Form Success**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `success`

4. **Contact Type**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `contact_type`

5. **Social Platform**
   - Type: Data Layer Variable
   - Data Layer Variable Name: `social_platform`

### Step 2: Create Triggers

Go to **Triggers** → **New**:

1. **Form Submit Trigger**
   - Type: Custom Event
   - Event name: `form_submit`
   - This trigger fires on: All Custom Events

2. **Contact Click Trigger**
   - Type: Custom Event
   - Event name: `contact_click`
   - This trigger fires on: All Custom Events

3. **Social Click Trigger**
   - Type: Custom Event
   - Event name: `social_click`
   - This trigger fires on: All Custom Events

### Step 3: Create Tags

Go to **Tags** → **New**:

1. **GA4 - Form Submit**
   - Type: Google Analytics: GA4 Event
   - Configuration Tag: [your GA4 config tag]
   - Event Name: `form_submit`
   - Event Parameters:
     - `form_type`: `{{Form Type}}`
     - `success`: `{{Form Success}}`
   - Triggering: Form Submit Trigger

2. **GA4 - Contact Click**
   - Type: Google Analytics: GA4 Event
   - Configuration Tag: [your GA4 config tag]
   - Event Name: `contact_click`
   - Event Parameters:
     - `contact_type`: `{{Contact Type}}`
   - Triggering: Contact Click Trigger

3. **GA4 - Social Click**
   - Type: Google Analytics: GA4 Event
   - Configuration Tag: [your GA4 config tag]
   - Event Name: `social_click`
   - Event Parameters:
     - `social_platform`: `{{Social Platform}}`
   - Triggering: Social Click Trigger

### Step 4: Testing

1. Use **Preview** mode in GTM
2. Navigate to your website
3. Test:
   - Form submissions
   - Click on phone/email
   - Click on social media links
4. Verify events appear in GTM Debug

### Step 5: Publishing

1. Save all changes
2. Click **Submit**
3. Add version name and description
4. Publish changes

## 📊 Google Analytics Reports

After setup, you'll be able to see:

### In Events section:

- `form_submit` - how many forms submitted
- `contact_click` - contact clicks
- `social_click` - social media clicks

### Create Custom Reports:

1. **Form Analytics**: forms by success rate
2. **Contact Performance**: most popular contact methods
3. **Social Media Traffic**: social platform effectiveness

## 🔍 Analytics Query Examples

```
// How many forms submitted successfully this month
Events → form_submit → filter: success = true

// Which contact method is most popular
Events → contact_click → group by: contact_type

// Which social platform brings most traffic
Events → social_click → group by: social_platform
```

## ✅ Complete!

Now you have comprehensive analytics tracking:

- 📈 **Page views** (automatic)
- 📝 **Form submissions** (successful and failed)
- 📞 **Contact clicks** (phone, email)
- 📱 **Social media** (Facebook, Instagram, Google Maps)

## 🛠️ Technical Implementation

### DataLayer Events Structure

The website automatically pushes events to the dataLayer:

```javascript
// Form submission
dataLayer.push({
  event: 'form_submit',
  form_type: 'contact_form',
  success: true,
  timestamp: '2024-01-15T10:30:00.000Z',
})

// Contact click
dataLayer.push({
  event: 'contact_click',
  contact_type: 'phone',
  contact_value: '+48574154801',
})

// Social media click
dataLayer.push({
  event: 'social_click',
  social_platform: 'facebook',
  social_url: 'https://facebook.com/...',
})
```

### Environment Variables

Make sure these are set in your deployment:

```bash
NEXT_PUBLIC_GTM_ID=GTM-NP3MCTKM
NEXT_PUBLIC_GA_ID=G-Z94NYHMCP5
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🔧 Troubleshooting

### Common Issues

1. **Events not appearing**
   - Check GTM container is published
   - Verify GTM ID in environment variables
   - Test in Preview mode first

2. **GA4 not receiving data**
   - Ensure GA4 config tag is properly set up
   - Check Measurement ID matches environment variable
   - Verify trigger configurations

3. **Development vs Production**
   - Analytics only enabled in production by default
   - Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` for development testing

### Debug Commands

```bash
# Check environment variables
echo $NEXT_PUBLIC_GTM_ID

# Test local build
npm run build && npm start

# Verify GTM container loads
# Check browser console for GTM messages
```

## 📈 Advanced Analytics

### Custom Dimensions (Optional)

Add these to GA4 for enhanced tracking:

1. **User Language** - Track UA vs PL users
2. **Form Source** - Which page form was submitted from
3. **Contact Method Preference** - Phone vs email preference
4. **Session Duration** - Time spent on site

### Conversion Goals

Set up conversions for:

- Form submissions (primary goal)
- Phone clicks (secondary goal)
- Appointment bookings (if tracking available)

---

**Last Updated**: January 2024  
**GTM Version**: Latest  
**GA4 Version**: GA4 Universal
