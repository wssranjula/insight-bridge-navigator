
import { useState } from 'react';
import { Brain, FileText, Search, Bot, Zap, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock AI agents data
const aiAgents = [
  {
    id: 'market-intel',
    name: 'Market Intelligence Agent',
    description: 'Analyzes real-time market data, news, and trends to provide actionable insights',
    capabilities: ['Pattern recognition', 'Anomaly detection', 'Correlation analysis', 'Trend forecasting'],
    icon: <Search className="h-5 w-5" />,
    accuracy: 92,
    lastUpdated: '10 minutes ago'
  },
  {
    id: 'doc-analyzer',
    name: 'Document Analysis Agent',
    description: 'Extracts and summarizes key information from financial reports and regulatory filings',
    capabilities: ['Entity extraction', 'Sentiment analysis', 'Key metrics identification', 'Executive summary generation'],
    icon: <FileText className="h-5 w-5" />,
    accuracy: 94,
    lastUpdated: '25 minutes ago'
  },
  {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    description: 'Processes news, social media, and analyst reports to gauge market sentiment',
    capabilities: ['Multi-source analysis', 'Real-time monitoring', 'Sentiment score calculation', 'Impact assessment'],
    icon: <Brain className="h-5 w-5" />,
    accuracy: 87,
    lastUpdated: '5 minutes ago'
  }
];

const AIAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0].id);
  const [openAgentId, setOpenAgentId] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-brand-blue" />
          <h2 className="text-xl font-medium">AI Research Agents</h2>
        </div>
        <Badge variant="info">Powered by Neural Networks</Badge>
      </div>

      <Tabs defaultValue={aiAgents[0].id} className="mt-2" onValueChange={setSelectedAgent}>
        <TabsList className="w-full grid grid-cols-3 mb-4">
          {aiAgents.map(agent => (
            <TabsTrigger key={agent.id} value={agent.id} className="flex items-center gap-1.5">
              {agent.icon}
              <span className="hidden sm:inline">{agent.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {aiAgents.map(agent => (
          <TabsContent key={agent.id} value={agent.id} className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {agent.icon}
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Accuracy: {agent.accuracy}%</span>
                  </div>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Collapsible
                  open={openAgentId === agent.id}
                  onOpenChange={() => setOpenAgentId(openAgentId === agent.id ? null : agent.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-0 text-muted-foreground hover:text-foreground">
                      <Settings2 className="h-3.5 w-3.5" />
                      <span className="text-xs">Capabilities</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <ul className="grid grid-cols-2 gap-y-1 gap-x-2 text-sm">
                      {agent.capabilities.map((capability, index) => (
                        <li key={index} className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Last updated: {agent.lastUpdated}
              </CardFooter>
            </Card>

            <div className="flex justify-between items-center mt-4 pt-2 border-t border-border/40">
              <span className="text-sm text-muted-foreground">Active and processing market data...</span>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                Configure Agent
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AIAgents;
