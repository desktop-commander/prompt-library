import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

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
    author: "r2997790",
    role: "Developer",
    source: "Community"
  },
  {
    quote:
      "I had 76 errors across 23 files. Desktop Commander + tree-sitter fixed them in hours. I've never resolved type errors this quickly.",
    author: "dependablecalls",
    role: "Svelte Developer",
    source: "Community"
  },
  {
    quote:
      "It’s a life saver! It solves the problem of duplicated tools and writes code with the latest updates. Super happy.",
    author: "play365alltime",
    role: "Engineer",
    source: "Community"
  }
];

export function TestimonialsRow({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  return (
    <section aria-label="User testimonials" className="py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-card border">
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsRow;
