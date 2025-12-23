import { GraduationCap } from 'lucide-react';

interface EventHeaderProps {
  schoolName?: string;
  eventTitle?: string;
}

export function EventHeader({ 
  schoolName = "Welcome to Our School", 
  eventTitle = "Photo Booth" 
}: EventHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-3 text-center py-4">
      {/* School Logo Placeholder */}
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <GraduationCap className="w-8 h-8 text-primary" />
      </div>
      
      {/* School Name & Event Title */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-foreground">{schoolName}</h1>
        <p className="text-base font-medium text-muted-foreground">{eventTitle}</p>
      </div>
    </header>
  );
}
