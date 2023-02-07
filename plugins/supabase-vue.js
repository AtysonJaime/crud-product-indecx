/* plugins/client.js */
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://cqbqivasomlhcprscusj.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYnFpdmFzb21saGNwcnNjdXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MjA2NDgsImV4cCI6MTk5MTE5NjY0OH0.dS7E0PLxcv0mWZRHDsIBnlUAiQbPDh1AM2IdlKmwCtM'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
export default (_, inject) => {
  inject('supabase', supabase)
}
