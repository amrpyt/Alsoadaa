import { useState, useEffect } from 'react';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  products: string[];
  quantity: string;
  deliveryTimeframe: string;
  message: string;
}

interface FormPersistenceData extends FormData {
  currentStep: number;
  timestamp: number;
}

const CACHE_KEY = 'quoteRequestForm';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function useFormPersistence() {
  const [hasCachedData, setHasCachedData] = useState(false);
  const [cachedData, setCachedData] = useState<FormPersistenceData | null>(null);

  // Save form data to localStorage with debouncing
  const saveFormData = (formData: FormData, currentStep: number) => {
    try {
      const dataToSave: FormPersistenceData = {
        ...formData,
        currentStep,
        timestamp: Date.now(),
      };
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(dataToSave));
      console.log('💾 Form data saved to localStorage');
    } catch (error) {
      console.warn('⚠️ Failed to save form data to localStorage:', error);
    }
  };

  // Load form data from localStorage
  const loadFormData = (): FormPersistenceData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed = JSON.parse(cached) as FormPersistenceData;
      
      // Check if cache is expired
      if (Date.now() - parsed.timestamp > CACHE_EXPIRY_MS) {
        console.log('⏰ Cached form data expired, clearing');
        clearCachedData();
        return null;
      }

      console.log('📂 Loaded cached form data from', new Date(parsed.timestamp).toLocaleString());
      return parsed;
    } catch (error) {
      console.warn('⚠️ Failed to load cached form data:', error);
      clearCachedData();
      return null;
    }
  };

  // Clear cached data
  const clearCachedData = () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      console.log('🗑️ Cached form data cleared');
    } catch (error) {
      console.warn('⚠️ Failed to clear cached form data:', error);
    }
  };

  // Check for cached data on mount
  useEffect(() => {
    const data = loadFormData();
    if (data) {
      setHasCachedData(true);
      setCachedData(data);
    }
  }, []);

  // Restore form from cache
  const restoreFromCache = (): FormData | null => {
    if (!cachedData) return null;
    
    const { currentStep: _, timestamp: __, ...formData } = cachedData;
    return formData;
  };

  // Get cached step
  const getCachedStep = (): number => {
    return cachedData?.currentStep || 1;
  };

  return {
    hasCachedData,
    cachedData,
    saveFormData,
    loadFormData,
    clearCachedData,
    restoreFromCache,
    getCachedStep,
  };
}
