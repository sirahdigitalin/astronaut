const WEBHOOK_URL = 'https://n8n.srv930949.hstgr.cloud/webhook/astronaut';

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
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Data,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
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
