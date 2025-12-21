'use client';
import { createContext, useEffect, useState } from 'react';

export enum DEVICE_SIZES {
  'xsm' = 'xsm',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  '2xl' = '2xl',
}

export const SizeProviderContext = createContext<{ windowSize: DEVICE_SIZES }>({
  windowSize: DEVICE_SIZES.lg,
});

const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState(DEVICE_SIZES.lg);

  const setSizes = () => {
    if (window.innerWidth >= 1536) {
      setSize(DEVICE_SIZES['2xl']);
    } else if (window.innerWidth >= 1280) {
      setSize(DEVICE_SIZES.xl);
    } else if (window.innerWidth >= 1024) {
      setSize(DEVICE_SIZES.lg);
    } else if (window.innerWidth >= 768) {
      setSize(DEVICE_SIZES.md);
    } else if (window.innerWidth >= 640) {
      setSize(DEVICE_SIZES.sm);
    } else {
      setSize(DEVICE_SIZES.xsm);
    }
  };

  useEffect(() => {
    setSizes();
    const handleResize = () => {
      requestAnimationFrame(setSizes);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SizeProviderContext.Provider value={{ windowSize: size }}>
      {children}
    </SizeProviderContext.Provider>
  );
};

export default SizeProvider;
