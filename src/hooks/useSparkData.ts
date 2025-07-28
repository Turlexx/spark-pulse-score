import { useState, useEffect } from 'react';

export interface House {
  name: string;
  score: number;
  rank: number;
  color: 'tagore' | 'delany' | 'gandhi' | 'nehru';
}

export interface Event {
  id: string;
  name: string;
  category: 'Junior' | 'Middle' | 'Senior';
  type: 'Individual' | 'Group';
  house: string;
  position: number;
  points: number;
  date: string;
}

export interface Winner {
  id: string;
  name: string;
  event: string;
  house: string;
  position: number;
  image?: string;
}

// Mock data for initial version
const MOCK_HOUSES: House[] = [
  { name: 'Tagore', score: 285, rank: 1, color: 'tagore' },
  { name: 'Gandhi', score: 240, rank: 2, color: 'gandhi' },
  { name: 'Nehru', score: 195, rank: 3, color: 'nehru' },
  { name: 'Delany', score: 180, rank: 4, color: 'delany' },
];

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Poetry Recitation',
    category: 'Junior',
    type: 'Individual',
    house: 'Tagore',
    position: 1,
    points: 10,
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Group Dance',
    category: 'Senior',
    type: 'Group',
    house: 'Gandhi',
    position: 1,
    points: 20,
    date: '2024-01-16'
  },
  {
    id: '3',
    name: 'Science Quiz',
    category: 'Middle',
    type: 'Individual',
    house: 'Nehru',
    position: 2,
    points: 7,
    date: '2024-01-17'
  }
];

const MOCK_WINNERS: Winner[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    event: 'Poetry Recitation',
    house: 'Tagore',
    position: 1
  },
  {
    id: '2',
    name: 'Priya Patel',
    event: 'Group Dance',
    house: 'Gandhi',
    position: 1
  },
  {
    id: '3',
    name: 'Rahul Singh',
    event: 'Science Quiz',
    house: 'Nehru',
    position: 2
  }
];

export const useSparkData = () => {
  const [houses, setHouses] = useState<House[]>(MOCK_HOUSES);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [winners, setWinners] = useState<Winner[]>(MOCK_WINNERS);
  const [loading, setLoading] = useState(false);

  // Calculate scoring based on position and type
  const calculatePoints = (position: number, type: 'Individual' | 'Group'): number => {
    const individualScoring = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 2, 6: 1 };
    const groupScoring = { 1: 20, 2: 14, 3: 10, 4: 6 };
    
    if (type === 'Individual') {
      return individualScoring[position as keyof typeof individualScoring] || 0;
    } else {
      return groupScoring[position as keyof typeof groupScoring] || 0;
    }
  };

  // Add new event (for admin)
  const addEvent = (newEvent: Omit<Event, 'id' | 'points'>) => {
    const points = calculatePoints(newEvent.position, newEvent.type);
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      points
    };
    
    setEvents(prev => [...prev, event]);
    
    // Update house scores
    setHouses(prev => {
      const updated = prev.map(house => 
        house.name === newEvent.house 
          ? { ...house, score: house.score + points }
          : house
      );
      
      // Recalculate ranks
      return updated
        .sort((a, b) => b.score - a.score)
        .map((house, index) => ({ ...house, rank: index + 1 }));
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add small points to houses occasionally
      if (Math.random() < 0.1) {
        const randomHouse = Math.floor(Math.random() * 4);
        setHouses(prev => {
          const updated = [...prev];
          updated[randomHouse].score += Math.floor(Math.random() * 3) + 1;
          return updated
            .sort((a, b) => b.score - a.score)
            .map((house, index) => ({ ...house, rank: index + 1 }));
        });
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    houses,
    events,
    winners,
    loading,
    addEvent,
    calculatePoints
  };
};