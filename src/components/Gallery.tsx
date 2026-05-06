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
    <section className="bg-white dark:bg-[#111] shadow-sm p-5 md:p-6 mb-3 transition-colors duration-300">
      <h2 className="text-[20px] font-extrabold text-black dark:text-white mb-5 tracking-tight">Gallery</h2>
      
      <div className="relative group -mx-2 md:mx-0">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-gray-700 p-2.5 hover:bg-gray-50 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 px-2 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, idx) => (
            <div key={idx} className="flex-none w-[85%] sm:w-[45%] md:w-[calc(25%-7.5px)] aspect-square snap-center overflow-hidden border border-gray-100 dark:border-[#222]">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-gray-700 p-2.5 hover:bg-gray-50 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
