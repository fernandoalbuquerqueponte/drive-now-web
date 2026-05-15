import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Review } from "@/http/types/use-edit-user-profile-response";

import ReviewCarStats from "./review-car-stats";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface MyCommentsProfileTabsSectionProps {
  reviews: Review[];
}

export default function MyCommentsProfileTabsSection({
  reviews,
}: MyCommentsProfileTabsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Meus Comentários</h1>
          <h3 className="text-muted-foreground text-sm">
            {reviews.length} comentários cadastrados
          </h3>
        </div>
        <Link to="/my-cars">
          <Button variant="link" size="lg">
            Ver todos
            <ArrowRight />
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-150 w-full">
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <ReviewCarStats key={review.id} review={review} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
