import { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmailFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function EmailForm({ onSubmit, isLoading = false, disabled = false }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError(null);
    onSubmit(trimmedEmail);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            disabled={disabled || isLoading}
            className={`pl-12 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            autoComplete="email"
            inputMode="email"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="capture"
        size="xl"
        disabled={disabled || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin-slow" />
            Processing your photo...
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            Submit & Get Photo
          </>
        )}
      </Button>
    </form>
  );
}
