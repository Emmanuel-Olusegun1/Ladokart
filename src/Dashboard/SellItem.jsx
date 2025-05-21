import { useState, useRef } from 'react';
import { FiUpload, FiX, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SellItem() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    tags: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

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
          setFormData({...formData, images: [...formData.images, ...files]});
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData({...formData, images: formData.images.filter((_, i) => i !== index)});
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <Link to="/dashboard" className="mr-2 text-gray-600 hover:text-gray-900">
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Post New Item</h1>
          <div className="ml-auto text-sm text-gray-500">
            Step {step} of 3
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex border-b border-gray-200">
          <div 
            className={`flex-1 py-2 text-center font-medium text-sm ${step >= 1 ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          >
            Photos
          </div>
          <div 
            className={`flex-1 py-2 text-center font-medium text-sm ${step >= 2 ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          >
            Details
          </div>
          <div 
            className={`flex-1 py-2 text-center font-medium text-sm ${step >= 3 ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500'}`}
          >
            Review
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4">Upload Item Photos</h2>
            <p className="text-sm text-gray-500 mb-4">Clear photos help your item sell faster (max 5)</p>
            
            {previewImages.length === 0 ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                <FiUpload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-700">Drop your images here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse from your computer</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-colors"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                {previewImages.length < 5 && (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors aspect-square"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FiUpload className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                disabled={previewImages.length === 0}
                className={`px-6 py-2 rounded-lg font-medium ${previewImages.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                Next: Item Details
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4">Item Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Java Programming Textbook (CSC 301)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₦) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₦</span>
                  </div>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 5000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Samsung, C2L smartphone (common equivalent)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add keywords to help buyers find your item
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe your item in detail..."
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Next: Review
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4">Review Your Listing</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {previewImages.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt="" 
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-700">Title</h3>
                <p>{formData.title || '-'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700">Price</h3>
                  <p>{formData.price ? `₦${formData.price}` : '-'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Category</h3>
                  <p>{formData.category || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700">Condition</h3>
                  <p>{formData.condition || '-'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Tags</h3>
                  <p>{formData.tags || '-'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Description</h3>
                <p className="whitespace-pre-line">{formData.description || '-'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-4">
                By posting this listing you agree to LAUTECH Campus Marketplace terms. 
                Please ensure your listing follows our guidelines. Only verified LAUTECH 
                students can post listings.
              </p>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Post Item
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}