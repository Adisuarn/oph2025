import React from 'react'
import { api } from '~/libs/elysia/server'
import { auth } from '~/server/auth'

const TestPage = async () => {
  const { data, error } = await api.user.screenshot.post()
  console.log(data)
  return (
    <div>TestPage</div>
  )
}

export default TestPage
