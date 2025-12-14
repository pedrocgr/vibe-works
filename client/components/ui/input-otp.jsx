import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils.js";

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput ref={ref} containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)} className={cn("disabled:cursor-not-allowed", className)} {...props} />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputContext.slots[index];

  return (
    <div ref={ref} className={cn("relative h-10 w-10 text-center text-sm transition-all", "border border-input rounded-md bg-background hover:border-primary", isActive && "ring-2 ring-ring ring-offset-2", className)} {...props}>
      {char === null ? null : <>{char}</>}
      {hasFakeCaret ? <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><Dot className="h-4 w-4 animate-pulse" /></div> : null}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props} />
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
