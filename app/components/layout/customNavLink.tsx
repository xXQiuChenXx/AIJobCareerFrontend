import { NavLink as RouterNavLink, type NavLinkProps } from "react-router";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface CustomNavLinkProps extends NavLinkProps {
  className?: string;
}

export function CustomNavLink({
  className,
  children,
  ...props
}: CustomNavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [width, setWidth] = useState<string | number>("100%");

  useEffect(() => {
    if (linkRef.current) setWidth(linkRef.current.clientWidth);
  }, []);

  return (
    <RouterNavLink
      ref={linkRef}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "relative font-medium transition-colors hover:text-primary",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300",
          "hover:after:w-full",
          isActive && "after:w-full",
          className
        )
      }
      {...props}
    >
      {({ isActive }) => (
        <>
          {children}
          <div
            className="absolute h-0.5 bottom-0 inset-x-0 bg-slate-800 hover:w-full"
            style={{
              width: isActive ? width : 0,
              transition: "width 500ms",
            }}
            role="none"
          />
        </>
      )}
    </RouterNavLink>
  );
}
