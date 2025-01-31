import { z } from 'zod'
import {
  sharedGeocodeQuerySchema,
  geocodeQueryRefinements
} from './geocodeRequestSchema'
import { listingFilterParamsSchema } from './listingSearchParamsSchema'

export const geocodeBoundaryQuerySchema = sharedGeocodeQuerySchema
  .extend({
    address_types: z.string().optional()
  })
  .merge(listingFilterParamsSchema.partial())
  .strict()
  .refine(...geocodeQueryRefinements)

export type GeocodeBoundaryQueryParams = z.infer<
  typeof geocodeBoundaryQuerySchema
>
