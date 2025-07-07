import { useState, useEffect } from "react";
import { SuccessToast } from "./helper/SuccessToast";

const SubmitBtn = ({ isSubmitting }) => (
  <div className="relative group">
    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
   
    <button
      aria-label="Submit Form"
      id="submit_form"
      type="submit"
      className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base sm:py-3.5 font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:scale-101 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-transparent cursor-pointer disabled:opacity-75"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      ) : (
        "Join Newsletter today"
      )}
    </button>
  </div>
);

const LetterHead = ({ text = 'Add newsletter text' }) => (
  <div>
    <h1 className="text-4xl font-bold text-white sm:text-5xl">
      Get
      <span className="relative inline-block ml-2">
        Connected
        <img className="absolute top-0 w-auto h-8 -right-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/design-element.svg" alt="" aria-hidden="true" />
      </span>
      <br />
      Blogs weekly
    </h1>
    <p className="mt-6 text-base font-normal leading-7 text-white/80">
      {text}
    </p>
  </div>
);

const Background = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <img
      className="object-contain object-right w-full h-full transform scale-125"
      src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/background-pattern.svg"
      alt="Decorative background pattern"
    />
  </div>
);

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <div>
      <input
        type={type}
        id={name}
        name={name}
        className={`block w-full px-4 py-3 text-base sm:py-3.5 sm:text-sm font-medium placeholder-gray-400 border rounded-lg focus:border-2 focus:outline-none ${
          error ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  </div>
);

export function NewsLetter() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  // Formbold URL - consider using environment variables in production
  const formBoldUrl =  import.meta.env.VITE_FORM_URL;

  // Handle toast visibility
  useEffect(() => {
    let timer;
    if (isSubmitted) {
      setShowToast(true);
      timer = setTimeout(() => setShowToast(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
   
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) return;
   
    setIsSubmitting(true);
   
    try {
      const response = await fetch(formBoldUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '' });
        setErrors({});
      } else {
        setErrors({ form: "Failed to submit. Please try again later." });
      }
    } catch (error) {
      setErrors({ form: "Network error. Please check your connection." });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data arrays
  const features = [
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/logo-1.svg',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/logo-2.svg',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/logo-3.svg',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/logo-4.svg',
  ];

  const profiles = [
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-1.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-2.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-3.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-4.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-5.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-6.png',
    'https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/3/avatar-7.png',
  ];

  return (
    <section className="pb-12 bg-white sm:pb-16 lg:pb-20">
      <div className="w-11/12 md:w-11/12 mx-auto relative py-12 overflow-hidden bg-indigo-600 rounded-xl sm:py-16 lg:py-20">
        <Background />
       
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-y-12 gap-x-16 xl:gap-x-20 px-4 sm:px-8 lg:px-20">
          <div className="flex flex-col justify-between lg:col-span-3">
            <LetterHead text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu." />
           
            <div className="mt-8 lg:mt-auto">
              <div className="flex -space-x-2">
                {profiles.map((img, index) => (
                  <img
                    key={index}
                    className="inline-block w-12 h-12 rounded-full sm:w-14 sm:h-14 ring-[3px] ring-white"
                    src={img}
                    alt={`Member ${index + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
              <p className="mt-4 text-base font-medium text-white">
                Join other 3200+ Members now
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-white">
              Join our email list
            </p>
           
            {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
           
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <FormInput
                label="Full name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
             
              <FormInput
                label="Email address"
                name="email"
                type="email"
                placeholder="email@gmail.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
             
              <SubmitBtn isSubmitting={isSubmitting} />
             
              {errors.form && (
                <p className="text-sm text-red-300">{errors.form}</p>
              )}
            </form>

            <div className="mt-8 sm:mt-12">
              <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                Featured on
              </p>
             
              <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-4">
                {features.map((img, index) => (
                  <img
                    key={index}
                    className="object-contain w-auto h-6"
                    src={img}
                    alt={`Featured logo ${index + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}