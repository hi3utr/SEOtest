import { tv } from 'tailwind-variants';

export const input = tv({
  base: ['focus:outline-none text-[#000000]'],
  variants: {
    size: {
      xs: '',
      sm: '',
      md: 'py-3 px-4',
      lg: '',
    },
    borderColor: {
      blue: 'border-[#85AEC6] border-solid border-[1px]',
    },
    invalid: {
      true: 'border-red-600',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outlined',
  },
});
