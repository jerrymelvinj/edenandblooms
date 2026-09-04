import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "rose" | "blue" | "outline";
  className?: string;
}

export function Badge({ children, variant = "rose", className = "" }: BadgeProps) {
  const styles = {
    rose: "bg-brand-rose-gold-light text-brand-rose-gold border-brand-rose-gold-border/50",
    blue: "bg-brand-royal-blue/10 text-brand-royal-blue border-brand-royal-blue/20",
    outline: "bg-transparent text-brand-text-muted border-brand-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
