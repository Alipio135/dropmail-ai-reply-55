
interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  received: string;
  content: string;
  snippet: string;
}

interface AiResponse {
  aiReply: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const BASE_URL = "https://api.seuservidor.com"; // Will be replaced with actual API URL

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock emails data
const mockEmails: Email[] = [
  {
    id: "e1",
    subject: "Question about my recent order #12345",
    sender: {
      name: "John Smith",
      email: "john.smith@example.com"
    },
    received: "2025-05-16T14:30:00Z",
    content: "Hello,\n\nI ordered a product last week (Order #12345) and I haven't received any shipping update yet. Could you please check the status of my order?\n\nThanks,\nJohn",
    snippet: "I ordered a product last week (Order #12345) and I haven't received any shipping update yet..."
  },
  {
    id: "e2",
    subject: "Return request for damaged item",
    sender: {
      name: "Mary Johnson",
      email: "mary.j@example.com"
    },
    received: "2025-05-16T10:15:00Z",
    content: "Hi there,\n\nI received my order yesterday but unfortunately the product was damaged during shipping. I'd like to request a return and replacement. My order number is #54321.\n\nBest regards,\nMary",
    snippet: "I received my order yesterday but unfortunately the product was damaged during shipping..."
  },
  {
    id: "e3",
    subject: "Product availability question",
    sender: {
      name: "David Williams",
      email: "david.w@example.com"
    },
    received: "2025-05-15T18:45:00Z",
    content: "Hello,\n\nI'm interested in purchasing the XYZ product that's currently listed as out of stock on your website. Do you know when it will be available again?\n\nThanks,\nDavid",
    snippet: "I'm interested in purchasing the XYZ product that's currently listed as out of stock on your website..."
  },
  {
    id: "e4",
    subject: "Discount code not working",
    sender: {
      name: "Sarah Brown",
      email: "sarah.b@example.com"
    },
    received: "2025-05-15T09:20:00Z",
    content: "Hi,\n\nI'm trying to use the SPRING25 discount code that I received in your newsletter, but it keeps saying it's invalid. Is this code still active?\n\nRegards,\nSarah",
    snippet: "I'm trying to use the SPRING25 discount code that I received in your newsletter, but it keeps saying it's invalid..."
  },
  {
    id: "e5",
    subject: "Wrong item received",
    sender: {
      name: "Michael Lee",
      email: "michael.l@example.com"
    },
    received: "2025-05-14T16:10:00Z",
    content: "Hello Support Team,\n\nI ordered a blue medium-sized t-shirt but received a red small one instead. Order #67890. How can we resolve this?\n\nThanks,\nMichael",
    snippet: "I ordered a blue medium-sized t-shirt but received a red small one instead. Order #67890..."
  }
];

class ApiService {
  private getAuthToken(): string {
    const token = localStorage.getItem('auth_token');
    return token || '';
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json'
    };
  }

  // Connect Gmail (OAuth 2.0)
  async connectGmail(tokens: Record<string, string>): Promise<ApiResponse<null>> {
    try {
      // In a real implementation, this would call the API
      // await fetch(`${BASE_URL}/connect_gmail`, {
      //   method: 'POST',
      //   headers: this.getHeaders(),
      //   body: JSON.stringify({ tokens })
      // });
      
      await delay(1000); // Simulate API delay
      
      return { data: null };
    } catch (error) {
      console.error("API Error:", error);
      return { error: "Failed to connect Gmail account. Please try again." };
    }
  }

  // Get emails list
  async getEmails(): Promise<ApiResponse<Email[]>> {
    try {
      // In a real implementation, this would call the API
      // const response = await fetch(`${BASE_URL}/get_emails`, {
      //   method: 'GET',
      //   headers: this.getHeaders()
      // });
      // const data = await response.json();
      
      await delay(1000); // Simulate API delay
      
      return { data: mockEmails };
    } catch (error) {
      console.error("API Error:", error);
      return { error: "Failed to fetch emails. Please try again." };
    }
  }

  // Get AI reply suggestion
  async getAiReply(messageId: string, emailText: string): Promise<ApiResponse<AiResponse>> {
    try {
      // In a real implementation, this would call the API
      // const response = await fetch(`${BASE_URL}/reply_with_ai`, {
      //   method: 'POST',
      //   headers: this.getHeaders(),
      //   body: JSON.stringify({ messageId, emailText })
      // });
      // const data = await response.json();
      
      await delay(2000); // Simulate API delay
      
      // Generate a mock AI response based on the email content
      let aiReply = "Thank you for your message. ";
      
      if (emailText.includes("order") && emailText.includes("shipping")) {
        aiReply += "I've checked your order and it's currently being processed. You should receive a shipping notification within the next 24-48 hours. If you have any other questions, please let me know.";
      } else if (emailText.includes("damaged")) {
        aiReply += "I'm sorry to hear about the damaged product. I've processed your return request and we'll send a replacement as soon as possible. You'll receive a return label in your email shortly.";
      } else if (emailText.includes("out of stock")) {
        aiReply += "Thank you for your interest in our product. We expect it to be back in stock within the next two weeks. Would you like me to notify you when it's available?";
      } else if (emailText.includes("discount") || emailText.includes("code")) {
        aiReply += "I've checked the discount code and it appears there was a system issue. I've manually applied a 25% discount to your account which you can use on your next purchase.";
      } else if (emailText.includes("wrong item")) {
        aiReply += "I apologize for the mistake with your order. Please keep the item you received, and we'll send you the correct one at no additional cost. It should arrive within 3-5 business days.";
      } else {
        aiReply += "I'll look into this matter immediately and get back to you as soon as possible. Is there anything else you would like me to help you with?";
      }
      
      aiReply += "\n\nBest regards,\n[Your Name]\n[Your Company]";
      
      return { data: { aiReply } };
    } catch (error) {
      console.error("API Error:", error);
      return { error: "Failed to generate AI reply. Please try again." };
    }
  }

  // Send reply email
  async sendReply(messageId: string, replyText: string): Promise<ApiResponse<null>> {
    try {
      // In a real implementation, this would call the API
      // await fetch(`${BASE_URL}/send_reply`, {
      //   method: 'POST',
      //   headers: this.getHeaders(),
      //   body: JSON.stringify({ messageId, replyText })
      // });
      
      await delay(1500); // Simulate API delay
      
      return { data: null };
    } catch (error) {
      console.error("API Error:", error);
      return { error: "Failed to send reply. Please try again." };
    }
  }
}

export const apiService = new ApiService();
export type { Email };
