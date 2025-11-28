import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronLeft, ChevronRight, Check, Loader2, AlertCircle, Wifi, WifiOff, Download, HelpCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { client, writeClient } from '../lib/sanity';
import { allProductsQuery } from '../lib/queries';
import { useFormPersistence } from '../hooks/useFormPersistence';

interface FormData {
  // Step 1: Contact Info
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  
  // Step 2: Product Selection
  products: string[];
  quantity: string;
  deliveryTimeframe: string;
  
  // Step 3: Additional Details
  message: string;
}

export function QuoteRequestForm({ onClose }: { onClose?: () => void }) {
  const { language } = useLanguage();
  const { 
    cachedData, 
    saveFormData, 
    clearCachedData, 
    restoreFromCache, 
    getCachedStep 
  } = useFormPersistence();
  const [currentStep, setCurrentStep] = useState(() => {
    return cachedData ? getCachedStep() : 1;
  });
  
  const [formData, setFormData] = useState<FormData>(() => {
    const restored = restoreFromCache();
    return restored || {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      products: [],
      quantity: '',
      deliveryTimeframe: '',
      message: '',
    };
  });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const maxRetries = 3;

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show resume dialog if cached data exists on mount
  useEffect(() => {
    if (cachedData && !submitted) {
      setShowResumeDialog(true);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('🔄 Starting product fetch for language:', language);
        console.log('📊 Sanity client config:', {
          projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
          dataset: import.meta.env.VITE_SANITY_DATASET,
          apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
          hasToken: !!import.meta.env.VITE_SANITY_TOKEN
        });
        
        setLoading(true);
        setError(null);
        setFetchFailed(false);
        
        // Try to load from cache first
        const cacheKey = `products_${language}`;
        const cachedProducts = localStorage.getItem(cacheKey);
        if (cachedProducts && retryCount === 0) {
          console.log('💾 Loading products from cache');
          const parsed = JSON.parse(cachedProducts);
          if (parsed && parsed.length > 0) {
            setProducts(parsed);
            setLoading(false);
            return;
          }
        }
        
        console.log('🔍 Executing GROQ query:', allProductsQuery);
        console.log('🌐 Query parameters:', { lang: language });
        
        const startTime = Date.now();
        const data = await client.fetch(allProductsQuery, { lang: language });
        const endTime = Date.now();
        
        console.log(`✅ Query completed in ${endTime - startTime}ms`);
        console.log('📦 Raw data received:', data);
        console.log('📊 Data type:', typeof data);
        console.log('🔢 Data length:', Array.isArray(data) ? data.length : 'Not an array');
        
        if (!data) {
          console.warn('⚠️ No data received from Sanity');
          setProducts([]);
        } else if (!Array.isArray(data)) {
          console.error('❌ Expected array but received:', typeof data);
          setProducts([]);
        } else {
          console.log(`✅ Successfully loaded ${data.length} products`);
          if (data.length > 0) {
            console.log('🏷️ Sample product:', data[0]);
          }
          setProducts(data);
          
          // Cache successful fetch
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            console.log('💾 Products cached successfully');
          } catch (cacheError) {
            console.warn('⚠️ Failed to cache products:', cacheError);
          }
        }
      } catch (err) {
        const error = err as Error & { statusCode?: number; response?: any };
        console.error('❌ Failed to fetch products:', error);
        console.error('📋 Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          statusCode: error.statusCode,
          response: error.response
        });
        
        // Determine error type for better messaging
        const isNetworkError = !navigator.onLine || error.name === 'TypeError' || error.message?.includes('fetch');
        const isServerError = error.statusCode && error.statusCode >= 500;
        const isAuthError = error.statusCode === 401 || error.statusCode === 403;
        
        // Auto-retry logic with exponential backoff
        if (retryCount < maxRetries && !isRetrying) {
          console.log(`🔄 Auto-retry ${retryCount + 1}/${maxRetries} in ${Math.min(1000 * Math.pow(2, retryCount), 5000)}ms`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, Math.min(1000 * Math.pow(2, retryCount), 5000));
          return;
        }
        
        // Set appropriate error message based on error type
        if (retryCount >= maxRetries) {
          console.log('🚫 Max auto-retries reached');
          if (isNetworkError) {
            setError('Network connection issue. Please check your internet and try again.');
          } else if (isServerError) {
            setError('Our servers are experiencing issues. Please try again in a few minutes.');
          } else if (isAuthError) {
            setError('Authentication error. Please refresh the page and try again.');
          } else {
            setError(`Failed to load products after ${maxRetries} attempts. Please contact support if the issue persists.`);
          }
        } else {
          if (isNetworkError) {
            setError('Unable to connect. Please check your internet connection.');
          } else {
            setError('Failed to load products. Please try again.');
          }
        }
        
        setFetchFailed(true);
        
        // Try to use cached data as fallback
        const cacheKey = `products_${language}`;
        const cachedProducts = localStorage.getItem(cacheKey);
        if (cachedProducts) {
          console.log('🔄 Using cached products as fallback');
          try {
            const parsed = JSON.parse(cachedProducts);
            if (parsed && parsed.length > 0) {
              setProducts(parsed);
              setError('Showing cached products. Some features may be limited.');
            }
          } catch (parseError) {
            console.error('❌ Failed to parse cached products:', parseError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [language, retryCount]);

  const updateField = (field: keyof FormData, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    // Save to localStorage with debouncing
    saveFormData(newFormData, currentStep);
  };

  const validateField = (field: keyof FormData, value: any): string | null => {
    switch (field) {
      case 'companyName':
        if (!value || value.trim().length < 2) {
          return 'Company name must be at least 2 characters';
        }
        break;
      case 'contactPerson':
        if (!value || value.trim().length < 2) {
          return 'Contact person name must be at least 2 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value || value.trim().length < 5) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'country':
        if (!value) {
          return 'Please select a country';
        }
        break;
      case 'quantity':
        if (!value) {
          return 'Please select a quantity range';
        }
        break;
      case 'deliveryTimeframe':
        if (!value) {
          return 'Please select a delivery timeframe';
        }
        break;
      default:
        return null;
    }
    return null;
  };

  const handleFieldBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    if (error) {
      setValidationErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const toggleProduct = (productId: string) => {
    const newFormData = {
      ...formData,
      products: formData.products.includes(productId)
        ? formData.products.filter(id => id !== productId)
        : [...formData.products, productId]
    };
    setFormData(newFormData);
    saveFormData(newFormData, currentStep);
  };

  const retryFetch = async () => {
    if (retryCount >= maxRetries) {
      console.log('🚫 Max retries reached, manual retry allowed');
      setRetryCount(0); // Reset for manual retry
    }
    console.log('🔄 Manual retry triggered');
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    // Add exponential backoff delay
    const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setIsRetrying(false);
  };

  const clearForm = () => {
    const emptyFormData: FormData = {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      products: [],
      quantity: '',
      deliveryTimeframe: '',
      message: '',
    };
    setFormData(emptyFormData);
    setCurrentStep(1);
    clearCachedData();
    console.log('🗑️ Form cleared');
  };

  const changeStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= 3) {
      setCurrentStep(newStep);
      saveFormData(formData, newStep);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.companyName && formData.contactPerson && formData.email && formData.phone && formData.country;
    }
    if (currentStep === 2) {
      return formData.products.length > 0 && formData.quantity && formData.deliveryTimeframe;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Validate form before submission
      const step1Error = !formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.country;
      const step2Error = formData.products.length === 0 || !formData.quantity || !formData.deliveryTimeframe;
      
      if (step1Error || step2Error) {
        setError('Please fill in all required fields before submitting.');
        setSubmitting(false);
        return;
      }

      // Get product titles for the selected IDs
      const selectedProducts = products
        .filter(p => formData.products.includes(p._id))
        .map(p => p.title);

      if (selectedProducts.length === 0) {
        setError('No products found. Please select products again.');
        setSubmitting(false);
        return;
      }

      // Create form submission document
      const result = await writeClient.create({
        _type: 'formSubmission',
        type: 'quote',
        language,
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        message: formData.message,
        requirements: {
          products: selectedProducts,
          productIds: formData.products,
          quantity: formData.quantity,
          deliveryTimeframe: formData.deliveryTimeframe,
          country: formData.country,
        },
        submittedAt: new Date().toISOString(),
        status: 'pending',
      });

      console.log('✅ Quote request submitted successfully:', result);
      
      // Generate reference number from Sanity document ID
      const refNumber = `QR-${result._id.substring(0, 8).toUpperCase()}`;
      setReferenceNumber(refNumber);
      setSubmitted(true);
      // Clear cached data on successful submission
      clearCachedData();
    } catch (err) {
      const error = err as Error & { statusCode?: number; message?: string };
      console.error('❌ Failed to submit quote request:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });
      setError(`Failed to submit quote request: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
          <Check className="w-10 h-10" style={{ color: 'var(--fresh-green)' }} />
        </div>
        
        {/* Success Title */}
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
          Quote Request Submitted!
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--gray-600)' }}>
          Thank you for your interest in our products. We've received your request and will review it shortly.
        </p>

        {/* Reference Number */}
        {referenceNumber && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-blue-600 mb-2">Reference Number</p>
            <p className="text-2xl font-bold text-blue-900 font-mono">{referenceNumber}</p>
            <p className="text-xs text-blue-600 mt-2">Save this number for your records</p>
          </div>
        )}

        {/* Confirmation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>Confirmation Email</p>
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>Response Time</p>
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              Our team will respond within <strong>24-48 hours</strong>
            </p>
          </div>
        </div>

        {/* Selected Products Summary */}
        <div className="mb-8 text-left">
          <h3 className="font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>Your Selection</h3>
          <div className="space-y-2">
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              <strong>Products:</strong> {products.filter(p => formData.products.includes(p._id)).map(p => p.title).join(', ')}
            </p>
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              <strong>Quantity:</strong> {formData.quantity}
            </p>
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              <strong>Delivery:</strong> {formData.deliveryTimeframe}
            </p>
            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
              <strong>Country:</strong> {formData.country}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onClose}
            className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                country: '',
                products: [],
                quantity: '',
                deliveryTimeframe: '',
                message: '',
              });
              setCurrentStep(1);
              setReferenceNumber(null);
            }}
            variant="outline"
          >
            Submit Another Request
          </Button>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--gray-300)' }}>
          <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
            Need immediate assistance?{' '}
            <a
              href="mailto:sales@alsoadaa.com"
              className="font-semibold hover:underline"
              style={{ color: 'var(--trust-blue)' }}
            >
              Contact our sales team
            </a>
          </p>
        </div>
      </Card>
    );
  }

  // Resume Dialog
  if (showResumeDialog) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto mb-4 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Resume Previous Request?</h3>
          <p className="text-gray-600 mb-6">
            You have an unfinished quote request. Would you like to continue where you left off?
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                clearCachedData();
                setFormData({
                  companyName: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  country: '',
                  products: [],
                  quantity: '',
                  deliveryTimeframe: '',
                  message: '',
                });
                setCurrentStep(1);
                setShowResumeDialog(false);
              }}
            >
              Start Fresh
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowResumeDialog(false)}
            >
              Continue
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Network Status Indicator */}
      {!isOnline && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center gap-2">
          <WifiOff className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800 text-sm font-medium">
            You're offline. Some features may be limited.
          </span>
        </div>
      )}
      
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white relative">
          {/* Online status badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            {isOnline ? (
              <span className="flex items-center gap-1 text-xs text-green-200">
                <Wifi className="w-3.5 h-3.5" />
                Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-yellow-200">
                <WifiOff className="w-3.5 h-3.5" />
                Offline
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
          <p className="text-orange-50">Get a customized quote for premium Egyptian products</p>
        </div>
        
        <div className="p-8 md:p-12">
          {/* Elegant Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {currentStep}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Step {currentStep} of 3
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {Math.round((currentStep / 3) * 100)}% Complete
              </span>
            </div>
            <div className="relative w-full h-3 rounded-full bg-gray-100 overflow-hidden shadow-inner">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out shadow-lg"
                style={{
                  width: `${(currentStep / 3) * 100}%`,
                }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-between mt-4 text-xs font-medium">
              <span className={currentStep >= 1 ? 'text-orange-600' : 'text-gray-400'}>
                Contact Info
              </span>
              <span className={currentStep >= 2 ? 'text-orange-600' : 'text-gray-400'}>
                Product Selection
              </span>
              <span className={currentStep >= 3 ? 'text-orange-600' : 'text-gray-400'}>
                Final Details
              </span>
            </div>
          </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="border-l-4 border-orange-500 pl-4 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Contact Information</h3>
              <p className="text-sm text-gray-600">Let us know how to reach you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  onBlur={() => handleFieldBlur('companyName')}
                  placeholder="Your company name"
                  aria-label="Company Name"
                  aria-required="true"
                  aria-invalid={touched.companyName && !!validationErrors.companyName}
                  aria-describedby={validationErrors.companyName ? 'companyName-error' : undefined}
                  className={`h-12 px-4 rounded-lg border-2 transition-all duration-200 ${
                    touched.companyName && validationErrors.companyName
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 hover:border-gray-300'
                  }`}
                />
                {touched.companyName && validationErrors.companyName && (
                  <p id="companyName-error" role="alert" className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {validationErrors.companyName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm font-semibold text-gray-700">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateField('contactPerson', e.target.value)}
                  onBlur={() => handleFieldBlur('contactPerson')}
                  placeholder="Your full name"
                  aria-label="Contact Person"
                  aria-required="true"
                  aria-invalid={touched.contactPerson && !!validationErrors.contactPerson}
                  aria-describedby={validationErrors.contactPerson ? 'contactPerson-error' : undefined}
                  className={`h-12 px-4 rounded-lg border-2 transition-all duration-200 ${
                    touched.contactPerson && validationErrors.contactPerson
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 hover:border-gray-300'
                  }`}
                />
                {touched.contactPerson && validationErrors.contactPerson && (
                  <p id="contactPerson-error" role="alert" className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {validationErrors.contactPerson}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  placeholder="your.email@company.com"
                  aria-label="Email Address"
                  aria-required="true"
                  aria-invalid={touched.email && !!validationErrors.email}
                  aria-describedby={validationErrors.email ? 'email-error' : undefined}
                  className={`h-12 px-4 rounded-lg border-2 transition-all duration-200 ${
                    touched.email && validationErrors.email
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 hover:border-gray-300'
                  }`}
                />
                {touched.email && validationErrors.email && (
                  <p id="email-error" role="alert" className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  onBlur={() => handleFieldBlur('phone')}
                  placeholder="+20 123 456 7890"
                  aria-label="Phone Number"
                  aria-required="true"
                  aria-invalid={touched.phone && !!validationErrors.phone}
                  aria-describedby={validationErrors.phone ? 'phone-error' : undefined}
                  className={`h-12 px-4 rounded-lg border-2 transition-all duration-200 ${
                    touched.phone && validationErrors.phone
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 hover:border-gray-300'
                  }`}
                />
                {touched.phone && validationErrors.phone && (
                  <p id="phone-error" role="alert" className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {validationErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-semibold text-gray-700">Country *</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => updateField('country', value)}
              >
                <SelectTrigger className="h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-white rounded-lg shadow-2xl border-2">
                  <SelectItem value="saudi" className="cursor-pointer hover:bg-orange-50">Saudi Arabia</SelectItem>
                  <SelectItem value="russia" className="cursor-pointer hover:bg-orange-50">Russia</SelectItem>
                  <SelectItem value="china" className="cursor-pointer hover:bg-orange-50">China</SelectItem>
                  <SelectItem value="germany" className="cursor-pointer hover:bg-orange-50">Germany</SelectItem>
                  <SelectItem value="uk" className="cursor-pointer hover:bg-orange-50">United Kingdom</SelectItem>
                  <SelectItem value="france" className="cursor-pointer hover:bg-orange-50">France</SelectItem>
                  <SelectItem value="italy" className="cursor-pointer hover:bg-orange-50">Italy</SelectItem>
                  <SelectItem value="uae" className="cursor-pointer hover:bg-orange-50">UAE</SelectItem>
                  <SelectItem value="other" className="cursor-pointer hover:bg-orange-50">Other</SelectItem>
                </SelectContent>
              </Select>
              {touched.country && validationErrors.country && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validationErrors.country}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Product Selection */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
              Product Selection
            </h3>

            {loading ? (
              <div className="space-y-4">
                <Label>Loading Products...</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                    <div
                      key={skeleton}
                      className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : fetchFailed ? (
              <div className="space-y-4">
                <div className="p-6 rounded-lg border-2 border-red-200 bg-red-50 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h4 className="text-lg font-semibold text-red-800 mb-2">
                    Unable to Load Products
                  </h4>
                  <p className="text-red-600 mb-4">
                    {error || 'Please check your internet connection and try again.'}
                  </p>
                  {/* Error recovery instructions */}
                  <div className="text-left bg-white rounded-lg p-4 mb-4 text-sm">
                    <p className="font-semibold text-gray-700 mb-2">Try these steps:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Check your internet connection</li>
                      <li>Refresh the page</li>
                      <li>Clear your browser cache</li>
                      <li>Try again in a few minutes</li>
                    </ul>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button
                      onClick={retryFetch}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      disabled={isRetrying}
                    >
                      {isRetrying ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Loader2 className="w-4 h-4 mr-2" />
                      )}
                      {isRetrying ? 'Retrying...' : 'Retry'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('mailto:support@alsoadaa.com?subject=Product Loading Issue', '_blank')}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
                {products.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-amber-600">Showing Cached Products (Limited)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {products.map((product) => (
                        <button
                          key={product._id}
                          type="button"
                          onClick={() => toggleProduct(product._id)}
                          className="p-4 rounded-lg border-2 text-left transition-all opacity-75"
                          style={{
                            borderColor: formData.products.includes(product._id) ? 'var(--citrus-orange)' : 'var(--gray-300)',
                            backgroundColor: formData.products.includes(product._id) ? 'var(--citrus-orange-bg)' : 'white',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{getCategoryEmoji(product.category)}</div>
                            <div>
                              <div className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                                {product.title}
                              </div>
                              <div className="text-xs" style={{ color: 'var(--gray-600)' }}>
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  No Products Available
                </h4>
                <p className="text-gray-600 mb-4">
                  There are currently no products available for your language selection.
                </p>
                <Button
                  onClick={retryFetch}
                  variant="outline"
                >
                  Refresh
                </Button>
              </div>
            ) : (
              <div>
                <Label>Select Products of Interest *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => toggleProduct(product._id)}
                      className="p-4 rounded-lg border-2 text-left transition-all hover:shadow-md"
                      style={{
                        borderColor: formData.products.includes(product._id) ? 'var(--citrus-orange)' : 'var(--gray-300)',
                        backgroundColor: formData.products.includes(product._id) ? 'var(--citrus-orange-bg)' : 'white',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getCategoryEmoji(product.category)}</div>
                        <div>
                          <div className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                            {product.title}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--gray-600)' }}>
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="quantity" className="text-sm font-medium mb-2 block">Estimated Quantity *</Label>
              <Select 
                value={formData.quantity} 
                onValueChange={(value) => updateField('quantity', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity range" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-white">
                  <SelectItem value="small">1-5 containers</SelectItem>
                  <SelectItem value="medium">5-20 containers</SelectItem>
                  <SelectItem value="large">20-50 containers</SelectItem>
                  <SelectItem value="xlarge">50+ containers</SelectItem>
                </SelectContent>
              </Select>
              {touched.quantity && validationErrors.quantity && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.quantity}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="deliveryTimeframe" className="text-sm font-medium mb-2 block">Preferred Delivery Timeframe *</Label>
              <Select 
                value={formData.deliveryTimeframe} 
                onValueChange={(value) => updateField('deliveryTimeframe', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="When do you need delivery?" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-white">
                  <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                  <SelectItem value="month">Within 1 month</SelectItem>
                  <SelectItem value="quarter">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              {touched.deliveryTimeframe && validationErrors.deliveryTimeframe && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.deliveryTimeframe}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Additional Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
              Additional Details
            </h3>

            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    updateField('message', e.target.value);
                  }
                }}
                placeholder="Any specific requirements, questions, or details you'd like to share..."
                rows={6}
                maxLength={1000}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                  Share any specific requirements or questions
                </span>
                <span className={`text-xs ${formData.message.length > 900 ? 'text-orange-600' : 'text-gray-400'}`}>
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>Summary</h4>
              <div className="text-sm space-y-1" style={{ color: 'var(--gray-700)' }}>
                <p><strong>Company:</strong> {formData.companyName}</p>
                <p><strong>Contact:</strong> {formData.contactPerson}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Products:</strong> {formData.products.length} selected</p>
                <p><strong>Quantity:</strong> {formData.quantity}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-gray-100">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => changeStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="h-12 px-6 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            {cachedData && (
              <Button
                variant="destructive"
                onClick={clearForm}
                className="h-12 px-4 rounded-lg font-medium"
              >
                Clear Form
              </Button>
            )}
          </div>

          {currentStep < 3 ? (
            <Button
              onClick={() => changeStep(currentStep + 1)}
              disabled={!canProceed()}
              className="h-12 px-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="h-12 px-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quote Request
                  <Check className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-900 mb-2 text-lg">Error</p>
                <p className="text-red-800 text-sm mb-3 font-medium">{error}</p>
                <div className="space-y-1.5 text-xs text-red-700">
                  <p className="font-semibold">What to do:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Check your internet connection</li>
                    <li>Verify all required fields are filled</li>
                    <li>Try submitting again</li>
                    <li>If the problem persists, contact support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </div>
  );
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    citrus: '🍊',
    vegetables: '🥬',
    berries: '🍓',
    lemons: '🍋',
    grapes: '🍇',
  };
  return emojis[category] || '🌱';
}
