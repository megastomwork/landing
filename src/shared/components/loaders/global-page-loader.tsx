import Image from 'next/image';

export function GlobalPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <Image
            src="/logo.svg"
            alt="Loading"
            width={105}
            height={47}
            priority
          />
        </div>
        <div className="flex gap-2">
          <div className="bg-accent-100 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
          <div className="bg-accent-100 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
          <div className="bg-accent-100 h-2 w-2 animate-bounce rounded-full" />
        </div>
      </div>
    </div>
  );
}
