import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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

          {reviews.length === 0 && (
            <Empty className="bg-muted/30 h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>Lista de comentários vazia</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Você ainda não cadastrou nenhum comentário.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link to="/home">
                  <Button variant="outline" size="sm">
                    <Plus />
                    Cadastrar comentário
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
