"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTabs,
} from "@/components/ui/Tabs/Tabs";

import AddSuggestionTab from "./AddSuggestion";
import Results from "./Results";
import VoteSuggestions from "./VoteSuggestion";
import { fetchSuggestions } from "@/service/client";

export interface Suggestion {
  sequenceIndex: number;
  name: string;
  address: string;
  image: string;
  votes: number;
}

export interface SuggestionCreate {
  name: string;
  address: string;
  image: File | null;
}

export interface SuggestionCreateResponse {
  name: string;
  address: string;
  image: string;
}

// Define your tab keys
const tabKeys = ["vote", "add", "results"] as const;
type TabKeys = (typeof tabKeys)[number];

export default function App() {
  const [bgColor, setBgColor] = useState("bg-white");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { activeTab, setActiveTab } = useTabs<TabKeys>("add", tabKeys);

  useEffect(() => {
    getSuggestionData();
  }, []);

  const getSuggestionData = async () => {
    const data = await fetchSuggestions();
    setSuggestions(data || []);
  };

  const addSuggestion = (suggestion: {
    name: string;
    address: string;
    image: string;
  }) => {
    const newItem: Suggestion = {
      ...suggestion,
      image: suggestion.image,
      sequenceIndex: Date.now(),
      votes: 0,
    };
    setSuggestions([...suggestions, newItem]);
  };

  const voteSuggestion = (id: number, points: number) => {
    switch (points) {
      case 1:
        setBgColor("bg-pink-200");
        break;
      case 2:
        setBgColor("bg-yellow-200");
        break;
      default:
        setBgColor("bg-gray-200");
        break;
    }

    setTimeout(() => {
      setBgColor("bg-white");
    }, 500);

    setSuggestions(
      suggestions.map((suggestion) =>
        suggestion.sequenceIndex === id
          ? { ...suggestion, votes: suggestion.votes + points }
          : suggestion
      )
    );
  };
  // Create a wrapper function for onValueChange
  const handleTabChange = (value: TabKeys) => {
    setActiveTab(value);
  };

  return (
    <div
      className={`container h-screen mx-auto p-4 transition-all duration-200 ${bgColor}`}
    >
      <h1 className="text-2xl font-bold mb-4">Bite Swipe 🌭 ← 🍣 → 🍕</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange} tabs={tabKeys}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vote">Vote</TabsTrigger>
          <TabsTrigger value="add">Add Suggestion</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="vote">
          <VoteSuggestions suggestions={suggestions} onVote={voteSuggestion} />
        </TabsContent>
        <TabsContent value="add">
          <AddSuggestionTab
            onAdd={addSuggestion}
            onNavigateToVote={() => setActiveTab("vote")}
          />
        </TabsContent>
        <TabsContent value="results">
          <Results suggestions={suggestions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
