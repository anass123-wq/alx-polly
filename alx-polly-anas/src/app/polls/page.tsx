import { PollCard } from "@/components/polls/poll-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data - replace with actual data fetching
const mockPolls = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Choose your preferred programming language for web development",
    totalVotes: 142,
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "2", 
    title: "Best frontend framework for 2024?",
    description: "Which frontend framework do you think will dominate in 2024?",
    totalVotes: 186,
    createdAt: new Date("2024-01-10"),
    isActive: true,
  },
  {
    id: "3", 
    title: "Remote work preferences",
    description: "How do you prefer to work?",
    totalVotes: 147,
    createdAt: new Date("2023-12-20"),
    isActive: false,
  },
];

export default function PollsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            All Polls
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Browse and vote on community polls
          </p>
        </div>
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/polls/create">Create New Poll</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {mockPolls.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-muted-foreground text-lg mb-6">No polls found.</p>
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/polls/create">Create the first poll</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
