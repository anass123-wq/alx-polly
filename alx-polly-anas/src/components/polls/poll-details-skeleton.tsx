import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PollDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4 animate-pulse" />
            <Skeleton className="h-4 w-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            <Skeleton className="h-4 w-2/3 animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <Skeleton className="h-3 w-32 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <Skeleton className="h-4 w-20 animate-pulse" style={{ animationDelay: '0.6s' }} />
            <Skeleton className="h-4 w-28 animate-pulse" style={{ animationDelay: '0.7s' }} />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-5 w-32 animate-pulse" style={{ animationDelay: `${0.9 + i * 0.1}s` }} />
                <Skeleton className="h-4 w-16 animate-pulse" style={{ animationDelay: `${1.0 + i * 0.1}s` }} />
              </div>
              <Skeleton className="h-2 w-full animate-pulse" style={{ animationDelay: `${1.1 + i * 0.1}s` }} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
