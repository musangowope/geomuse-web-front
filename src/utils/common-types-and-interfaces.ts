import React from 'react'

export type BaseRequestType = {
  loading: boolean
  success: boolean
  failed: boolean
  error: any
}

export type ChildrenType = {
  children: React.ReactNode | string
}
