import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  source?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Absolutely loving Desktop Commander! It writes real code into my project and fixes issues faster than I could on my own.",
    author: "Community member",
    role: "Developer",
  },
  {
    quote:
      "I had 76 errors across many files. Desktop Commander fixed them in hours. I've never resolved type errors this quickly.",
    author: "Community member",
    role: "Svelte Developer",
  },
  {
    quote:
      "It’s a life saver. It writes code with the latest updates and removes tool duplication for me.",
    author: "Community member",
    role: "Engineer",
  },
  {
    quote:
      "I asked it to organize my downloads and it did everything automatically and showed a clear summary.",
    author: "Community member",
    role: "Entrepreneur",
  },
  {
    quote:
      "Great for exploring unfamiliar repos. I got an architectural overview in minutes instead of hours.",
    author: "Community member",
    role: "Developer",
  },
  {
    quote:
      "Set up a full dev environment for me and verified everything with a sample app—zero guesswork.",
    author: "Community member",
    role: "Developer",
  },
  {
    quote:
      "It automated my weekly newsletter pipeline end-to-end on my computer. Massive time saver.",
    author: "Community member",
    role: "Entrepreneur",
  },
  {
    quote:
      "I finally cleaned up unused code across a large project without manual hunting.",
    author: "Community member",
    role: "Developer",
  },
];

export function TestimonialsRow({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  return (
    <section aria-label="User testimonials" className="py-10 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">What users are saying</h3>
        </div>

        <div className="relative">
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="bg-card border hover-scale shadow-sm">
                    <CardContent className="p-5">
                      <Quote className="h-5 w-5 text-primary mb-3" />
                      <p className="text-sm text-foreground leading-relaxed">“{t.quote}”</p>
                      <div className="mt-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{t.author}</span>
                        {t.role ? <> · {t.role}</> : null}
                        {t.source ? <> · {t.source}</> : null}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 sm:-left-8" />
            <CarouselNext className="-right-4 sm:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsRow;
