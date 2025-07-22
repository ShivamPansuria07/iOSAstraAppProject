import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your own Supabase project credentials
const SUPABASE_URL = 'https://mulfhgmihtxskyggfvix.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bGZoZ21paHR4c2t5Z2dmdml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzYwNDUsImV4cCI6MjA2NzM1MjA0NX0.AE1qytBQ7Ysuhdj6-c-P07FbJx8PmKITUKwzeIrsXX4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase; 