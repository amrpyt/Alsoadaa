# Quote Form Validation & UX Feedback

Ensures users receive clear, actionable feedback about form validation state and progression requirements.

## ADDED Requirements

### Requirement: Validation errors must be visible and actionable

When form fields fail validation, users MUST see specific error messages with guidance on how to fix them.

**Priority:** High  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Required field shows error when empty

**Given** the user is on Step 1 (Contact Information)  
**When** the user leaves the "Company Name" field empty and clicks Next  
**Then** an error message "Company name is required" is displayed below the field  
**And** the field border turns red  
**And** the Next button remains disabled  
**And** focus is moved to the first invalid field

#### Scenario: Email validation shows format error

**Given** the user enters "invalid-email" in the Email field  
**When** the user moves focus away from the field (blur)  
**Then** an error message "Please enter a valid email address" is displayed  
**And** an example "example@company.com" is shown  
**And** the field is marked invalid with `aria-invalid="true"`

#### Scenario: Phone number validation by country

**Given** the user selects "Saudi Arabia" as country  
**When** the user enters a phone number  
**Then** the format is validated against Saudi phone patterns (+966...)  
**And** invalid formats show "Saudi phone numbers should start with +966"  
**And** valid formats remove any error messages

### Requirement: Form progression must provide clear feedback

Users MUST understand why they cannot proceed to the next step and what actions are needed.

**Priority:** High  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Disabled Next button shows tooltip

**Given** Step 1 has incomplete required fields  
**When** the user hovers over the disabled Next button  
**Then** a tooltip appears listing missing fields: "Please complete: Company Name, Email"  
**And** the tooltip persists for 3 seconds  
**And** clicking the button does nothing

#### Scenario: Progress indicator shows completion

**Given** the user is filling out the form  
**When** the user completes each required field  
**Then** a visual progress bar updates (e.g., "Step 1: 60% complete")  
**And** completed fields show a green checkmark icon  
**And** the progress persists across steps

#### Scenario: Step 2 shows product selection count

**Given** the user is on Step 2 (Product Selection)  
**When** the user selects 3 products  
**Then** the UI shows "3 products selected"  
**And** selecting more products updates the count  
**And** the Next button enables when at least 1 product is selected  
**And** the button label changes to "Next (3 products selected)"

### Requirement: Form submission provides clear status updates

During and after form submission, users MUST receive clear feedback about the process status.

**Priority:** High  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Submission shows loading state

**Given** the user completes all form steps  
**When** the user clicks "Submit Quote Request"  
**Then** the submit button is disabled  
**And** the button text changes to "Submitting..."  
**And** a spinner icon appears next to the text  
**And** the form fields become read-only  
**And** all navigation is disabled

#### Scenario: Successful submission shows confirmation

**Given** the form submission completes successfully  
**When** the response is received from Sanity  
**Then** a success screen is displayed with animated checkmark  
**And** a reference number is shown (e.g., "QR-2025-001234")  
**And** a message confirms "Quote request submitted successfully"  
**And** the user is informed "We'll respond within 24 hours"  
**And** options to "Submit Another" or "View Products" are provided

#### Scenario: Submission failure shows specific error

**Given** the form submission fails with a server error  
**When** the error response is received  
**Then** an error message explains the problem clearly  
**And** actionable steps are provided (e.g., "Please try again or contact support")  
**And** the form remains filled with user's data  
**And** a "Retry Submission" button is shown  
**And** the error is logged to monitoring service

### Requirement: Multi-language validation messages

All validation and feedback messages MUST support Arabic, English, and Russian.

**Priority:** Medium  
**Component:** `QuoteRequestForm.tsx`, translation files

#### Scenario: Validation errors display in Arabic

**Given** the user has selected Arabic language  
**When** a validation error occurs  
**Then** the error message is displayed in Arabic  
**And** RTL text direction is applied  
**And** the message is grammatically correct  
**And** examples use Arabic-appropriate formats

#### Scenario: Button labels translate correctly

**Given** the user switches from English to Russian  
**When** the form updates  
**Then** "Next" becomes "Далее"  
**And** "Submit Quote Request" becomes "Отправить запрос на котировку"  
**And** "Company Name" becomes "Название компании"  
**And** all progress indicators update to Russian

## MODIFIED Requirements

### Requirement: Form validation must be real-time (existing, now enhanced)

The existing validation MUST now provide immediate feedback as users type, not just on blur.

**Previously:** Validation only ran on blur or submit  
**Now:** Validation runs on input with debouncing

#### Scenario: Email validation shows real-time feedback

**Given** the user is typing in the Email field  
**When** the user types a valid email format  
**Then** a green checkmark appears after 500ms  
**And** any previous error message is cleared  
**And** the field border turns green

#### Scenario: Character count shows in real-time

**Given** the user is typing in the "Additional Message" textarea  
**When** the user types each character  
**Then** a character counter updates: "245/1000 characters"  
**And** the counter turns orange at 900 characters  
**And** the counter turns red at 1000 characters  
**And** further typing is prevented at limit
