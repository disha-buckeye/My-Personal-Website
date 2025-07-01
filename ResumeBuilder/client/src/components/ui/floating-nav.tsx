import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY < 100 || scrollY < window.innerHeight * 0.2);
    };

    const handleSectionChange = () => {
      const sections = navItems.map(item => item.link.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, [navItems]);

  const handleNavigation = (link: string) => {
    if (link.startsWith('#')) {
      // Handle scroll to section
      const element = document.querySelector(link);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Handle page navigation
      window.location.href = link;
    }
  };

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 mx-auto z-50 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
        className
      )}
    >
      <div className="max-w-fit mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border-2 border-blue-200/50">
          <div className="flex items-center space-x-1">
            {navItems.map((navItem, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(navItem.link)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  activeSection === navItem.link
                    ? "text-white bg-gradient-to-r from-blue-400 to-coral-400"
                    : "text-slate-600 hover:text-slate-700 hover:bg-gradient-to-r hover:from-blue-200 hover:to-coral-200"
                )}
              >
                {navItem.icon && (
                  <span className="mr-2">{navItem.icon}</span>
                )}
                {navItem.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
