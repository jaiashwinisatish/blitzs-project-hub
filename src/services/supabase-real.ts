import { createClient } from '@supabase/supabase-js';

// Use your actual Supabase credentials from .env
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4'
);

export const supabaseRealService = {
  // Test connection and discover actual database structure
  async diagnoseDatabase() {
    console.log('🔍 Diagnosing your Supabase database...');
    
    // Test developers table
    try {
      const { data, error } = await supabase.from('developers').select('*').limit(3);
      if (!error && data) {
        console.log('✅ Developers table found!');
        console.log('Sample developer data:', data);
        console.log('Column names:', Object.keys(data[0] || {}));
      } else {
        console.log('❌ Developers table error:', error?.message);
        
        // Try alternative table names
        const alternatives = ['team', 'users', 'staff', 'team_members'];
        for (const table of alternatives) {
          try {
            const { data: altData, error: altError } = await supabase.from(table).select('*').limit(3);
            if (!altError && altData) {
              console.log(`✅ Found developers in table: ${table}`);
              console.log('Sample data:', altData);
              console.log('Columns:', Object.keys(altData[0] || {}));
              return { success: true, table, data: altData };
            }
          } catch (e) {
            continue;
          }
        }
      }
    } catch (err) {
      console.log('❌ Developers connection failed:', err);
    }

    // Test projects table
    try {
      const { data, error } = await supabase.from('projects').select('*').limit(3);
      if (!error && data) {
        console.log('✅ Projects table found!');
        console.log('Sample project data:', data);
        console.log('Column names:', Object.keys(data[0] || {}));
      } else {
        console.log('❌ Projects table error:', error?.message);
        
        // Try alternative table names
        const alternatives = ['project', 'portfolio', 'work', 'products'];
        for (const table of alternatives) {
          try {
            const { data: altData, error: altError } = await supabase.from(table).select('*').limit(3);
            if (!altError && altData) {
              console.log(`✅ Found projects in table: ${table}`);
              console.log('Sample data:', altData);
              console.log('Columns:', Object.keys(altData[0] || {}));
              return { success: true, table, data: altData };
            }
          } catch (e) {
            continue;
          }
        }
      }
    } catch (err) {
      console.log('❌ Projects connection failed:', err);
    }

    return { success: false };
  },

  // Get developers from your real database
  async getAllDevelopers() {
    console.log('Fetching developers from your Supabase database...');
    
    try {
      const { data, error } = await supabase.from('developers').select('*');
      
      if (!error && data) {
        console.log(`✅ Found ${data.length} developers in your database`);
        return {
          success: true,
          data: {
            developers: data
          }
        };
      } else {
        console.log('❌ Error fetching developers:', error?.message);
        
        // Try without filters
        const { data: altData, error: altError } = await supabase.from('developers').select('*');
        if (!altError && altData) {
          console.log(`✅ Found ${altData.length} developers (no filter)`);
          return {
            success: true,
            data: {
              developers: altData
            }
          };
        }
        
        return {
          success: false,
          message: error?.message || 'Failed to fetch developers'
        };
      }
    } catch (error) {
      console.error('Error fetching developers:', error);
      return {
        success: false,
        message: 'Failed to fetch developers'
      };
    }
  },

  // Get projects from your real database
  async getAllProjects(options?: any) {
    console.log('Fetching projects from your Supabase database...');
    
    try {
      let query = supabase.from('projects').select('*');
      
      // Try different column names for published status
      const publishedColumns = ['is_published', 'isPublished', 'published', 'is_active', 'isActive'];
      let workingColumn = null;
      
      for (const col of publishedColumns) {
        try {
          const { data: testData, error: testError } = await query.eq(col, true).limit(1);
          if (!testError && testData) {
            workingColumn = col;
            console.log(`✅ Using column '${col}' for published filter`);
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      // Build final query
      let finalQuery = supabase.from('projects').select('*');
      if (workingColumn) {
        finalQuery = finalQuery.eq(workingColumn, true);
      }
      
      // Apply pagination
      const page = options?.page || 1;
      const limit = options?.limit || 12;
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      finalQuery = finalQuery.range(from, to);
      
      const { data, error, count } = await finalQuery;
      
      if (!error && data) {
        console.log(`✅ Found ${data.length} projects in your database`);
        return {
          success: true,
          data: {
            projects: data,
            pagination: {
              currentPage: page,
              totalPages: Math.ceil((count || 0) / limit),
              totalProjects: count || data.length
            }
          }
        };
      } else {
        console.log('❌ Error fetching projects:', error?.message);
        
        // Try without any filters
        const { data: altData, error: altError } = await supabase.from('projects').select('*').limit(limit);
        if (!altError && altData) {
          console.log(`✅ Found ${altData.length} projects (no filter)`);
          return {
            success: true,
            data: {
              projects: altData,
              pagination: {
                currentPage: page,
                totalPages: 1,
                totalProjects: altData.length
              }
            }
          };
        }
        
        return {
          success: false,
          message: error?.message || 'Failed to fetch projects'
        };
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  }
};
