"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionBarProps {
  sections: { id: string; title: string }[]
  activeSection: number
  completedSections: boolean[]
  onSectionClick: (index: number) => void
}

export default function SectionBar({ sections, activeSection, completedSections, onSectionClick }: SectionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-amber-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 overflow-x-auto">
          <div className="flex-1 flex items-center justify-between max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(index)}
                className={cn(
                  "flex flex-col items-center px-3 py-2 rounded-md transition-colors relative",
                  activeSection === index ? "text-orange-600" : "text-gray-500",
                  "hover:text-orange-500",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 mb-1",
                    activeSection === index
                      ? "border-orange-600"
                      : completedSections[index]
                        ? "border-orange-400"
                        : "border-gray-300",
                  )}
                >
                  {completedSections[index] ? (
                    <Check className="w-4 h-4 text-orange-500" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs whitespace-nowrap">{section.title}</span>

                {/* Progress line connecting to next section */}
                {index < sections.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-6 right-0 h-0.5 w-[calc(100%-2rem)] translate-x-[50%]",
                      completedSections[index] ? "bg-orange-400" : "bg-gray-200",
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

