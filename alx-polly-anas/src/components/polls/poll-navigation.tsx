"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PollNavigationProps {
  currentPollId: string;
  totalPolls?: number;
}

export function PollNavigation({ currentPollId, totalPolls = 3 }: PollNavigationProps) {
  const currentId = parseInt(currentPollId);
  const prevId = currentId > 1 ? (currentId - 1).toString() : null;
  const nextId = currentId < totalPolls ? (currentId + 1).toString() : null;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
      <div>
        {prevId && (
          <Button variant="outline" asChild className="hover:scale-105 transition-transform">
            <Link href={`/polls/${prevId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Poll
            </Link>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: totalPolls }, (_, i) => (
            <div
              key={i + 1}
              className={`w-2 h-2 rounded-full transition-colors ${
                i + 1 === currentId ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">
          {currentId} of {totalPolls}
        </span>
      </div>

      <div>
        {nextId && (
          <Button variant="outline" asChild className="hover:scale-105 transition-transform">
            <Link href={`/polls/${nextId}`}>
              Next Poll
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
