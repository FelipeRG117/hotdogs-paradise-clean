// src/components/ui/Button.tsx
import { cva, VariantProps } from "class-variance-authority";
import { Vertical } from "@/lib/constants/verticals";

const buttonVariants = cva(
  "rounded-md font-medium px-4 py-2 transition-colors duration-200",
  {
    variants: {
      vertical: {
        restaurant: "bg-orange-500 hover:bg-orange-600 text-white",
        service: "bg-blue-500 hover:bg-blue-600 text-white",
        creative: "bg-purple-500 hover:bg-purple-600 text-white"
      },
      variant: {
        primary: "",
        accent: "ring-2 ring-yellow-400",
        secondary: "bg-gray-300 hover:bg-gray-400 text-black"
      }
    },
    defaultVariants: {
      vertical: "restaurant",
      variant: "primary"
    }
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonVertical = VariantProps<typeof buttonVariants>['vertical'];

interface ButtonProps {
  variant: ButtonVariant;
  vertical?: ButtonVertical;
}


export function Button({ variant = 'primary', vertical, ...props }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonVariants({ variant, vertical })} {...props}>
      {props.children}
    </button>
  );
}