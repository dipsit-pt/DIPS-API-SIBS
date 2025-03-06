// Imports --------------------------------------------
import { z } from 'zod';

// Define the customer schema (you'll need to define this based on your requirements)
const customerSchema = z.object({
  customerInfo: z
    .object({
      customerEmail: z.string().email().optional(),
      shippingAddress: z
        .object({
          street1: z.string(),
          street2: z.string(),
          city: z.string(),
          postcode: z.string().regex(/^\d{4}-\d{3}$/, {
            message: 'Must match the format ####-###',
          }),
          country: z.literal('PT'),
        })
        .optional(),
      billingAddress: z.object({
        street1: z.string(),
        street2: z.string(),
        city: z.string(),
        postcode: z.string().regex(/^\d{4}-\d{3}$/, {
          message: 'Must match the format ####-###',
        }),
        country: z.literal('PT'),
      }),
    })
    .strict(),
});

const headers = z
  .object({
    'content-type': z.literal('application/json').optional(),
    'content-length': z.string().optional(),
    'x-ibm-client-id': z.string(),
    authorization: z.string().refine((val) => val.startsWith('Bearer '), {
      message: 'Needs an Authorization token',
    }),
    accept: z.literal('application/json').optional(),
    host: z.string().optional(),
  })
  .passthrough(); // Allows additional headers

// Object endpoints schemas --------------------------------------------
export const endpoints = {
  create: {
    method: 'POST',
    hasHeaders: headers,
    hasBody: z
      .object({
        // Merchant-related fields
        merchant: z
          .object({
            terminalId: z.number().int().nonnegative(),
            channel: z.literal('web'),
            merchantTransactionId: z.string().refine((val) => val.length <= 32, {
              message: 'merchantTransactionId can not exceed more than 32 characters long',
            }),
          })
          .strict(),

        // Transaction-related fields
        transaction: z
          .object({
            transactionTimestamp: z.string().datetime(),
            description: z.string(),
            moto: z.boolean(),
            paymentType: z.string(),
            paymentMethod: z.array(z.enum(['REFERENCE', 'CARD', 'MBWAY'])),
            amount: z
              .object({
                value: z
                  .number()
                  .nonnegative()
                  .refine((val) => Number(val.toFixed(2)) === val, {
                    message: 'Amount must have a maximum of two decimal places',
                  }),
                currency: z.string().length(3),
              })
              .strict(),
            paymentReference: z
              .object({
                entity: z.string(),
                minAmount: z
                  .object({
                    value: z
                      .number()
                      .nonnegative()
                      .refine((val) => Number(val.toFixed(2)) === val, {
                        message: 'Min amount must have a maximum of two decimal places',
                      }),
                    currency: z.string().length(3),
                  })
                  .strict(),
                maxAmount: z
                  .object({
                    value: z
                      .number()
                      .nonnegative()
                      .refine((val) => Number(val.toFixed(2)) === val, {
                        message: 'Max amount must have a maximum of two decimal places',
                      }),
                    currency: z.string().length(3),
                  })
                  .strict(),
                initialDatetime: z.string().datetime(),
                finalDatetime: z.string().datetime(),
              })
              .strict(),
          })
          .strict(),

        // Optional recurringTransaction section
        recurringTransaction: z
          .object({
            validityDate: z.string().datetime(),
            amountQualifier: z.string(),
            description: z.string(),
          })
          .strict()
          .optional(),

        // Optional tokenisation section
        tokenisation: z
          .object({
            tokenisationRequest: z
              .object({
                tokeniseCard: z.boolean(),
              })
              .strict(),
          })
          .strict()
          .optional(),

        customer: z.any(), // Placeholder, validation handled in refine below
      })
      .refine(
        (data) => {
          const isCard = data.transaction.paymentMethod.includes('CARD');
          if (isCard) {
            const customerValidation = customerSchema.safeParse(data.customer);
            return customerValidation.success;
          }
          return true; // No validation needed for non-CARD payment methods
        },
        {
          message: 'Customer information is required and must match the schema if "CARD" is included in paymentMethod',
        }
      ),
  },
};
