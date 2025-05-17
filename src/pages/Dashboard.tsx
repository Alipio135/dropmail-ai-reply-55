
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const { user, connectGmail } = useAuth();
  const { toast } = useToast();
  
  const handleConnectGmail = async () => {
    try {
      await connectGmail();
      toast({
        title: "Gmail Connected",
        description: "Your Gmail account has been successfully connected."
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Gmail. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="glass-card border border-border/40 animate-slide-up">
          <CardHeader>
            <CardTitle>Welcome to DropMail AI</CardTitle>
            <CardDescription>
              Automate your email responses with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              DropMail AI helps dropshippers save time by automatically generating
              responses to customer emails using artificial intelligence.
            </p>
          </CardContent>
        </Card>

        {/* Gmail Connection Card */}
        <Card className={`border ${user?.isGmailConnected ? 'border-turquoise/40' : 'border-coral/40'} glass-card animate-slide-up animate-delay-100`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Gmail Connection
            </CardTitle>
            <CardDescription>
              {user?.isGmailConnected 
                ? "Your Gmail account is connected" 
                : "Connect your Gmail account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.isGmailConnected ? (
              <div className="flex items-center gap-2 text-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Ready to process emails</span>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Connect your Gmail account to allow DropMail AI to read and respond to your emails.
              </p>
            )}
          </CardContent>
          <CardFooter>
            {user?.isGmailConnected ? (
              <Link to="/emails" className="w-full">
                <Button className="w-full bg-turquoise hover:bg-turquoise-light">
                  View Emails
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={handleConnectGmail} 
                className="w-full bg-coral hover:bg-coral-light"
              >
                Connect Gmail
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Emails Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user?.isGmailConnected ? '24' : '0'}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user?.isGmailConnected ? '18' : '0'}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user?.isGmailConnected ? '3.2 hrs' : '0 hrs'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
