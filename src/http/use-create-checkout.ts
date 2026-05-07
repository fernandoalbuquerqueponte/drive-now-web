/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import { api } from "./api-client";
import type { CheckoutRequest } from "./types/use-create-checkout-request";
import type { CheckoutResponse } from "./types/use-create-checkout-response";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: async (data: CheckoutRequest) => {
      const response = await api.post<CheckoutResponse>(
        "/api/payments/checkout",
        data,
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.assign(data.url);
      }
    },
    onError: (error: any) => {
      console.error(
        "Erro ao processar pagamento:",
        error.response?.data || error.message,
      );
      alert("Falha ao iniciar checkout. Tente novamente.");
    },
  });
}
