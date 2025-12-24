// ============================================
// CENTRALIZED SCHEMAS (1 doc = all languages)
// ============================================
import { productCentralizedType } from './productCentralized'
import { serviceCentralizedType } from './serviceCentralized'
import { pageCentralizedType } from './pageCentralized'
import { siteTranslationCentralizedType } from './siteTranslationCentralized'
import { calendarEventCentralizedType } from './calendarEventCentralized'
import { siteSettingsType } from './siteSettings'

// ============================================
// OTHER SCHEMAS
// ============================================
import { formSubmissionType } from './formSubmission'

export const schemaTypes = [
  // 🍊 Products
  productCentralizedType,

  // ⚙️ Services
  serviceCentralizedType,

  // 📄 Pages & Content
  pageCentralizedType,
  siteSettingsType,

  // 📅 Calendar
  calendarEventCentralizedType,

  // 📥 Form Submissions
  formSubmissionType,
]

