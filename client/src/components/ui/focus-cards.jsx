"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export const Card = React.memo(
  ({ card, index, hovered, setHovered, toggleLike }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.content}
        className="object-cover w-full h-full absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.prompt}
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-white">{card.likes.length}</p>
          <Heart
            onClick={() => toggleLike(card.id)}
            className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
              card.likes.includes(card.user_id)
                ? "text-red-600 fill-red-500"
                : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards, toggleLike }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 md:px-8 w-full my-10">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          toggleLike={toggleLike}
        />
      ))}
    </div>
  );
}
