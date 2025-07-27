import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload } from "lucide-react";
import { useSparkData } from "@/hooks/useSparkData";
import { useToast } from "@/hooks/use-toast";

const AddWinnerPhotoForm: React.FC = () => {
  const { winners, addWinnerPhoto } = useSparkData();
  const { toast } = useToast();
  
  const [selectedWinner, setSelectedWinner] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWinner || !imageUrl) {
      toast({
        title: "Missing Fields",
        description: "Please select a winner and provide an image URL.",
        variant: "destructive"
      });
      return;
    }

    addWinnerPhoto(selectedWinner, imageUrl);

    const winner = winners.find(w => w.id === selectedWinner);
    toast({
      title: "Photo Added Successfully",
      description: `Photo added for ${winner?.name}!`
    });

    // Reset form
    setSelectedWinner('');
    setImageUrl('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Add Winner Photo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="winner">Select Winner</Label>
            <Select value={selectedWinner} onValueChange={setSelectedWinner}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a winner" />
              </SelectTrigger>
              <SelectContent>
                {winners.map((winner) => (
                  <SelectItem key={winner.id} value={winner.id}>
                    {winner.name} - {winner.event} ({winner.house})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              required
            />
            <p className="text-xs text-muted-foreground">
              Provide a URL to the winner's photo. For best results, use a square image (1:1 aspect ratio).
            </p>
          </div>

          {imageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddWinnerPhotoForm;