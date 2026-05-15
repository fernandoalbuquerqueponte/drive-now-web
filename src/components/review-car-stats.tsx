import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Star } from "lucide-react";

import type { Review } from "@/http/types/use-edit-user-profile-response";

import { Card, CardContent } from "./ui/card";

function ReviewCarStats({ review }: { review: Review }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <img
            className="w-20 rounded-lg"
            src={review.car.image}
            alt={review.car.brand}
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">
              {review.car.brand} {review.car.model}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isFilled = index < review.rating;

                  return (
                    <Star
                      key={index}
                      size={13}
                      className={
                        isFilled
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }
                    />
                  );
                })}
                <span className="text-muted-foreground ml-2 text-sm">
                  ({review.rating})
                </span>
              </div>
              <h1 className="text-muted-foreground">
                {format(review.createdAt, "dd 'de' MMM. 'de' yyyy", {
                  locale: ptBR,
                })}
              </h1>
            </div>
          </div>
        </div>
        <h3 className="text-muted-foreground text-sm">{review.comment}</h3>
      </CardContent>
    </Card>
  );
}

export default ReviewCarStats;
