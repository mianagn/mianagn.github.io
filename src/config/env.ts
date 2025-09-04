// Environment configuration
export const env = {
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'IRbkoeup4DNwWgLL4',
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_74qipbi',
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_273r6as',
} as const;

// Debug environment variables
console.log('Environment variables loaded:', {
  VITE_EMAILJS_PUBLIC_KEY: env.VITE_EMAILJS_PUBLIC_KEY ? 'SET' : 'NOT SET',
  VITE_EMAILJS_SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID ? 'SET' : 'NOT SET',
  VITE_EMAILJS_TEMPLATE_ID: env.VITE_EMAILJS_TEMPLATE_ID ? 'SET' : 'NOT SET',
});

// Validation function
export const validateEnv = () => {
  const required = [
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_SERVICE_ID', 
    'VITE_EMAILJS_TEMPLATE_ID'
  ];
  
  const missing = required.filter(key => !env[key as keyof typeof env]);
  
  if (missing.length > 0) {
    console.error('Missing environment variables:', missing);
    return false;
  }
  
  return true;
};

// Check if we're using default/placeholder values
export const isUsingDefaultValues = () => {
  return (
    !env.VITE_EMAILJS_PUBLIC_KEY ||
    !env.VITE_EMAILJS_SERVICE_ID ||
    !env.VITE_EMAILJS_TEMPLATE_ID ||
    env.VITE_EMAILJS_PUBLIC_KEY === 'IRbkoeup4DNwWgLL4' ||
    env.VITE_EMAILJS_SERVICE_ID === 'service_74qipbi' ||
    env.VITE_EMAILJS_TEMPLATE_ID === 'template_273r6as'
  );
};
