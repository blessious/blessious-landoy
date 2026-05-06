import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/DTR/dashboard-attendance-overview.png', alt: 'DTR Dashboard' },
  { src: '/FAAS/dashboard-overview.png', alt: 'FAAS Dashboard' },
  { src: '/Senior/01-dashboard-overview.png', alt: 'Senior Dashboard' },
  { src: '/DTR/printable-dtr-pdf.png', alt: 'DTR PDF' },
  { src: '/FAAS/faas-form.png', alt: 'FAAS Form' },
  { src: '/Senior/02-senior-records-list.png', alt: 'Senior Records' },
  { src: '/DTR/biometrics-devices.png', alt: 'DTR Biometrics' },
  { src: '/FAAS/user-management.png', alt: 'FAAS Users' },
  { src: '/Senior/04-payroll-generation.png', alt: 'Senior Payroll' },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white dark:bg-[#111] shadow-sm p-4 mb-3 transition-colors duration-300">
      <h2 className="text-[18px] font-bold text-black dark:text-white mb-4">Gallery</h2>
      
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/90 text-black dark:text-white p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, idx) => (
            <div key={idx} className="flex-none w-[280px] sm:w-[320px] aspect-video snap-center overflow-hidden border border-gray-200 dark:border-[#2a2a2a]">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/90 text-black dark:text-white p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
