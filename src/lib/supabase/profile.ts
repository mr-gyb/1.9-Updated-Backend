import { supabase } from '../supabaseClient';
import { UserProfile } from '../../types/user';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // First try to get existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!fetchError && existingProfile) {
      return existingProfile;
    }

    // If no profile exists, create one with default values
    const defaultProfile = {
      id: userId,
      name: '',
      username: '',
      email: '',
      bio: '',
      location: '',
      website: '',
      experience: 'beginner',
      rating: 0,
      following: 0,
      followers: 0,
      profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      cover_image_url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    };

    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .upsert([defaultProfile], { onConflict: 'id' })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating profile:', insertError);
      return null;
    }

    return newProfile;
  } catch (error) {
    console.error('Error in getProfile:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert([{ id: userId, ...updates }], { onConflict: 'id' });

    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return false;
  }
};