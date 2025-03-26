-- Create enum for question types
CREATE TYPE question_type AS ENUM ('mcq', 'sketching');

-- Create questions table
CREATE TABLE questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type question_type NOT NULL,
    question_text TEXT NOT NULL,
    image_url TEXT,
    options JSONB, -- For MCQ options
    correct_answer TEXT, -- For MCQ correct answer
    marks INTEGER NOT NULL DEFAULT 1,
    difficulty_level TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

-- Create test_attempts table to track user attempts
CREATE TABLE test_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    test_type question_type NOT NULL,
    score INTEGER,
    max_score INTEGER,
    questions_attempted JSONB, -- Store attempted questions and answers
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    time_taken INTEGER -- in seconds
);

-- Create admin_users table
CREATE TABLE admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for questions table
CREATE POLICY "Allow read access to active questions for all authenticated users"
    ON questions
    FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Allow full access to admin users"
    ON questions
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid()
        )
    );

-- Policies for test_attempts table
CREATE POLICY "Users can view their own attempts"
    ON test_attempts
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own attempts"
    ON test_attempts
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Policies for admin_users table
CREATE POLICY "Admin users can view admin list"
    ON admin_users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid()
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for questions table
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_questions_type ON questions(type);
CREATE INDEX idx_questions_is_active ON questions(is_active);
CREATE INDEX idx_test_attempts_user ON test_attempts(user_id);
CREATE INDEX idx_test_attempts_type ON test_attempts(test_type); 