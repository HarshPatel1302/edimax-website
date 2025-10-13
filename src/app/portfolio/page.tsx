'use client'

import { useEffect } from 'react'

const PDF_URL = "https://pub-35417c502fff4b9ba1530cadd45d3286.r2.dev/portfolio.pdf"

export default function PortfolioPage() {
  useEffect(() => {
    // Automatically open PDF when page loads
    const handleOpenPDF = () => {
      // Open PDF in new tab
      window.open(PDF_URL, '_blank', 'noopener,noreferrer')
    }

    handleOpenPDF()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-accent-start to-accent-end rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Portfolio PDF</h1>
          <p className="text-muted-foreground mb-6">
            Your portfolio PDF should open automatically in a new tab. If it doesn't open, click the button below.
          </p>
        </div>
        
        <button
          onClick={() => window.open(PDF_URL, '_blank', 'noopener,noreferrer')}
          className="bg-gradient-to-r from-accent-start to-accent-end text-white px-6 py-3 rounded-lg font-medium hover:from-accent-start/90 hover:to-accent-end/90 transition-all duration-300 transform hover:scale-105"
        >
          Open Portfolio PDF
        </button>
        
        <p className="text-xs text-muted-foreground mt-4">
          If you're having trouble viewing the PDF, you can also download it directly.
        </p>
      </div>
    </div>
  )
}
