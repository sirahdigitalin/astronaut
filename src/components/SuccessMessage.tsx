import React from 'react';
import { CheckCircle2, Mail, RotateCcw, Sparkles, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessMessageProps {
  email: string;
  photoData?: string;
  onReset: () => void;
}

// Confetti piece component
function ConfettiPiece({ delay, left, color }: { delay: number; left: string; color: string }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
      style={{
        left,
        top: '-20px',
        backgroundColor: color,
        animationDelay: `${delay}s`,
        animationDuration: `${2.5 + Math.random()}s`,
      }}
    />
  );
}

// Sparkle decoration component
function SparkleDecoration({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute animate-sparkle ${className}`} style={style}>
      <Sparkles className="w-5 h-5 text-amber-400" />
    </div>
  );
}

export function SuccessMessage({ email, photoData, onReset }: SuccessMessageProps) {
  const confettiColors = [
    'hsl(210, 70%, 50%)', // Primary blue
    'hsl(145, 65%, 42%)', // Success green
    'hsl(45, 93%, 58%)',  // Gold
    'hsl(330, 80%, 60%)', // Pink
    'hsl(280, 70%, 60%)', // Purple
  ];

  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    left: `${Math.random() * 100}%`,
    color: confettiColors[i % confettiColors.length],
  }));

  return (
    <div className="relative flex flex-col items-center gap-6 text-center py-6 overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiPieces.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            delay={piece.delay}
            left={piece.left}
            color={piece.color}
          />
        ))}
      </div>

      {/* Sparkle decorations */}
      <SparkleDecoration className="top-4 left-8" />
      <SparkleDecoration className="top-12 right-6" style={{ animationDelay: '0.5s' }} />
      <SparkleDecoration className="bottom-32 left-4" style={{ animationDelay: '1s' }} />
      <SparkleDecoration className="bottom-24 right-10" style={{ animationDelay: '0.3s' }} />

      {/* Photo Preview with celebration frame */}
      {photoData && (
        <div className="relative animate-photo-reveal">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-success rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-success rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-success rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-success rounded-br-lg" />
          
          {/* Photo */}
          <div className="w-48 h-36 rounded-xl overflow-hidden shadow-lg ring-4 ring-success/20">
            <img
              src={photoData}
              alt="Your captured photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating party icon */}
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-float">
            <PartyPopper className="w-5 h-5 text-amber-900" />
          </div>
        </div>
      )}

      {/* Success Badge */}
      <div className="relative animate-bounce-in" style={{ animationDelay: '0.3s' }}>
        <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <div className="absolute inset-0 rounded-full bg-success/20 animate-pulse-ring" />
        
        {/* Floating stars */}
        <Star className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 fill-amber-400 animate-sparkle" />
        <Star className="absolute -bottom-1 -left-3 w-4 h-4 text-amber-400 fill-amber-400 animate-sparkle" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Message */}
      <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <span>Photo Sent!</span>
          <span className="text-2xl">🎉</span>
        </h2>
        <p className="text-muted-foreground max-w-sm">
          Your awesome photo is on its way! Check your inbox.
        </p>
        
        {/* Email badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-sm">
          <Mail className="w-4 h-4" />
          {email}
        </div>
      </div>

      {/* Take Another Photo */}
      <Button
        variant="outline"
        size="lg"
        onClick={onReset}
        className="gap-2 mt-2 animate-fade-in"
        style={{ animationDelay: '0.7s' }}
      >
        <RotateCcw className="w-5 h-5" />
        Take Another Photo
      </Button>
    </div>
  );
}
