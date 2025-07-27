import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSparkData } from "@/hooks/useSparkData";
import HouseCard from "@/components/HouseCard";
import Header from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();
  const { houses, events, winners } = useSparkData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="h-16 w-16 text-yellow-400 mr-4 animate-pulse-glow" />
            <div>
              <h1 className="text-6xl font-bold text-foreground mb-2">SPARK</h1>
              <p className="text-xl text-muted-foreground">The Patrician Pulse</p>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Live scoring and results for our annual cultural fest. Watch houses compete in real-time!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/results')} className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>View All Results</span>
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/admin')} className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Admin Dashboard</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Scoreboards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Live House Standings</h2>
            <p className="text-muted-foreground">Real-time rankings from all SPARK events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house, index) => (
              <div key={house.name} style={{ animationDelay: `${index * 0.2}s` }}>
                <HouseCard house={house} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Recent Winners</h2>
            <p className="text-muted-foreground">Celebrating our latest champions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.slice(0, 3).map((winner, index) => (
              <Card key={winner.id} className="hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{winner.name}</h3>
                  <p className="text-muted-foreground mb-3">{winner.event}</p>
                  <Badge variant="outline" className={`border-${houses.find(h => h.name === winner.house)?.color} text-${houses.find(h => h.name === winner.house)?.color}-foreground bg-${houses.find(h => h.name === winner.house)?.color}/10`}>
                    {winner.house} House
                  </Badge>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {winner.position === 1 ? '🥇 First Place' : 
                     winner.position === 2 ? '🥈 Second Place' : 
                     winner.position === 3 ? '🥉 Third Place' : 
                     `#${winner.position}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Card className="bg-gradient-primary">
              <CardContent className="p-8">
                <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{events.length}</div>
                <p className="text-muted-foreground">Total Events</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-primary">
              <CardContent className="p-8">
                <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{winners.length}</div>
                <p className="text-muted-foreground">Winners Declared</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-primary">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">4</div>
                <p className="text-muted-foreground">Competing Houses</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-xl font-bold text-foreground">SPARK - The Patrician Pulse</span>
          </div>
          <p className="text-muted-foreground">Celebrating excellence, fostering competition, building character.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
