import React from 'react'
import DownloadImage from '../_components/DownloadButton'

const TestPage = async () => {
  return (
    <div className="p-4">
      <h1>Download Your Greeting</h1>
      <DownloadImage title="Test" />
    </div>
  )
}

export default TestPage
