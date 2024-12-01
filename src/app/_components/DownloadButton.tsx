'use client'

interface DownloadImageProps {
  title?: string;
}

export default function DownloadImage({ title = 'Friend' }: DownloadImageProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/og?title=${encodeURIComponent(title)}`)
      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `greeting-${title}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Download Image
    </button>
  )
}
