import { Submit } from "@radix-ui/react-form";
import { AppButton, AppButtonVariantOptions } from "../../toolkit/AppButton";

interface Props {
  label?: string;
  variant?: keyof AppButtonVariantOptions;
  isValid?: boolean;
  className?: string
}

export default function SubmitButton({
  label = "Enviar",
  isValid = true,
  variant,
  ...props
}: Props) {
  return (
    <Submit
      asChild
    >
      <AppButton variant={variant} className={`${props.className} ${!isValid ? "cursor-no-drop" : ""}`}>
        {label}
      </AppButton>
    </Submit>
  );
}
