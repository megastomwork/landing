'use client'

import React from 'react'

export const ScrollModalInfo: React.FC = () => {
  return (
    <div
      style={{
        padding: '12px 16px',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#64748b',
      }}
    >
      <p style={{ margin: '0 0 12px 0' }}>
        <strong>Поведінка:</strong>
      </p>
      <ul style={{ margin: '0', paddingLeft: '20px' }}>
        <li>
          Модальне вікно показується <strong>один раз за сесію</strong>
        </li>
        <li>
          Якщо користувач закриє вікно, воно не з'явиться знову до нового візиту
        </li>
        <li>
          Контактна інформація (телефон, соціальні мережі) береться з глобальних
          налаштувань
        </li>
      </ul>
    </div>
  )
}
