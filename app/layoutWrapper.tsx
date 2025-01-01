'use client';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-900/20 to-slate-900/20 py-20'>
      {/* Background Grid */}
      <div className='fixed inset-0 grid grid-cols-6 gap-2 -z-10 opacity-10'>
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className='aspect-square bg-gradient-to-br from-purple-500/40 to-transparent rounded-lg'
          />
        ))}
      </div>

      <div className='container mx-auto px-4 md:px-8'>{children}</div>
    </div>
  );
}
