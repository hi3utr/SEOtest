import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'border-solid border-[1px] curosr-pointer ',
  variants: {
    variant: {
      solid: '',
      outline: '',
      link: '',
    },
    color: {
      blue: '',
      'blue-light': '',
    },
    block: {
      true: '!w-full !text-center',
    },
    size: {
      sm: 'p-[6px] text-xs font-normal leading-[14px]',
      md: 'px-3 py-[6px] text-sm leading-4 font-medium',
      lg: 'p-3 text-base text-bold leading-5',
    },
    disabled: { true: 'cursor-not-allowed' },
  },
  compoundVariants: [
    {
      variant: 'solid',
      disabled: false,
      color: 'blue',
      class: 'bg-[#084A66] border-[#084A66]  hover:bg-[#012F43] text-white',
    },
    {
      variant: 'outline',
      disabled: false,
      color: 'blue',
      class:
        'bg-transparent border-[#084A66] text-[#084A66]  hover:bg-[#084A66] hover:text-white',
    },
    {
      variant: 'link',
      disabled: false,
      color: 'blue',
      class: 'text-[#084A66] hover:text-[#012F43] border-none',
    },

    {
      variant: 'solid',
      disabled: true,
      color: 'blue',
      class: 'bg-[#E6E6E6] text-[#808080]',
    },
    {
      variant: 'outline',
      disabled: true,
      color: 'blue',
      class: 'bg-[#ffffff] border-[#808080] text-[#808080]',
    },
    {
      variant: 'link',
      disabled: true,
      color: 'blue',
      class: 'text-[#808080] border-none',
    },
    {
      variant: 'solid',
      color: 'blue-light',
      class: 'bg-[#29A9DF] text-white border-[#29A9DF] hover:bg-[#1D87B4] ',
    },
    {
      variant: 'outline',
      color: 'blue-light',
      class:
        'text-[#29A9DF] border-[1px] border-solid border-[#29A9DF] backdrop-blur-sm',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'blue',
  },
});
