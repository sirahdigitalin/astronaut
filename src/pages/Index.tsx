import { useState } from 'react';
import { EventHeader } from '@/components/EventHeader';
import { CameraPreview } from '@/components/CameraPreview';
import { PhotoPreview } from '@/components/PhotoPreview';
import { EmailForm } from '@/components/EmailForm';
import { SuccessMessage } from '@/components/SuccessMessage';
import { ErrorMessage } from '@/components/ErrorMessage';
import { submitPhoto } from '@/lib/api';

type AppState = 'capture' | 'preview' | 'loading' | 'success' | 'error';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('capture');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCapture = (photoData: string) => {
    setCapturedPhoto(photoData);
    setAppState('preview');
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setAppState('capture');
  };

  const handleSubmit = async (email: string) => {
    if (!capturedPhoto) return;

    setSubmittedEmail(email);
    setAppState('loading');

    const result = await submitPhoto({
      photoData: capturedPhoto,
      email: email,
    });

    if (result.success) {
      setAppState('success');
    } else {
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
      setAppState('error');
    }
  };

  const handleReset = () => {
    setCapturedPhoto(null);
    setSubmittedEmail('');
    setErrorMessage('');
    setAppState('capture');
  };

  const handleRetry = () => {
    setAppState('preview');
  };

  return (
    <div className="min-h-full flex flex-col bg-background">
      {/* Header */}
      <EventHeader 
        schoolName="School Event" 
        eventTitle="Instant Photo Booth" 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          {appState === 'capture' && (
            <CameraPreview onCapture={handleCapture} />
          )}

          {(appState === 'preview' || appState === 'loading') && capturedPhoto && (
            <div className="flex flex-col items-center gap-6">
              <PhotoPreview
                photoData={capturedPhoto}
                onRetake={handleRetake}
                disabled={appState === 'loading'}
              />
              <EmailForm
                onSubmit={handleSubmit}
                isLoading={appState === 'loading'}
                disabled={appState === 'loading'}
              />
            </div>
          )}

          {appState === 'success' && (
            <SuccessMessage email={submittedEmail} onReset={handleReset} />
          )}

          {appState === 'error' && (
            <ErrorMessage message={errorMessage} onRetry={handleRetry} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by your school
        </p>
      </footer>
    </div>
  );
};

export default Index;
