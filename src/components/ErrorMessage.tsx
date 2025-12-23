import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center animate-fade-in py-6">
      {/* Error Icon */}
      <div className="w-20 h-20 rounded-full bg-error-bg flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground max-w-sm text-sm">{message}</p>
      </div>

      {/* Retry Button */}
      <Button
        variant="default"
        size="lg"
        onClick={onRetry}
        className="gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Try Again
      </Button>
    </div>
  );
}
