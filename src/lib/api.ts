// This file is deprecated - use supabase.ts instead
// Keeping for backward compatibility during migration

export default {
  get: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  post: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  put: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  delete: () => Promise.reject(new Error('API deprecated - use Supabase instead'))
};
