'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { faqs, projects, type Project } from '@/lib/content';
import { Photo, ProjectCard } from './shared';
export function FAQ({ limit }: { limit?: number }) {
  return (
    <Accordion className="faq-list">
      {faqs.slice(0, limit || faqs.length).map((f, i) => (
        <AccordionItem key={f.q} value={i}>
          <AccordionTrigger id={`faq-question-${i}`}>{f.q}</AccordionTrigger>
          <AccordionContent id={`faq-answer-${i}`}>
            <p>{f.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export function Portfolio() {
  const [filter, setFilter] = useState('الكل');
  const categories = ['الكل', ...new Set(projects.map((p) => p.category))];
  const selected = projects.filter(
    (p) => filter === 'الكل' || p.category === filter,
  );
  return (
    <>
      <div className="project-filters" aria-label="تصفية الأعمال">
        {categories.map((c) => (
          <Button
            key={c}
            variant="ghost"
            className="filter-button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </Button>
        ))}
      </div>
      <output className="result-count">
        {new Intl.NumberFormat('ar-IQ').format(selected.length)} مشاريع توضيحية
      </output>
      <div className="portfolio-grid">
        {selected.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            large={filter === 'الكل' && (i === 0 || i === 3)}
          />
        ))}
      </div>
      {selected.length === 0 && (
        <div className="empty-state">
          <h2>لا توجد أعمال في هذا التصنيف.</h2>
          <Button className="btn" onClick={() => setFilter('الكل')}>
            عرض كل الأعمال
          </Button>
        </div>
      )}
    </>
  );
}
export function ProjectGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  return (
    <>
      <div className="detail-photo">
        <Photo name={project.image} alt={project.alt} priority sizes="100vw" />
        <Button
          className="gallery-expand"
          variant="outline"
          onClick={() => {
            setDetail(false);
            setOpen(true);
          }}
        >
          <Expand size={17} /> تكبير الصورة
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lightbox" showCloseButton={false}>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>
            صورة أصلية مولّدة لتوضيح الفكرة.{' '}
            {detail ? 'عرض مقرّب للخامة والتفاصيل.' : 'عرض كامل للتصميم.'}
          </DialogDescription>
          <div className={`lightbox-image ${detail ? 'zoomed' : ''}`}>
            <Photo
              name={project.image}
              alt={project.alt}
              priority
              sizes="90vw"
            />
          </div>
          <div className="lightbox-controls">
            <Button
              variant="outline"
              className="btn outline"
              onClick={() => setDetail(!detail)}
            >
              {detail ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}{' '}
              {detail ? 'عرض كامل' : 'عرض التفاصيل'}
            </Button>
            <DialogClose render={<Button className="btn" />}>
              <X size={18} /> إغلاق
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
