import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Dashboard = () => {
  const session = getServerSession()

  if (!session) {
    redirect('/')
  }
  return (
    <div className='flex items-center'>Dashboards</div>
  )
}

export default Dashboard
