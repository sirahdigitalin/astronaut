import { useEffect } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCamera } from '@/hooks/useCamera';

interface CameraPreviewProps {
  onCapture: (photoData: string) => void;
  disabled?: boolean;
}

export function CameraPreview({ onCapture, disabled = false }: CameraPreviewProps) {
  const { videoRef, canvasRef, isStreaming, error, startCamera, capturePhoto } = useCamera();

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      onCapture(photo);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Camera Frame */}
      <div className="relative w-full max-w-md aspect-[4/3] camera-frame">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-error-bg flex items-center justify-center">
              <CameraOff className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={startCamera}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        ) : !isStreaming ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center animate-pulse">
              <Camera className="w-8 h-8 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Starting camera...</p>
          </div>
        ) : null}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover scale-x-[-1] ${isStreaming ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Capture Button */}
      <Button
        variant="capture"
        size="xl"
        onClick={handleCapture}
        disabled={!isStreaming || disabled}
        className="w-full max-w-xs relative"
      >
        <span className="relative z-10 flex items-center gap-3">
          <Camera className="w-6 h-6" />
          Capture Photo
        </span>
      </Button>
    </div>
  );
}
