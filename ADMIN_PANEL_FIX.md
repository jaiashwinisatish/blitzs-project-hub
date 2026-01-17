# Admin Panel Fix - Quick Guide

## 🚨 Admin Panel Not Working?

### Quick Fix Steps:

1. **Access Admin Panel:**
   - Go to: `http://localhost:8080/admin-dashboard`
   - If blocked, verify your admin role in Supabase

2. **Add Developers:**
   - In admin panel, click "Developers" tab
   - Click "Add Developer" button
   - Fill form and save

3. **Alternative - Use Team Page:**
   - Go to: `http://localhost:8080/team`
   - As admin, you'll see "Add Developer" button
   - Click and fill the form

4. **Add Projects:**
   - In admin panel, click "Projects" tab
   - Click "Add Project" button
   - Fill all project details

## 🔧 If Admin Panel Still Broken:

### Manual Database Method:
1. **Supabase Dashboard** → **Table Editor**
2. **Add Developer:**
   - Go to `developers` table
   - Click "Insert row"
   - Fill: name, email, bio, skills, experience
3. **Add Project:**
   - Go to `projects` table
   - Click "Insert row"
   - Fill: title, description, price, category, etc.

## 🎯 Fastest Method:

Use the Team page at `/team` - it has working admin forms for developers!

## 📋 Required Fields:

**Developer:** name, email, bio, skills (comma-separated)
**Project:** title, description, short_description, price, category, tech_stack, demo_link

The Team page admin forms should work immediately!
