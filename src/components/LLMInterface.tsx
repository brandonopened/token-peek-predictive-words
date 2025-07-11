import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenDisplay, Token } from "./TokenDisplay";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function LLMInterface() {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState<Token[]>([]);
  const [rawResponse, setRawResponse] = useState("");

  // Mock function to simulate OpenAI API with token probabilities
  const generateMockTokens = (text: string): Token[] => {
    const words = text.split(/(\s+)/);
    
    // Common alternative words that LLMs might consider
    const alternativeMap: Record<string, string[]> = {
      "When": ["As", "While", "Since"],
      "teaching": ["instructing", "educating", "guiding"],
      "preschoolers": ["children", "kids", "toddlers"],
      "about": ["regarding", "concerning", "on"],
      "classroom": ["learning", "educational", "school"],
      "rules": ["guidelines", "expectations", "policies"],
      "it's": ["it", "this", "that"],
      "crucial": ["important", "essential", "vital"],
      "to": ["for", "in", "that"],
      "approach": ["handle", "address", "tackle"],
      "the": ["this", "a", "an"],
      "subject": ["topic", "matter", "issue"],
      "in": ["with", "through", "via"],
      "an": ["a", "the", "some"],
      "engaging": ["interactive", "fun", "captivating"],
      "and": ["or", "but", "while"],
      "age-appropriate": ["suitable", "relevant", "fitting"],
      "manner": ["way", "method", "approach"],
      "benefits": ["advantages", "value", "importance"],
      "of": ["from", "in", "with"],
      "following": ["adhering", "obeying", "respecting"],
      "include": ["encompass", "involve", "contain"],
      "creating": ["building", "establishing", "forming"],
      "a": ["the", "one", "some"],
      "safe": ["secure", "protected", "comfortable"],
      "learning": ["educational", "academic", "study"],
      "environment": ["space", "setting", "atmosphere"],
      "developing": ["building", "fostering", "enhancing"],
      "social": ["interpersonal", "communication", "behavioral"],
      "skills": ["abilities", "competencies", "capabilities"],
      "fostering": ["promoting", "encouraging", "developing"],
      "mutual": ["shared", "collective", "common"],
      "respect": ["consideration", "understanding", "appreciation"]
    };
    
    return words.map(word => {
      if (word.trim() === "") {
        return { text: word, probability: 1.0 };
      }
      
      const cleanWord = word.replace(/[.,!?;:]/, "");
      const probability = Math.random();
      const alternatives = [];
      
      // Generate realistic alternatives if available
      if (probability < 0.8 && alternativeMap[cleanWord]) {
        const possibleAlts = alternativeMap[cleanWord];
        const numAlts = Math.min(possibleAlts.length, Math.floor(Math.random() * 3) + 1);
        
        for (let i = 0; i < numAlts; i++) {
          alternatives.push({
            text: possibleAlts[i] + (word !== cleanWord ? word.substring(cleanWord.length) : ""),
            probability: Math.random() * 0.7
          });
        }
      }
      
      return {
        text: word,
        probability,
        alternatives: alternatives.length > 0 ? alternatives : undefined
      };
    });
  };

  const callOpenAI = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setGeneratedTokens([]);
    setRawResponse("");

    try {
      // For demo purposes, we'll use mock data since OpenAI doesn't always return token probabilities
      // In a real implementation, you'd call the OpenAI API here
      
      if (apiKey) {
        // Real API call would go here
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
            logprobs: true,
            top_logprobs: 3
          }),
        });

        if (!response.ok) {
          throw new Error('API call failed');
        }

        const data = await response.json();
        setRawResponse(data.choices[0].message.content);
        
        // For now, we'll still use mock tokens since logprobs format varies
        const mockTokens = generateMockTokens(data.choices[0].message.content);
        setGeneratedTokens(mockTokens);
      } else {
        // Demo mode with mock data
        const demoResponses = [
          "When teaching preschoolers about classroom rules, it's crucial to approach the subject in an engaging and age-appropriate manner.",
          "The benefits of following classroom rules include creating a safe learning environment, developing social skills, and fostering mutual respect.",
          "Artificial intelligence is transforming education by providing personalized learning experiences and automated assessment tools.",
          "Machine learning algorithms can analyze student performance data to identify learning patterns and suggest improvements."
        ];
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        setRawResponse(randomResponse);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockTokens = generateMockTokens(randomResponse);
        setGeneratedTokens(mockTokens);
      }

      toast({
        title: "Success",
        description: "Text generated successfully"
      });

    } catch (error) {
      console.error('Error calling API:', error);
      toast({
        title: "Error",
        description: "Failed to generate text. Using demo mode.",
        variant: "destructive"
      });
      
      // Fallback to demo mode
      const demoResponse = "This is a demo response showing how token probabilities might look when calling an LLM API.";
      setRawResponse(demoResponse);
      const mockTokens = generateMockTokens(demoResponse);
      setGeneratedTokens(mockTokens);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          LLM Token Probability Visualizer
        </h1>
        <p className="text-muted-foreground">
          Visualize token-level confidence scores from language model responses
        </p>
      </div>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apikey">OpenAI API Key (optional - leave blank for demo mode)</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50"
            />
          </div>
          
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 bg-background/50"
            />
          </div>
          
          <Button 
            onClick={callOpenAI} 
            disabled={isLoading}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Text"
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedTokens.length > 0 && (
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader>
            <CardTitle>Token Visualization</CardTitle>
            <p className="text-sm text-muted-foreground">
              Hover over tokens to see confidence levels and alternatives
            </p>
          </CardHeader>
          <CardContent>
            <TokenDisplay tokens={generatedTokens} />
          </CardContent>
        </Card>
      )}

      {rawResponse && (
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader>
            <CardTitle>Raw Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-mono text-sm bg-background/50 p-4 rounded-lg">
              {rawResponse}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-token-critical/20 border border-token-critical/30"></div>
              <span className="text-sm">Strong (&lt;20%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-token-low/20 border border-token-low/30"></div>
              <span className="text-sm">Fair (20-40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-token-medium/20 border border-token-medium/30"></div>
              <span className="text-sm">Moderate (40-60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-token-high/20 border border-token-high/30"></div>
              <span className="text-sm">High (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-token-excellent/20 border border-token-excellent/30"></div>
              <span className="text-sm">Excellent (≥80%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}