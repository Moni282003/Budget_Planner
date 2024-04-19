
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
'https://waddhspjbnabfrtsehpw.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZGRoc3BqYm5hYmZydHNlaHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNDk5MzQsImV4cCI6MjAyODkyNTkzNH0.WJIv_OLYwZmP_It1yH2o8hAu7KkkueSShGBfNvxiNcQ')