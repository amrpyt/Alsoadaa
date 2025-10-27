import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { products } from '../lib/mockData';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
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

  const handleSubmit = () => {
    console.log('Quote request submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
          <Check className="w-8 h-8" style={{ color: 'var(--fresh-green)' }} />
        </div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
          Quote Request Submitted!
        </h2>
        <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
          Thank you for your interest in our products. Our team will review your request and get back to you within 24 hours.
        </p>
        <Button
          onClick={onClose}
          className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]"
        >
          Close
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors"
                  style={{
                    backgroundColor: currentStep >= step ? 'var(--citrus-orange)' : 'var(--gray-300)',
                    color: currentStep >= step ? 'white' : 'var(--gray-600)',
                  }}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className="flex-1 h-1 mx-2 transition-colors"
                    style={{
                      backgroundColor: currentStep > step ? 'var(--citrus-orange)' : 'var(--gray-300)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm" style={{ color: 'var(--gray-600)' }}>
            <span>Contact Info</span>
            <span>Product Selection</span>
            <span>Details</span>
          </div>
        </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
              Contact Information
            </h3>
            
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Your company name"
              />
            </div>

            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => updateField('contactPerson', e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+20 123 456 7890"
              />
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => updateField('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  <SelectItem value="russia">Russia</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="uae">UAE</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Product Selection */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
              Product Selection
            </h3>

            <div>
              <Label>Select Products of Interest *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggleProduct(product.id)}
                    className="p-4 rounded-lg border-2 text-left transition-all"
                    style={{
                      borderColor: formData.products.includes(product.id) ? 'var(--citrus-orange)' : 'var(--gray-300)',
                      backgroundColor: formData.products.includes(product.id) ? 'var(--citrus-orange-bg)' : 'white',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getCategoryEmoji(product.category)}</div>
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                          {product.name}
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

            <div>
              <Label htmlFor="quantity">Estimated Quantity *</Label>
              <Select value={formData.quantity} onValueChange={(value) => updateField('quantity', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quantity range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">1-5 containers</SelectItem>
                  <SelectItem value="medium">5-20 containers</SelectItem>
                  <SelectItem value="large">20-50 containers</SelectItem>
                  <SelectItem value="xlarge">50+ containers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deliveryTimeframe">Preferred Delivery Timeframe *</Label>
              <Select value={formData.deliveryTimeframe} onValueChange={(value) => updateField('deliveryTimeframe', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you need delivery?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                  <SelectItem value="month">Within 1 month</SelectItem>
                  <SelectItem value="quarter">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
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
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Any specific requirements, questions, or details you'd like to share..."
                rows={6}
              />
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
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-[var(--fresh-green)] hover:bg-[var(--fresh-green-hover)]"
            >
              Submit Quote Request
              <Check className="w-4 h-4 ml-2" />
            </Button>
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
