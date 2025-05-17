
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { apiService, Email } from '@/services/api';
import { useToast } from "@/hooks/use-toast";

const Reply: React.FC = () => {
  const { emailId } = useParams<{ emailId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState<Email | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      if (!emailId) return;
      
      setLoading(true);
      
      try {
        // In a real app, we would fetch a single email by ID
        // Here we're using the mock emails list
        const response = await apiService.getEmails();
        
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive"
          });
          navigate('/emails');
          return;
        }
        
        const foundEmail = response.data?.find(e => e.id === emailId);
        
        if (!foundEmail) {
          toast({
            title: "Email not found",
            description: "The email you're looking for doesn't exist",
            variant: "destructive"
          });
          navigate('/emails');
          return;
        }
        
        setEmail(foundEmail);
        generateAiReply(foundEmail);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch email details",
          variant: "destructive"
        });
        navigate('/emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [emailId, navigate, toast]);

  const generateAiReply = async (email: Email) => {
    setGenerating(true);
    
    try {
      const response = await apiService.getAiReply(email.id, email.content);
      
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        });
      } else if (response.data) {
        setReplyText(response.data.aiReply);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI reply",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSendReply = async () => {
    if (!email || !replyText.trim()) return;
    
    setSending(true);
    
    try {
      const response = await apiService.sendReply(email.id, replyText);
      
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Reply sent",
          description: "Your email has been sent successfully"
        });
        navigate('/emails');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/emails" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
          <ArrowLeft size={18} />
          <span>Back to email list</span>
        </Link>
      </div>

      {email && (
        <div className="space-y-6">
          {/* Original Email Card */}
          <Card className="glass-card border border-border/40 p-6 animate-slide-up">
            <h2 className="text-xl font-bold mb-4">{email.subject}</h2>
            
            <div className="mb-4 text-sm">
              <p className="text-muted-foreground">
                From: <span className="text-foreground">{email.sender.name} &lt;{email.sender.email}&gt;</span>
              </p>
            </div>
            
            <div className="border-t border-border/40 pt-4 whitespace-pre-wrap">
              {email.content}
            </div>
          </Card>

          {/* AI Reply Card */}
          <Card className="glass-card border border-turquoise/40 p-6 animate-slide-up animate-delay-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">AI Generated Reply</h2>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                disabled={generating}
                className="border-turquoise/40"
              >
                {isEditing ? "Done Editing" : "Edit Reply"}
              </Button>
            </div>
            
            {generating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Generating AI response...</p>
              </div>
            ) : (
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                readOnly={!isEditing}
                className={`min-h-[200px] bg-dark-DEFAULT/60 ${!isEditing ? 'focus-visible:ring-0 border-none' : ''}`}
                placeholder="AI is generating a response..."
              />
            )}
            
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-coral hover:bg-coral-light"
                disabled={generating || sending || !replyText.trim()}
                onClick={handleSendReply}
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reply"
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reply;
