
import { render, screen } from '@testing-library/react';
import { PollResultChart } from './PollResultChart';
import PollPage from '@/app/polls/[id]/page';

// Mock the chart component to avoid rendering issues in tests
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});

describe('PollResultChart', () => {
  // Unit Test 1: Happy Path
  it('should render the chart with the correct data', () => {
    const mockData = [
      { option: 'Option 1', votes: 10 },
      { option: 'Option 2', votes: 20 },
    ];
    render(<PollResultChart data={mockData} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
  });

  // Unit Test 2: Edge Case
  it('should render correctly with no data', () => {
    render(<PollResultChart data={[]} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    // The Bar component might not be rendered if there is no data
    expect(screen.queryByTestId('bar')).not.toBeInTheDocument();
  });
});

// Integration Test
describe('PollPage', () => {
  it('should render the poll details and the poll result chart', async () => {
    const mockParams = { id: '1' };
    // As PollPage is a server component, we need to resolve the promise it returns
    const Page = await PollPage({ params: mockParams });
    render(Page);

    // Check for poll details
    expect(screen.getByText("What's your favorite programming language?")).toBeInTheDocument();

    // Check for the chart
    expect(screen.getByText('Poll Results')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
