"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { duration?: number }) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (typeof document.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const root = document.documentElement
    root.style.setProperty(
      "--magicui-theme-toggle-vt-duration",
      `${duration}ms`
    )

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    if (transition?.ready && typeof transition.ready.then === "function") {
      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          { clipPath },
          {
            duration,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    }
  }, [resolvedTheme, setTheme, duration])

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-md",
        "text-muted-foreground hover:text-foreground",
        "border border-transparent hover:border-[var(--border)]",
        "transition-all duration-200 ease-out",
        "hover:bg-[var(--card)]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border)]",
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-[1.1rem] w-[1.1rem]" />
        ) : (
          <Moon className="h-[1.1rem] w-[1.1rem]" />
        )
      ) : (
        <div className="h-[1.1rem] w-[1.1rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
