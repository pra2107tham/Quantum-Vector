-- Helper function to create test enrollment
-- This function will create both user profile and enrollment if needed
CREATE OR REPLACE FUNCTION public.create_test_enrollment(
    p_user_id UUID,
    p_course_id UUID,
    p_amount DECIMAL DEFAULT 999.00
)
RETURNS VOID AS $$
BEGIN
    -- Ensure user profile exists
    INSERT INTO public.user_profiles (id, email, full_name, created_at, updated_at)
    SELECT 
        p_user_id,
        au.email,
        COALESCE(au.raw_user_meta_data->>'full_name', au.email),
        NOW(),
        NOW()
    FROM auth.users au
    WHERE au.id = p_user_id
    ON CONFLICT (id) DO NOTHING;
    
    -- Create enrollment
    INSERT INTO public.enrollments (
        user_id,
        course_id,
        payment_status,
        payment_id,
        amount,
        currency,
        created_at,
        updated_at
    ) VALUES (
        p_user_id,
        p_course_id,
        'completed',
        'test_payment_' || extract(epoch from now())::text,
        p_amount,
        'INR',
        NOW(),
        NOW()
    ) ON CONFLICT (user_id, course_id) DO UPDATE SET
        payment_status = 'completed',
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage example:
-- SELECT create_test_enrollment('your-user-id', 'your-course-id', 999.00);
