import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,

  getInfiniteTasks: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional(), // Ensure limit is optional but within a range
        cursor: z.number().nullish(), // Cursor for pagination
        query: QueryValidator, // Use the provided QueryValidator
      })
    )
    .query(async ({ input }) => {
      const { query, cursor = 1, limit = 10 } = input; // Default limit to 10 if not provided
      const payload = await getPayloadClient();

      // Construct the where clause based on the query
      const whereClause: Record<string, any> = {};

      if (query.category) {
        whereClause.category = { equals: query.category };
      }

      // Sorting logic based on the sort query parameter
      let sortClause = {};
      if (query.sort) {
        sortClause = { createdAt: query.sort }; // Example sorting by createdAt
      }

      // Assuming `query.sort` is either 'asc' or 'desc', and you want to sort by 'createdAt'
      let sortString = query.sort === "desc" ? "-createdAt" : "createdAt"; // Adjust field name as necessary

      const taskResults = await payload.find({
        collection: "tasks",
        where: whereClause,
        sort: sortString,
        depth: 1,
        limit,
        page: cursor ?? 1,
      });

      return {
        items: taskResults.docs,
        nextPage: taskResults.hasNextPage ? taskResults.nextPage : null,
      };
    }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
