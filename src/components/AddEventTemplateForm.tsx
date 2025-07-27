import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useSparkData } from "@/hooks/useSparkData";
import { useToast } from "@/hooks/use-toast";

const AddEventTemplateForm: React.FC = () => {
  const { addEventTemplate } = useSparkData();
  const { toast } = useToast();
  
  const [eventForm, setEventForm] = useState({
    name: '',
    category: '',
    type: '',
    description: '',
    time: '',
    venue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventForm.name || !eventForm.category || !eventForm.type) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    addEventTemplate({
      name: eventForm.name,
      category: eventForm.category,
      type: eventForm.type as 'Individual' | 'Group',
      description: eventForm.description || undefined,
      time: eventForm.time || undefined,
      venue: eventForm.venue || undefined
    });

    toast({
      title: "Event Created Successfully",
      description: `${eventForm.name} has been added to the event list!`
    });

    // Reset form
    setEventForm({
      name: '',
      category: '',
      type: '',
      description: '',
      time: '',
      venue: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Event</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                value={eventForm.name}
                onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                placeholder="e.g., Poetry Recitation"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Grade Category *</Label>
              <Select value={eventForm.category} onValueChange={(value) => setEventForm({...eventForm, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="Junior">Junior (1-5)</SelectItem>
                  <SelectItem value="Middle">Middle (6-8)</SelectItem>
                  <SelectItem value="Senior">Senior (9-12)</SelectItem>
                  <SelectItem value="All">All Grades</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select value={eventForm.type} onValueChange={(value) => setEventForm({...eventForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={eventForm.time}
                onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                placeholder="e.g., 10:00 AM"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={eventForm.venue}
                onChange={(e) => setEventForm({...eventForm, venue: e.target.value})}
                placeholder="e.g., Main Auditorium"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                placeholder="Brief description of the event..."
                rows={3}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEventTemplateForm;