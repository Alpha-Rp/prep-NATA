CREATE OR REPLACE FUNCTION create_admin_users_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'admin_users'
  ) THEN
    -- Create the table if it doesn't exist
    CREATE TABLE public.admin_users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Set up RLS policies
    ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

    -- Allow read access to authenticated users
    CREATE POLICY "Allow read access to authenticated users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);

    -- Allow insert/update only through the function
    CREATE POLICY "Allow insert through function only"
    ON public.admin_users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.email() = email);
  END IF;

  RETURN true;
END;
$$; 