import { useState, useRef } from 'react';
import { FiUpload, FiX, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; 

export default function SellItem() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    tags: '',
    location: 'Campus' // Default location
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    'Textbooks',
    'Electronics',
    'Hostel Items',
    'Clothing',
    'Furniture',
    'Stationery'
  ];

  const conditions = [
    'Brand New',
    'Like New',
    'Good Condition',
    'Fair Condition'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (newPreviews.length === files.length) {
          setPreviewImages(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // 2. Upload images to Supabase Storage
      const imageUrls = [];
      for (const file of fileInputRef.current.files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }

      // 3. Insert product into database
      const { data: product, error: insertError } = await supabase
        .from('products')
        .insert([{
          title: formData.title,
          price: parseFloat(formData.price),
          category: formData.category,
          condition: formData.condition,
          description: formData.description,
          tags: formData.tags,
          location: formData.location,
          images: imageUrls,
          seller_id: user.id,
          original_price: parseFloat(formData.price) * 1.2 // Example: 20% higher than sale price
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      // 4. Success - redirect to product page or dashboard
      navigate(`/product/${product.id}`);
      
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.message || 'Failed to create listing');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and progress steps remain the same */}
      {/* ... */}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Steps 1 and 2 remain the same */}
        {/* ... */}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4">Review Your Listing</h2>
            
            {/* Review content remains the same */}
            {/* ... */}

            <div className="pt-4 border-t border-gray-200">
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <p className="text-xs text-gray-500 mb-4">
                By posting this listing you agree to our Terms and Conditions.
              </p>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  disabled={uploading}
                >
                  Back
                </button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    'Post Item'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}