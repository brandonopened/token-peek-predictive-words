import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Token {
  text: string;
  probability: number;
  alternatives?: { text: string; probability: number }[];
}

interface TokenDisplayProps {
  tokens: Token[];
  className?: string;
}

export function TokenDisplay({ tokens, className }: TokenDisplayProps) {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const getTokenColor = (probability: number) => {
    if (probability >= 0.8) return "bg-token-excellent/20 text-token-excellent border-token-excellent/30";
    if (probability >= 0.6) return "bg-token-high/20 text-token-high border-token-high/30";
    if (probability >= 0.4) return "bg-token-medium/20 text-token-medium border-token-medium/30";
    if (probability >= 0.2) return "bg-token-low/20 text-token-low border-token-low/30";
    return "bg-token-critical/20 text-token-critical border-token-critical/30";
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 0.8) return "excellent";
    if (probability >= 0.6) return "high";
    if (probability >= 0.4) return "moderate";
    if (probability >= 0.2) return "fair";
    return "strong";
  };

  return (
    <div className={cn("font-mono leading-relaxed", className)}>
      <div className="flex flex-wrap gap-1">
        {tokens.map((token, index) => (
          <div key={index} className="relative">
            <span
              className={cn(
                "px-2 py-1 rounded-md border transition-all duration-200 cursor-pointer",
                "hover:shadow-glow hover:scale-105",
                getTokenColor(token.probability)
              )}
              onMouseEnter={() => setHoveredToken(index)}
              onMouseLeave={() => setHoveredToken(null)}
            >
              {token.text}
            </span>
            
            {hoveredToken === index && (
              <div className="absolute top-full left-0 mt-2 z-10 bg-card border rounded-lg p-3 shadow-card min-w-48">
                <div className="text-sm font-medium mb-2 text-foreground">
                  Token: "{token.text}"
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Confidence: {getProbabilityLabel(token.probability)} ({Math.round(token.probability * 100)}%)
                </div>
                
                {token.alternatives && token.alternatives.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-1 text-foreground">Alternatives:</div>
                    <div className="space-y-1">
                      {token.alternatives.map((alt, altIndex) => (
                        <div key={altIndex} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">"{alt.text}"</span>
                          <span className={cn(
                            "font-mono",
                            alt.probability >= 0.6 ? "text-token-high" :
                            alt.probability >= 0.4 ? "text-token-medium" :
                            alt.probability >= 0.2 ? "text-token-low" : "text-token-critical"
                          )}>
                            {Math.round(alt.probability * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}