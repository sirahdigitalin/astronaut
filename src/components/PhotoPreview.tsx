import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoPreviewProps {
  photoData: string;
  onRetake: () => void;
  disabled?: boolean;
}

export function PhotoPreview({ photoData, onRetake, disabled = false }: PhotoPreviewProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full animate-scale-in">
      {/* Photo Frame */}
      <div className="relative w-full max-w-md aspect-[4/3] camera-frame overflow-hidden">
        <img
          src={photoData}
          alt="Captured photo"
          className="w-full h-full object-cover"
        />
        
        {/* Retake button overlay */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetake}
          disabled={disabled}
          className="absolute bottom-4 right-4 gap-2 bg-card/90 backdrop-blur-sm hover:bg-card"
        >
          <RotateCcw className="w-4 h-4" />
          Retake
        </Button>
      </div>
    </div>
  );
}
