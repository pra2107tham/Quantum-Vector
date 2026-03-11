import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { BlogApiResponse } from '@/types/blog';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// Predefined categories
const categories = ['All Categories', 'DevOps', 'Kubernetes', 'AWS', 'Azure', 'Infrastructure', 'Data Science', 'Security', 'Monitoring'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const sort = searchParams.get('sort') || 'newest';

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build the query with pagination
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });

    // Apply sorting
    switch (sort) {
      case 'oldest':
        query = query.order('published_at', { ascending: true });
        break;
      case 'title':
        query = query.order('title', { ascending: true });
        break;
      case 'category':
        query = query.order('category', { ascending: true }).order('published_at', { ascending: false });
        break;
      default: // newest
        query = query.order('published_at', { ascending: false });
    }

    // Filter by category
    if (category && category !== 'All Categories') {
      query = query.eq('category', category);
    }

    // Execute the query to get total count first
    const { data: allBlogs, error: countError } = await query;

    if (countError) {
      console.error('Error fetching blogs count from Supabase:', countError);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    let filteredBlogs = allBlogs || [];

    // Client-side search filtering
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.summary.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)))
      );
    }

    // Apply pagination after filtering
    const totalFiltered = filteredBlogs.length;
    const paginatedBlogs = filteredBlogs.slice(offset, offset + limit);

    // Transform data to match frontend expectations
    const transformedBlogs = paginatedBlogs.map(blog => ({
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
    }));

    const response: BlogApiResponse = {
      blogs: transformedBlogs,
      total: totalFiltered,
      totalPages: Math.ceil(totalFiltered / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalFiltered / limit),
      hasPrevPage: page > 1,
      categories
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}