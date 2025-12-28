"use client"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
    }).format(price);
}

export interface PaymentResult {
  success: boolean;
  reference?: string;
  error?: string;
}

export async function payWithPayStack(
  amount: number,
  customerData: {
      email: string;
      firstName: string;
      lastName: string;
      tel: string;
  },
  onSuccess?: (reference: string) => void,
  onError?: (error: string) => void
): Promise<PaymentResult> {
    return new Promise(async (resolve) => {
      try {
          // Validate API key is configured
          const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
          if (!publicKey) {
              const errorMessage = "Payment service not configured. Please contact support.";
              if (onError) onError(errorMessage);
              resolve({
                  success: false,
                  error: errorMessage,
              });
              return;
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(customerData.email)) {
              const errorMessage = "Invalid email address.";
              if (onError) onError(errorMessage);
              resolve({
                  success: false,
                  error: errorMessage,
              });
              return;
          }

          // Validate amount
          if (amount <= 0) {
              const errorMessage = "Invalid order amount.";
              if (onError) onError(errorMessage);
              resolve({
                  success: false,
                  error: errorMessage,
              });
              return;
          }

          // Ensure we're in the browser before importing/paystack usage
          if (typeof window === "undefined") {
              const errorMessage = "Payment can only be initialized in the browser.";
              if (onError) onError(errorMessage);
              resolve({ success: false, error: errorMessage });
              return;
          }

          const PaystackModule = await import("@paystack/inline-js");
          const PaystackPop = PaystackModule.default || PaystackModule;
          const popup = new PaystackPop();
          popup.newTransaction({
              key: publicKey,
              email: customerData.email,
              firstName: customerData.firstName,
              lastName: customerData.lastName,
              phone: customerData.tel,
              amount: Math.round(amount * 100), // Convert to kobo (Paystack expects amount in kobo)
              currency: "NGN",
              metadata: {
                  custom_fields: [
                      {
                          display_name: "Customer",
                          variable_name: "customer_name",
                          value: `${customerData.firstName} ${customerData.lastName}`,
                      },
                  ],
              },
              onSuccess: (transaction: any) => {
                  // Verify transaction was actually successful
                  if (transaction && transaction.reference) {
                      const result: PaymentResult = {
                          success: true,
                          reference: transaction.reference,
                      };
                      if (onSuccess) onSuccess(transaction.reference);
                      resolve(result);
                  } else {
                      const result: PaymentResult = {
                          success: false,
                          error: "Payment verification failed. Please check your email for confirmation.",
                      };
                      if (onError) onError(result.error || "Payment was not completed");
                      resolve(result);
                  }
              },
              onCancel: () => {
                  const result: PaymentResult = {
                      success: false,
                      error: "You cancelled the payment. No charges were made.",
                  };
                  if (onError) onError(result.error || "Payment cancelled");
                  resolve(result);
              },
          });
      } catch (error) {
          const errorMessage =
              error instanceof Error
                  ? error.message
                  : "Payment initialization failed. Please try again.";
          const result: PaymentResult = {
              success: false,
              error: errorMessage,
          };
          if (onError) onError(errorMessage);
          resolve(result);
      }
  });
}