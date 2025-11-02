interface Stat {
  value: string
  label: string
  id?: string
}

interface AboutStatsProps {
  stats?: Stat[]
}

export default function AboutStats({ stats }: AboutStatsProps) {
  const defaultStats = [
    { value: '6', label: 'Кваліфікованих лікарів' },
    { value: '4', label: 'Кабінетів стоматологів' },
    { value: '22', label: 'Роки роботи' },
    { value: '10 000+', label: 'Задоволених клієнтів' },
  ]

  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-6 text-center text-black">
      {displayStats.map((stat, i) => (
        <div key={stat.id || i}>
          <p className="text-3xl font-semibold text-[#34E6F6]">{stat.value}</p>
          <p className="whitespace-pre-line text-base text-gray-700 md:text-xl">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
