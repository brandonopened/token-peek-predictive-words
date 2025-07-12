import { LLMInterface } from "@/components/LLMInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Welcome Message */}
        <Card className="bg-gradient-card shadow-card border-border">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Welcome to Token Probability Visualizer
                </h1>
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore how Large Language Models work by visualizing simulated token probabilities and alternative word choices. 
                This educational tool helps you understand the internal decision-making process of AI text generation.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg max-w-2xl mx-auto">
                <Info className="h-4 w-4" />
                <span>
                  <strong>Note:</strong> This tool simulates LLM behavior for educational purposes. 
                  Real LLM APIs don't provide token-level probability data.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Interface */}
        <LLMInterface />
      </div>
    </div>
  );
};

export default Index;
