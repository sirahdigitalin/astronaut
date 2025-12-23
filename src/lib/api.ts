import { supabase } from '@/integrations/supabase/client';

interface SubmitPhotoParams {
  photoData: string; // Base64 data URL
  email: string;
}

interface SubmitPhotoResult {
  success: boolean;
  error?: string;
}

export async function submitPhoto({ photoData, email }: SubmitPhotoParams): Promise<SubmitPhotoResult> {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = photoData.replace(/^data:image\/\w+;base64,/, '');
    
    const { data, error } = await supabase.functions.invoke('submit-photo', {
      body: {
        image: base64Data,
        email: email,
      },
    });

    if (error) {
      console.error('Submit photo error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send photo. Please try again.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Submit photo error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to send photo. Please check your connection and try again.';
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
}
