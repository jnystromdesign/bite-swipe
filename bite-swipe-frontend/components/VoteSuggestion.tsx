import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import { Button } from "@/components/ui/button";
import { Suggestion } from "./App";
import { useDrag } from "react-use-gesture";

interface VoteSuggestionsProps {
  suggestions: Suggestion[];
  onVote: (id: number, points: number) => void;
}

export default function VoteSuggestions({
  suggestions,
  onVote,
}: VoteSuggestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVote = (points: number) => {
    if (currentIndex < suggestions.length) {
      onVote(suggestions[currentIndex].sequenceIndex, points);
      setCurrentIndex(currentIndex + 1);
      api.start({ x: 0, y: 0 });
    }
  };

  const bind = useDrag(
    ({
      down,
      movement: [mx, my],
      velocity,
      direction: [xDir],
      swipe: [swipeX, swipeY],
    }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        if (swipeX === -1 || (mx < -50 && !swipeY))
          handleVote(0); // Swipe/drag left: No
        else if (swipeX === 1 || (mx > 50 && !swipeY))
          handleVote(1); // Swipe/drag right: Yes
        else if (swipeY === -1 || my < -50)
          handleVote(2); // Swipe/drag up: Love it!
        else api.start({ x: 0, y: 0 });
      } else {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
      }
    }
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleVote(0); // No
      } else if (event.key === "ArrowRight") {
        handleVote(1); // Yes
      } else if (event.key === "ArrowUp") {
        handleVote(2); // Love it!
      }
    };

    if (containerRef.current) {
      containerRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  if (suggestions.length === 0) {
    return (
      <div className="text-center mt-8">No suggestions to vote on yet!</div>
    );
  }

  if (currentIndex >= suggestions.length) {
    return (
      <div className="text-center mt-8">No more suggestions to vote on!</div>
    );
  }

  const suggestion = suggestions[currentIndex];

  return (
    <>
      <h2 className="text-2xl mt-6 text-center">Where should we have lunch?</h2>
      <animated.div
        {...bind()}
        style={{ x, y, touchAction: "none" }}
        className="touch-none cursor-grab active:cursor-grabbing"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardContent
            className="p-6"
            ref={containerRef}
            tabIndex={0}
            aria-label="Use arrow keys to vote. Left for No, Right for Yes, Up for Love it!"
          >
            <img
              src={suggestion.image}
              alt={suggestion.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{suggestion.name}</h2>
            <p className="text-gray-600 mb-4">{suggestion.address}</p>

            <div className="flex justify-between mt-4 gap-2">
              <Button onClick={() => handleVote(0)} variant="outline">
                <ChevronLeft className="mr-2" /> No
              </Button>
              <Button onClick={() => handleVote(2)} variant="outline">
                <ChevronUp className="mr-2" /> Love it!
              </Button>
              <Button onClick={() => handleVote(1)} variant="outline">
                <ChevronRight className="mr-2" /> Yes
              </Button>
            </div>
          </CardContent>
        </Card>
      </animated.div>
    </>
  );
}
