
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { user, connectGmail, disconnectGmail } = useAuth();
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  
  const [saving, setSaving] = useState(false);

  const handleToggleGmail = async () => {
    try {
      if (user?.isGmailConnected) {
        await disconnectGmail();
        toast({
          title: "Gmail Disconnected",
          description: "Your Gmail account has been disconnected"
        });
      } else {
        await connectGmail();
        toast({
          title: "Gmail Connected",
          description: "Your Gmail account has been connected"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: user?.isGmailConnected ? "Failed to disconnect Gmail" : "Failed to connect Gmail",
        variant: "destructive"
      });
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully"
    });
    
    setSaving(false);
  };

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Gmail Connection */}
        <Card className="glass-card border border-border/40 animate-slide-up">
          <CardHeader>
            <CardTitle>Gmail Connection</CardTitle>
            <CardDescription>
              Manage your Gmail connection settings
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Gmail Account</p>
                <p className="text-sm text-muted-foreground">
                  {user?.isGmailConnected ? user.email : "No account connected"}
                </p>
              </div>
              
              <Button 
                variant={user?.isGmailConnected ? "destructive" : "outline"}
                onClick={handleToggleGmail}
              >
                {user?.isGmailConnected ? "Disconnect" : "Connect Gmail"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-100">
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>
              Configure the API keys for OpenAI integration
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="openai-key" className="text-sm font-medium">
                OpenAI API Key (Optional)
              </label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                className="bg-dark-DEFAULT/60"
              />
              <p className="text-xs text-muted-foreground">
                Provide your own OpenAI key to use custom models
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-200">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure email notifications
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new emails arrive
                  </p>
                </div>
                
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSaveSettings} 
              disabled={saving}
              className="bg-turquoise hover:bg-turquoise-light"
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card border border-border/40 animate-slide-up animate-delay-300">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="account-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="account-email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="bg-dark-DEFAULT/60"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="account-name" className="text-sm font-medium">
                Display Name
              </label>
              <Input
                id="account-name"
                type="text"
                placeholder="Your name"
                defaultValue={user?.name}
                className="bg-dark-DEFAULT/60"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="hover:bg-destructive hover:text-destructive-foreground">
              Delete Account
            </Button>
            
            <Button 
              onClick={handleSaveSettings} 
              disabled={saving}
              className="bg-turquoise hover:bg-turquoise-light"
            >
              {saving ? "Saving..." : "Update Account"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
