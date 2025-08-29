import { NextRequest, NextResponse } from 'next/server';

// Mock vote storage (in a real app, this would be a database)
const voteStorage = new Map<string, number>();

// Mock user vote tracking (in a real app, this would be in a database)
const userVotes = new Map<string, string[]>();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;

    // Validate poll ID
    if (!pollId || typeof pollId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid poll ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { optionIds, userId } = body;

    // Validate request body
    if (!optionIds || !Array.isArray(optionIds) || optionIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one option must be selected' },
        { status: 400 }
      );
    }

    // Validate option IDs are strings
    if (!optionIds.every((id: string) => typeof id === 'string' && id.trim())) {
      return NextResponse.json(
        { error: 'Invalid option IDs provided' },
        { status: 400 }
      );
    }

    // Simulate user authentication check (in a real app, this would be from auth token)
    const currentUserId = userId || 'anonymous-user';

    // Check if user already voted (for single-vote polls)
    const userVoteKey = `${currentUserId}-${pollId}`;
    if (userVotes.has(userVoteKey)) {
      return NextResponse.json(
        { error: 'You have already voted on this poll' },
        { status: 409 }
      );
    }

    // Simulate vote processing
    console.log(`Processing votes for poll ${pollId}:`, optionIds);

    // In a real app, you would:
    // 1. Validate user authentication
    // 2. Check if user already voted (if single vote)
    // 3. Validate poll is active
    // 4. Update vote counts in database

    // Mock storage update
    optionIds.forEach((optionId: string) => {
      const key = `${pollId}-${optionId}`;
      const currentVotes = voteStorage.get(key) || 0;
      voteStorage.set(key, currentVotes + 1);
    });

    // Track user vote
    userVotes.set(userVoteKey, optionIds);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: 'Vote recorded successfully',
      votedOptions: optionIds,
      totalVotes: optionIds.length,
    });

  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { error: 'Failed to process vote. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get current vote counts for a poll
  const pollId = params.id;
  const votes: Record<string, number> = {};
  
  // Collect all votes for this poll from our mock storage
  for (const [key, count] of voteStorage.entries()) {
    if (key.startsWith(`${pollId}-`)) {
      const optionId = key.split('-')[1];
      votes[optionId] = count;
    }
  }

  return NextResponse.json({
    pollId,
    votes,
    totalVotes: Object.values(votes).reduce((sum, count) => sum + count, 0),
  });
}
