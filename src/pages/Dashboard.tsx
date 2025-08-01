import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Eye, Star, Clock } from 'lucide-react';
import Header from '@/components/Header';

interface Trade {
  id: string;
  title: string;
  description: string;
  game: string;
  item_type: string;
  price_robux: number;
  original_price_robux: number;
  item_icon: string;
  status: string;
  expires_at: string;
  created_at: string;
}

interface Profile {
  username: string;
  display_name: string;
  verified: boolean;
  rating: number;
  total_trades: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state
  const [newTrade, setNewTrade] = useState({
    title: '',
    description: '',
    game: '',
    item_type: '',
    price_robux: '',
    original_price_robux: '',
    item_icon: '🎮',
    expires_at: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchTrades();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchTrades = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('trades')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await (supabase as any)
        .from('trades')
        .insert({
          seller_id: user?.id,
          title: newTrade.title,
          description: newTrade.description,
          game: newTrade.game,
          item_type: newTrade.item_type,
          price_robux: parseInt(newTrade.price_robux),
          original_price_robux: newTrade.original_price_robux ? parseInt(newTrade.original_price_robux) : null,
          item_icon: newTrade.item_icon,
          expires_at: newTrade.expires_at ? new Date(newTrade.expires_at).toISOString() : null
        });

      if (error) throw error;

      toast({
        title: "Trade Created!",
        description: "Your trade has been listed successfully.",
      });

      setNewTrade({
        title: '',
        description: '',
        game: '',
        item_type: '',
        price_robux: '',
        original_price_robux: '',
        item_icon: '🎮',
        expires_at: ''
      });
      setShowCreateForm(false);
      fetchTrades();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTrade = async (tradeId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('trades')
        .delete()
        .eq('id', tradeId);

      if (error) throw error;

      toast({
        title: "Trade Deleted",
        description: "Your trade has been removed.",
      });
      
      fetchTrades();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trading Dashboard</h1>
          <p className="text-muted-foreground">Manage your trades and profile</p>
        </div>

        <Tabs defaultValue="trades" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trades">My Trades</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="trades" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Trades</h2>
              <Button 
                variant="trading" 
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Trade
              </Button>
            </div>

            {showCreateForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Trade</CardTitle>
                  <CardDescription>List a new item for trading</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateTrade} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Rare Dragon Pet"
                          value={newTrade.title}
                          onChange={(e) => setNewTrade({...newTrade, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="game">Game</Label>
                        <Select value={newTrade.game} onValueChange={(value) => setNewTrade({...newTrade, game: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select game" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pet Simulator X">Pet Simulator X</SelectItem>
                            <SelectItem value="Adopt Me">Adopt Me</SelectItem>
                            <SelectItem value="MM2">Murder Mystery 2</SelectItem>
                            <SelectItem value="Arsenal">Arsenal</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="item_type">Item Type</Label>
                        <Input
                          id="item_type"
                          placeholder="Pet, Weapon, Accessory"
                          value={newTrade.item_type}
                          onChange={(e) => setNewTrade({...newTrade, item_type: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (Robux)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="15000"
                          value={newTrade.price_robux}
                          onChange={(e) => setNewTrade({...newTrade, price_robux: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="original_price">Original Price (Optional)</Label>
                        <Input
                          id="original_price"
                          type="number"
                          placeholder="18000"
                          value={newTrade.original_price_robux}
                          onChange={(e) => setNewTrade({...newTrade, original_price_robux: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your item..."
                        value={newTrade.description}
                        onChange={(e) => setNewTrade({...newTrade, description: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Item Icon (Emoji)</Label>
                        <Input
                          id="icon"
                          placeholder="🐉"
                          value={newTrade.item_icon}
                          onChange={(e) => setNewTrade({...newTrade, item_icon: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expires">Expires At (Optional)</Label>
                        <Input
                          id="expires"
                          type="datetime-local"
                          value={newTrade.expires_at}
                          onChange={(e) => setNewTrade({...newTrade, expires_at: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" variant="trading">Create Trade</Button>
                      <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trades.map((trade) => (
                <Card key={trade.id} className="overflow-hidden">
                  <div className="bg-gradient-to-br from-trading-primary/10 to-trading-success/10 p-6 text-center">
                    <div className="text-4xl mb-2">{trade.item_icon}</div>
                    <Badge variant={trade.status === 'active' ? 'default' : 'secondary'}>
                      {trade.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {trade.title}
                    </h3>
                    
                    <div className="mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-trading-success">
                          {trade.price_robux.toLocaleString()} Robux
                        </span>
                        {trade.original_price_robux && (
                          <span className="text-sm text-muted-foreground line-through">
                            {trade.original_price_robux.toLocaleString()} Robux
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">
                      <div>Game: {trade.game}</div>
                      <div>Type: {trade.item_type}</div>
                      {trade.expires_at && (
                        <div className="flex items-center space-x-1 text-trading-warning">
                          <Clock className="h-3 w-3" />
                          <span>Expires: {new Date(trade.expires_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteTrade(trade.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {trades.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    You haven't created any trades yet.
                  </div>
                  <Button variant="trading" onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Trade
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your trading profile details</CardDescription>
              </CardHeader>
              <CardContent>
                {profile && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Username</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-foreground font-medium">{profile.username}</span>
                          {profile.verified && <Badge variant="default">Verified</Badge>}
                        </div>
                      </div>
                      <div>
                        <Label>Display Name</Label>
                        <div className="text-foreground">{profile.display_name}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Rating</Label>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-foreground font-medium">{profile.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Total Trades</Label>
                        <div className="text-foreground font-medium">{profile.total_trades}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;