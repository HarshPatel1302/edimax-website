'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink, X } from 'lucide-react'

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
}

export function PDFViewer({ isOpen, onClose, pdfUrl, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.pdf`
    link.click()
  }

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer')
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-background">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground pr-4">
              {title}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2 hover:bg-accent-start hover:text-white border-accent-start text-accent-start"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2 hover:bg-accent-start hover:text-white border-accent-start text-accent-start"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-start mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading PDF...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            onLoad={handleLoad}
            title={title}
            style={{ minHeight: '600px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
