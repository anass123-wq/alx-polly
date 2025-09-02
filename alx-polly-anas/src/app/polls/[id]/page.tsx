import { PollDetails } from "@/components/polls/poll-details";
import { PollDetailsSkeleton } from "@/components/polls/poll-details-skeleton";
import { PollNavigation } from "@/components/polls/poll-navigation";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { PollResultChart } from "@/components/polls/PollResultChart";

// Mock data - replace with actual data fetching
async function getPoll(id: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const mockPolls = {
    "1": {
      id: "1",
      title: "What's your favorite programming language?",
      description: "Choose your preferred programming language for web development",
      options: [
        { id: "1", text: "JavaScript", votes: 45 },
        { id: "2", text: "Python", votes: 38 },
        { id: "3", text: "TypeScript", votes: 32 },
        { id: "4", text: "Go", votes: 18 },
        { id: "5", text: "Rust", votes: 9 },
      ],
      totalVotes: 142,
      createdAt: new Date("2024-01-15"),
      endsAt: new Date("2024-02-15"),
      isActive: true,
      allowMultipleVotes: false,
      createdBy: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date("2023-01-01"),
      },
    },
    "2": {
      id: "2",
      title: "Best frontend framework for 2024?",
      description: "Which frontend framework do you think will dominate in 2024?",
      options: [
        { id: "1", text: "React", votes: 89 },
        { id: "2", text: "Vue.js", votes: 34 },
        { id: "3", text: "Angular", votes: 28 },
        { id: "4", text: "Svelte", votes: 23 },
        { id: "5", text: "Solid.js", votes: 12 },
      ],
      totalVotes: 186,
      createdAt: new Date("2024-01-10"),
      endsAt: new Date("2024-03-10"),
      isActive: true,
      allowMultipleVotes: true,
      createdBy: {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        createdAt: new Date("2023-02-01"),
      },
    },
    "3": {
      id: "3",
      title: "Remote work preferences",
      description: "How do you prefer to work?",
      options: [
        { id: "1", text: "Fully remote", votes: 67 },
        { id: "2", text: "Hybrid (2-3 days office)", votes: 45 },
        { id: "3", text: "Mostly office", votes: 23 },
        { id: "4", text: "Fully in-office", votes: 12 },
      ],
      totalVotes: 147,
      createdAt: new Date("2023-12-20"),
      endsAt: new Date("2024-01-20"),
      isActive: false,
      allowMultipleVotes: false,
      createdBy: {
        id: "user3",
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        createdAt: new Date("2023-03-01"),
      },
    },
  };

  return mockPolls[id as keyof typeof mockPolls] || null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const poll = await getPoll(params.id);

  if (!poll) {
    return {
      title: 'Poll Not Found',
    };
  }

  return {
    title: `${poll.title} | Alx Polly`,
    description: poll.description,
    openGraph: {
      title: poll.title,
      description: poll.description,
      type: 'website',
    },
  };
}

export default async function PollPage({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  if (!poll) {
    notFound();
  }

  const chartData = poll.options.map(option => ({ option: option.text, votes: option.votes }));

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Suspense fallback={<PollDetailsSkeleton />}>
        <PollDetails poll={poll} />
      </Suspense>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Poll Results</h2>
        <PollResultChart data={chartData} />
      </div>
      <PollNavigation currentPollId={params.id} />
    </div>
  );
}
