import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ezffmlqhebijebvdzyzl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZmZtbHFoZWJpamVidmR6eXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MzU1NzcsImV4cCI6MjAzNzAxMTU3N30.DnUakZa06GjHJBoLA4KZqBiMyI-iGgisyHRv_QW6-_4"
);
