import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Poll } from "@/lib/types";

interface PollCardProps {
  poll: Omit<Poll, 'options' | 'allowMultipleVotes' | 'createdBy' | 'hasVoted' | 'userVotes'>;
}

export function PollCard({ poll }: PollCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {poll.title}
          </CardTitle>
          <Badge variant={poll.isActive ? "default" : "secondary"} className="shrink-0">
            {poll.isActive ? "Active" : "Closed"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {poll.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>{poll.totalVotes} votes</span>
              {poll.isActive && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>}
            </div>
            <div>Created {formatDate(poll.createdAt)}</div>
          </div>
          <Button asChild size="sm" className="group-hover:scale-105 transition-transform">
            <Link href={`/polls/${poll.id}`}>
              {poll.isActive ? "Vote" : "View Results"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
