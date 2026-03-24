import React from "react";
import { cn } from "@/lib/utils";

interface AppButtonProps {
  className?: string;
  href?: string;
}

export const AppStoreButton = ({ className, href = "#" }: AppButtonProps) => (
  <a
    href={href}
    className={cn(
      "flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-brand-blue/20 bg-white hover:bg-brand-blue/5 transition-all group",
      className
    )}
  >
    <svg className="w-8 h-8 text-brand-blue" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05,20.28c-0.96,0.95-2.05,1.72-3.3,1.72c-1.22,0-1.61-0.74-3.08-0.74c-1.46,0-1.9,0.73-3.08,0.74c-1.25,0-2.39-0.81-3.35-1.78 c-1.95-1.98-3.45-5.59-3.45-8.7c0-3.11,1.52-5.73,3.8-5.73c1.17,0,2.1,0.73,2.82,0.73c0.72,0,1.83-0.88,3.24-0.88 c1.47,0,2.78,0.56,3.61,1.54C13.84,7.46,13.2,8.81,13.2,10.28c0,1.75,0.94,3.13,2.39,3.95C14.77,16.27,15.93,18.84,17.05,20.28z M12.87,3.01c0.72-0.87,1.2-2.07,1.2-3.27c0-0.16-0.02-0.31-0.05-0.45c-1.07,0.04-2.36,0.72-3.13,1.62c-0.69,0.79-1.29,1.99-1.29,3.22 c0,0.17,0.02,0.34,0.06,0.49C10.82,4.66,12.11,3.92,12.87,3.01z" />
    </svg>
    <div className="flex flex-col items-start leading-none">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Download on the</span>
      <span className="text-lg font-black text-primary">App Store</span>
    </div>
  </a>
);

export const GooglePlayButton = ({ className, href = "#" }: AppButtonProps) => (
  <a
    href={href}
    className={cn(
      "flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-brand-blue/20 bg-white hover:bg-brand-blue/5 transition-all group",
      className
    )}
  >
    <svg className="w-8 h-8 text-brand-blue" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.95,3.45,2.5,4,2.5c0.18,0,0.35,0.05,0.5,0.14l15,8.5c0.31,0.18,0.5,0.51,0.5,0.86s-0.19,0.68-0.5,0.86l-15,8.5 c-0.15,0.09-0.32,0.14-0.5,0.14C3.45,21.5,3,21.05,3,20.5z" />
    </svg>
    <div className="flex flex-col items-start leading-none">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Get it on</span>
      <span className="text-lg font-black text-primary">Google Play</span>
    </div>
  </a>
);
