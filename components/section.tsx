"use client"

import { ChevronDown } from "lucide-react"

interface SectionProps {
  id: string
  title: string
  content: string
  isLast?: boolean
  onScrollNext: () => void
}

export default function Section({ id, title, content, isLast = false, onScrollNext }: SectionProps) {
  return (
    <div id={id} className="section min-h-screen w-full flex flex-col items-center justify-center p-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-12">{content}</p>

        {/* Example content to make the section more substantial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-2">Key Point 1</h3>
            <p>Important information related to this section.</p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-2">Key Point 2</h3>
            <p>Another crucial aspect to consider.</p>
          </div>
        </div>

        <div className="bg-muted/50 p-8 rounded-xl my-8">
          <p className="italic">
            "This is an example quote or highlighted information that relates to the {title} section."
          </p>
        </div>
      </div>

      {!isLast && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="mb-2">Scroll Down</span>
          <ChevronDown className="animate-bounce" />
        </button>
      )}
    </div>
  )
}

