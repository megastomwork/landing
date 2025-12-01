'use client'

import React from 'react'

export const ScrollTriggersHelp: React.FC = () => {
  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '6px',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#0c4a6e',
      }}
    >
      <strong>Як працюють тригери:</strong>
      <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
        <li>
          Користувач скролить вниз до <strong>{'scrollDownTrigger%'}</strong> від
          верху сторінки
        </li>
        <li>
          Потім скролить назад вгору до <strong>{'scrollUpTrigger%'}</strong> від
          верху
        </li>
        <li>Модальне вікно з'являється</li>
      </ol>
      <p style={{ margin: '8px 0 0 0' }}>
        <em>Приклад:</em> 90% (вниз) → 10% (вгору) = користувач майже доскролив до
        кінця, потім повернувся до верху
      </p>
    </div>
  )
}
