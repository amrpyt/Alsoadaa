// ============================================
// NEW CENTRALIZED SCHEMAS (1 doc = all languages)
// ============================================
import { productCentralizedType } from './productCentralized'
import { serviceCentralizedType } from './serviceCentralized'
import { pageCentralizedType } from './pageCentralized'
import { siteTranslationCentralizedType } from './siteTranslationCentralized'
import { calendarEventCentralizedType } from './calendarEventCentralized'
import { siteSettingsType } from './siteSettings'
import { pageContentCentralizedType } from './pageContentCentralized'

// ============================================
// OLD SCHEMAS (kept for migration, will be removed)
// ============================================
import { productType } from './product'
import { pageType } from './page'
import { serviceType } from './service'
import { calendarEventType } from './calendarEvent'
import { siteTranslationType } from './siteTranslation'

// ============================================
// OTHER SCHEMAS
// ============================================
import { formSubmissionType } from './formSubmission'

export const schemaTypes = [
  // ✅ NEW CENTRALIZED (use these!)
  productCentralizedType,
  serviceCentralizedType,
  pageCentralizedType,
  siteTranslationCentralizedType,
  calendarEventCentralizedType,
  siteSettingsType,
  pageContentCentralizedType,

  // 📥 Form Submissions
  formSubmissionType,

  // ⚠️ OLD (for migration - will be removed)
  productType,
  pageType,
  serviceType,
  calendarEventType,
  siteTranslationType,
]
