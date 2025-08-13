// types/global.d.ts
import 'react';
import { Vertical } from '@/lib/constants/verticals';

declare module 'react' {
  interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
    variant?: 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost' | Vertical;
  }
}

declare module '*.json' {
  const value: import('@/types/mock').MockData;
  export default value;
}