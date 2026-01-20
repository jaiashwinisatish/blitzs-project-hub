import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://afgromdzethkscaskofz.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ACTUAL_ANON_KEY_HERE'; // Replace this!

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const realDatabaseService = {
  // Test connection and discover table structure
  async testConnection() {
    console.log('Testing Supabase connection...');
    
    // Try to get table info
    try {
      const { data, error } = await supabase.from('developers').select('*').limit(1);
      if (error) {
        console.log('Developers table error:', error);
        // Try other possible table names
        const alternatives = ['team', 'users', 'staff'];
        for (const table of alternatives) {
          try {
            const result = await supabase.from(table).select('*').limit(1);
            if (!result.error) {
              console.log(`✅ Found developers in table: ${table}`);
              return { success: true, table };
            }
          } catch (e) {
            continue;
          }
        }
      } else {
        console.log('✅ Developers table found');
        return { success: true, table: 'developers' };
      }
    } catch (err) {
      console.log('Connection test failed:', err);
    }
    
    return { success: false };
  },

  // Get developers from real database
  async getAllDevelopers() {
    try {
      // Try different table names and column structures
      const tables = ['developers', 'team', 'users', 'staff'];
      
      for (const tableName of tables) {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select('*');
            
          if (!error && data && data.length > 0) {
            console.log(`✅ Found ${data.length} developers in ${tableName}`);
            return {
              success: true,
              data: {
                developers: data
              }
            };
          }
        } catch (err) {
          continue;
        }
      }
      
      return {
        success: false,
        message: 'No developers table found'
      };
    } catch (error) {
      console.error('Error fetching developers:', error);
      return {
        success: false,
        message: 'Failed to fetch developers'
      };
    }
  },

  // Get projects from real database
  async getAllProjects(options?: any) {
    try {
      const tables = ['projects', 'project', 'portfolio', 'work', 'products'];
      
      for (const tableName of tables) {
        try {
          let query = supabase.from(tableName).select('*');
          
          // Try common column names for published status
          const publishedColumns = ['is_published', 'isPublished', 'published', 'status'];
          for (const col of publishedColumns) {
            try {
              const { data, error } = await query.eq(col, true).limit(1);
              if (!error && data) {
                // This column works, get all data
                const { data: allData, error: allError } = await supabase
                  .from(tableName)
                  .select('*')
                  .eq(col, true)
                  .limit(options?.limit || 12);
                  
                if (!allError && allData) {
                  console.log(`✅ Found ${allData.length} projects in ${tableName}`);
                  return {
                    success: true,
                    data: {
                      projects: allData,
                      pagination: {
                        currentPage: options?.page || 1,
                        totalPages: 1,
                        totalProjects: allData.length
                      }
                    }
                  };
                }
              }
            } catch (e) {
              continue;
            }
          }
          
          // If no published filter works, try without filter
          const { data, error } = await query.limit(options?.limit || 12);
          if (!error && data) {
            console.log(`✅ Found ${data.length} projects in ${tableName} (no filter)`);
            return {
              success: true,
              data: {
                projects: data,
                pagination: {
                  currentPage: options?.page || 1,
                  totalPages: 1,
                  totalProjects: data.length
                }
              }
            };
          }
        } catch (err) {
          continue;
        }
      }
      
      return {
        success: false,
        message: 'No projects table found'
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  }
};
