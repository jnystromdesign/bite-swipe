import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { Suggestion } from "./App";

interface ResultsProps {
  suggestions: Suggestion[];
}

export default function Results({ suggestions }: ResultsProps) {
  const sortedSuggestions = [...suggestions].sort((a, b) => b.votes - a.votes);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voting Results</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSuggestions.length === 0 ? (
          <p>No votes yet!</p>
        ) : (
          <ul className="space-y-4">
            {sortedSuggestions.map((suggestion) => (
              <li
                key={suggestion.sequenceIndex}
                className="flex items-center space-x-4"
              >
                <img
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">
                    {suggestion.name} ({suggestion.sequenceIndex})
                  </h3>
                  <p className="text-sm text-gray-600">{suggestion.address}</p>
                  <p className="text-sm font-semibold">
                    Votes: {suggestion.votes}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
