import {productType} from './product'
import {productCentralizedType} from './productCentralized'
import {pageType} from './page'
import {serviceType} from './service'
import {calendarEventType} from './calendarEvent'
import {formSubmissionType} from './formSubmission'
import {siteTranslationType} from './siteTranslation'

// productCentralizedType is the NEW centralized schema (1 doc = all languages)
// productType is the OLD per-language schema (kept for migration)
export const schemaTypes = [
  productCentralizedType, // NEW - use this!
  productType,            // OLD - will be removed
  pageType, 
  serviceType, 
  calendarEventType, 
  formSubmissionType, 
  siteTranslationType
]
