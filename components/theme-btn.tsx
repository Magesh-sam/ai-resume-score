"use client"

import { Moon, Sun, ToggleLeft } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeBtn() {
    const { setTheme, theme } = useTheme()


    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    const toggleTheme = () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            });
        } else {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    };


    return (

        <Button className="cursor-pointer border border-primary dark:border-primary" variant="outline" size="icon" title="toggle theme" onClick={toggleTheme}>
            {
                theme === "light" ?
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> :
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            }
            <span className="sr-only">Toggle theme</span>
        </Button>

    )
}
