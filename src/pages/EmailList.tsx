
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiService, Email } from '@/services/api';
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from 'date-fns';

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      
      try {
        const response = await apiService.getEmails();
        
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive"
          });
        } else if (response.data) {
          setEmails(response.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch emails",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Your latest emails</h1>
      <p className="text-muted-foreground mb-8">
        Select an email to view and respond with AI assistance
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : emails.length === 0 ? (
        <Card className="p-8 text-center glass-card border border-border/40">
          <Mail className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No emails found</h3>
          <p className="mt-2 text-muted-foreground">
            There are no emails in your inbox yet
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
            <Card key={email.id} className="glass-card border border-border/40 overflow-hidden hover:border-turquoise/40 transition-all animate-slide-up">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail size={18} className="text-coral flex-shrink-0" />
                      <h3 className="text-lg font-semibold truncate">
                        {email.subject}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{email.sender.name} ({email.sender.email})</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(email.received)}</span>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-muted-foreground line-clamp-2">
                      {email.snippet}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 mt-2 sm:mt-0">
                    <Link to={`/reply/${email.id}`}>
                      <Button className="bg-turquoise hover:bg-turquoise-light">
                        Respond with AI
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailList;
