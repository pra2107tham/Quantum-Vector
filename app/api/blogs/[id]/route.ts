import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Check if the id is a valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUuid = uuidRegex.test(id);

    let blog = null;
    let error = null;

    if (isUuid) {
      // Try to fetch by ID (UUID)
      const result = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      blog = result.data;
      error = result.error;
    } else {
      // Try to fetch by slug
      const result = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', id)
        .single();
      
      blog = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error fetching blog from Supabase:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Transform data to match frontend expectations
    const transformedBlog = {
      _id: blog.id,
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      image_url: blog.image_url ?? null,
      category: blog.category,
      published_at: blog.published_at,
      reading_time: blog.reading_time,
      content: blog.content,
      tags: blog.tags || [],
      authors: blog.authors || []
    };

    return NextResponse.json(transformedBlog);
  } catch (error) {
    console.error('Error in blog detail API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}