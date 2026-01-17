# Projects Page Debug - Fix Issues

## 🚨 **Projects Not Showing? Quick Fix Steps**

### **Step 1: Add More Projects (8-9 total)**
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy content from: `server/more-projects.sql`
3. Paste and **Run** the SQL
4. This adds 5 more projects (total: 9 projects)

### **Step 2: Debug the Projects Page**

#### **Check Browser Console:**
1. Go to `http://localhost:8080/projects`
2. Open **Developer Tools** (F12)
3. Check **Console** tab for errors
4. Look for any Supabase or API errors

#### **Check Network Tab:**
1. Go to **Network** tab in Developer Tools
2. Refresh the projects page
3. Look for failed requests (red status codes)
4. Check if Supabase requests are working

### **Step 3: Manual Database Check**

#### **Verify Projects Exist:**
1. **Supabase Dashboard** → **Table Editor** → **projects**
2. Should see 9 projects total
3. Check `is_published` = true for all projects

#### **Run Debug Query:**
```sql
-- Test the exact query the app uses
SELECT *, 
       added_by:profiles(id, full_name)
FROM projects 
WHERE is_published = true 
ORDER BY created_at DESC 
LIMIT 12;
```

### **Step 4: Common Issues & Fixes**

#### **Issue 1: RLS Policies Blocking**
**Fix:** Run this SQL in Supabase:
```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view published projects" ON projects;

-- Create new policy
CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (is_published = true);
```

#### **Issue 2: Field Name Mismatch**
**Fix:** Check these fields in your database:
- `is_published` (not `isPublished`)
- `is_free` (not `isFree`)  
- `short_description` (not `shortDescription`)
- `tech_stack` (not `techStack`)

#### **Issue 3: No Projects in Database**
**Fix:** Run both SQL files:
1. `server/sample-data.sql` (4 projects)
2. `server/more-projects.sql` (5 projects)

### **Step 5: Test Different Pages**

#### **Test Home Page:**
- Go to `http://localhost:8080/`
- Should show featured projects section
- If home page shows projects, issue is in Projects page only

#### **Test Admin Dashboard:**
- Go to `http://localhost:8080/admin-dashboard`
- Click "Projects" tab
- Should show all projects with admin controls

### **Step 6: Quick Fix - Bypass Filters**

If filters are causing issues, temporarily disable them:

```typescript
// In src/pages/Projects.tsx, temporarily use this:
const fetchProjects = async () => {
  try {
    setLoading(true);
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .limit(12);
    
    if (error) {
      console.error('Error:', error);
      toast.error('Failed to load projects');
    } else {
      setProjects(projects || []);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    toast.error('Failed to load projects');
  } finally {
    setLoading(false);
  }
};
```

## 🎯 **Expected Result**

After fixes:
- ✅ 9 projects displayed on projects page
- ✅ Filters working (category, search, price)
- ✅ Pagination working
- ✅ Purchase buttons working
- ✅ No console errors

## 🚀 **Run This First:**

1. **Add more projects:** Run `server/more-projects.sql`
2. **Check database:** Verify 9 projects exist
3. **Test page:** Go to `http://localhost:8080/projects`
4. **Debug console:** Check for any errors

This should give you 8-9 projects displaying properly! 🎯
