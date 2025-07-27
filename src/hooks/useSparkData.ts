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

export interface EventTemplate {
  id: string;
  name: string;
  category: string;
  type: 'Individual' | 'Group';
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
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

const MOCK_EVENT_TEMPLATES: EventTemplate[] = [
  {
    id: '1',
    name: 'Poetry Recitation',
    category: 'Junior',
    type: 'Individual',
    description: 'Express creativity through verse',
    time: '10:00 AM',
    venue: 'Main Auditorium'
  },
  {
    id: '2',
    name: 'Group Dance',
    category: 'Senior',
    type: 'Group',
    description: 'Showcase traditional and modern dance forms',
    time: '2:00 PM',
    venue: 'School Ground'
  },
  {
    id: '3',
    name: 'Science Quiz',
    category: 'Middle',
    type: 'Individual',
    description: 'Test your scientific knowledge',
    time: '11:00 AM',
    venue: 'Science Laboratory'
  },
  {
    id: '4',
    name: 'Drama Competition',
    category: 'Senior',
    type: 'Group',
    description: 'Theatrical performances',
    time: '3:00 PM',
    venue: 'Main Auditorium'
  },
  {
    id: '5',
    name: 'Art Exhibition',
    category: 'All',
    type: 'Individual',
    description: 'Display of creative artwork',
    time: '9:00 AM',
    venue: 'Art Gallery'
  }
];

const MOCK_WINNERS: Winner[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    event: 'Poetry Recitation',
    house: 'Tagore',
    position: 1,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Priya Patel',
    event: 'Group Dance',
    house: 'Gandhi',
    position: 1,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Rahul Singh',
    event: 'Science Quiz',
    house: 'Nehru',
    position: 2,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Ananya Reddy',
    event: 'Drama Competition',
    house: 'Delany',
    position: 1,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Vikram Kumar',
    event: 'Art Exhibition',
    house: 'Tagore',
    position: 3,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
];

export const useSparkData = () => {
  const [houses, setHouses] = useState<House[]>(MOCK_HOUSES);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [winners, setWinners] = useState<Winner[]>(MOCK_WINNERS);
  const [eventTemplates, setEventTemplates] = useState<EventTemplate[]>(MOCK_EVENT_TEMPLATES);
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

  // Add new event template
  const addEventTemplate = (newEventTemplate: Omit<EventTemplate, 'id'>) => {
    const eventTemplate: EventTemplate = {
      ...newEventTemplate,
      id: Date.now().toString()
    };
    setEventTemplates(prev => [...prev, eventTemplate]);
  };

  // Add winner photo
  const addWinnerPhoto = (winnerId: string, imageUrl: string) => {
    setWinners(prev => prev.map(winner => 
      winner.id === winnerId 
        ? { ...winner, image: imageUrl }
        : winner
    ));
  };

  return {
    houses,
    events,
    winners,
    eventTemplates,
    loading,
    addEvent,
    addEventTemplate,
    addWinnerPhoto,
    calculatePoints
  };
};