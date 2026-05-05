import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseCreateReviewRequest } from "./types/use-create-review-request";
import type { UseCreateReviewResponse } from "./types/use-create-review-response";

export function useCreateReview(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UseCreateReviewRequest) => {
      const response = await api.post<UseCreateReviewResponse>(
        `/api/cars/${id}/reviews`,
        data,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-car-by-id", id],
      });
    },
  });
}
