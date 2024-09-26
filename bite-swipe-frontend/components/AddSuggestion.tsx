import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import ButtonLayout from "./ui/ButtonLayout";
import FileUpload from "./ui/fileUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuggestionCreateResponse } from "./App";
import { postSuggestion } from "@/service/client";

interface AddSuggestionProps {
  onAdd: (suggestion: SuggestionCreateResponse) => void;
  onNavigateToVote: () => void;
}

function AddSuggestionTab({ onAdd, onNavigateToVote }: AddSuggestionProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("Placeholder Adress"); //TODO: Remove
  const [image, setImage] = useState<File | null>(null);
  const [feedBackDialog, setFeedBackDialog] = useState<string | null>(null);

  const refNameField = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !image) return;
    // Make request and bubble up response
    const suggestion = await postSuggestion({
      name,
      address,
      image: image,
    });

    onAdd(suggestion);

    setFeedBackDialog("Thanks for your suggestion");
  };
  function resetForm() {
    setName("");
    setAddress("");
    setImage(null);
  }
  const onFileFieldChange = (data: File | null) => {
    setImage(data);
  };

  useEffect(() => {
    // Adds a slight delay in order to pick up clicks
    setTimeout(() => refNameField.current?.focus(), 200);
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto">
      {feedBackDialog && (
        <div className="border border-teal-300 bg-teal-100 p-4 rounded-md my-8">
          <p>{feedBackDialog}</p>
          <ButtonLayout>
            <Button
              variant="outline"
              onClick={() => {
                onNavigateToVote();
              }}
            >
              Go vote
            </Button>
            <Button variant="default" onClick={resetForm}>
              Add a new suggestion
            </Button>
          </ButtonLayout>
        </div>
      )}
      {!feedBackDialog && (
        <Card>
          <CardHeader>
            <CardTitle>Add a Food Suggestion</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  ref={refNameField}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <FileUpload onFileChange={onFileFieldChange} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit}>
              Add Suggestion
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default AddSuggestionTab;
