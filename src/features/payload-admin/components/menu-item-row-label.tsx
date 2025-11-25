'use client'

import React from 'react'

interface MenuItemRowLabelProps {
  data?: {
    label?: string
  }
  index?: number
}

export const MenuItemRowLabel: React.FC<MenuItemRowLabelProps> = ({ data, index }) => {
  return <span>{data?.label || `Пункт меню ${(index ?? 0) + 1}`}</span>
}
