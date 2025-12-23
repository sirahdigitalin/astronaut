import { CheckCircle2, Mail, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessMessageProps {
  email: string;
  onReset: () => void;
}

export function SuccessMessage({ email, onReset }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center animate-scale-in py-8">
      {/* Success Icon */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-success-bg flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>
        <div className="absolute inset-0 rounded-full bg-success/20 animate-pulse-ring" />
      </div>

      {/* Message */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Photo Sent!</h2>
        <p className="text-muted-foreground max-w-sm">
          Your photo has been sent to your email. Please check your inbox.
        </p>
        
        {/* Email badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
          <Mail className="w-4 h-4" />
          {email}
        </div>
      </div>

      {/* Take Another Photo */}
      <Button
        variant="outline"
        size="lg"
        onClick={onReset}
        className="gap-2 mt-4"
      >
        <RotateCcw className="w-5 h-5" />
        Take Another Photo
      </Button>
    </div>
  );
}
