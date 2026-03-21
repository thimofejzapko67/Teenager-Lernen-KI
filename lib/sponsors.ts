'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Get all sponsors with filters
 */
export async function getSponsors(filters?: {
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  industry?: string;
}) {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('sponsors')
      .select('*')
      .eq('active', true);

    if (filters?.tier) {
      query = query.eq('tier', filters.tier);
    }

    if (filters?.industry) {
      query = query.eq('industry', filters.industry);
    }

    const { data, error } = await query.order('tier', { ascending: false });

    if (error) {
      console.error('Error fetching sponsors:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSponsors:', error);
    return [];
  }
}

/**
 * Get sponsor by ID
 */
export async function getSponsor(id: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching sponsor:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getSponsor:', error);
    return null;
  }
}

/**
 * Get sponsor industries
 */
export async function getSponsorIndustries() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('sponsors')
      .select('industry')
      .not('industry', 'is', null);

    if (error) {
      console.error('Error fetching industries:', error);
      return [];
    }

    const industries = [...new Set(data?.map((s) => s.industry).filter(Boolean) || [])];
    return industries.sort();
  } catch (error) {
    console.error('Error in getSponsorIndustries:', error);
    return [];
  }
}

/**
 * Apply for sponsorship
 */
export async function applyForSponsorship(sponsorId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // Check if already applied
    const { data: existing } = await supabase
      .from('sponsorships')
      .select('id')
      .eq('user_id', user.id)
      .eq('sponsor_id', sponsorId)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'Already applied to this sponsor' };
    }

    // Create application
    const { error } = await supabase
      .from('sponsorships')
      .insert({
        user_id: user.id,
        sponsor_id: sponsorId,
        status: 'pending',
      });

    if (error) {
      console.error('Error creating sponsorship application:', error);
      return { success: false, error: 'Failed to apply' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in applyForSponsorship:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get user's sponsorships
 */
export async function getUserSponsorships() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('sponsorships')
      .select('*, sponsors(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sponsorships:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserSponsorships:', error);
    return [];
  }
}
