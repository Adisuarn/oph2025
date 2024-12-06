'use client'

import { useState } from 'react'
import { Button } from '~/shadcn/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface DownloadTicketProps {
  code: string;
}

export default function DownloadTicket({ code }: DownloadTicketProps) {

  const [isDownload, setIsDownload] = useState<boolean>(false)

  const handleDownload = async () => {
    try {
      setIsDownload(true)
      const id = toast.loading('Downloading...')
      const response = await fetch(`/api/e-ticket?code=${encodeURIComponent(code)}`)
      if (response.status !== 200) {
        const text = await response.text()
        toast.update(id, {
          render: text,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        })
        setIsDownload(false)
        return
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `E-ticket.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.update(id, {
        render: 'Download Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
      setIsDownload(false)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleDownload}
      variant="outline"
      disabled={isDownload}
      className={`${isDownload ? 'cursor-not-allowed' : ''}`}
    >
      {isDownload
        ? <>
            <Loader2 className="animate-spin" /> Downloading...
          </>
        : 'Download Image'
      }
    </Button>
  )
}
