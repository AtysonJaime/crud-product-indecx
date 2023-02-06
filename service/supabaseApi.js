import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://cqbqivasomlhcprscusj.supabase.co'
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYnFpdmFzb21saGNwcnNjdXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MjA2NDgsImV4cCI6MTk5MTE5NjY0OH0.dS7E0PLxcv0mWZRHDsIBnlUAiQbPDh1AM2IdlKmwCtM'

export const supabase = createClient(PROJECT_URL, API_KEY)
