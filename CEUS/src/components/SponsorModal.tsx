// src/components/SponsorModal.tsx
'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { Sponsor } from '../types';

interface SponsorModalProps {
  sponsor: Sponsor | null; // Sponsor data or null if closed
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const SponsorModal: React.FC<SponsorModalProps> = ({ sponsor, isOpen, onClose }) => {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Keep the node mounted briefly after `isOpen` flips to false so the exit
  // transition can play out. `visible` drives the entrance fade-in.
  const [keepMounted, setKeepMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  // Bring the node into the tree synchronously when opening, and drive the
  // deferred unmount when closing — both via effects on `isOpen`.
  if (isOpen && !keepMounted) {
    // Idempotent; safe to call during render.
    setKeepMounted(true);
  }

  useEffect(() => {
    if (!isOpen) return;
    // Defer one frame so the entrance transition has a starting state.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(raf);
      setVisible(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    // Hold the node briefly for the exit transition, then unmount.
    const timeout = window.setTimeout(() => setKeepMounted(false), 200);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  // Esc to close, body-scroll lock, focus capture + restoration.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog after the next paint so the transition can start.
    const focusRaf = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(focusRaf);
      // Restore focus to the element that opened the modal.
      const toRestore = previouslyFocusedRef.current;
      if (toRestore && typeof toRestore.focus === 'function') {
        toRestore.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!keepMounted || !sponsor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onMouseDown={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      {/* Backdrop — solid scrim, no glassmorphism. */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-0 bg-black/60',
          'motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Dialog surface */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={sponsor.description ? descId : undefined}
        className={[
          'relative w-full max-w-lg',
          'rounded-xl border border-gray-200 bg-white shadow-2xl',
          'motion-safe:transition motion-safe:duration-200 motion-safe:ease-out',
          visible
            ? 'opacity-100 motion-safe:translate-y-0 motion-safe:scale-100'
            : 'opacity-0 motion-safe:translate-y-2 motion-safe:scale-[0.98]',
        ].join(' ')}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1B397E]">
                {sponsor.tier} Sponsor
              </p>
              <h2
                id={titleId}
                className="mt-1 text-2xl font-semibold leading-tight text-gray-900"
              >
                {sponsor.name}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 -mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo — sponsor dignity: readable size, white surround, hairline */}
          {sponsor.logoUrl ? (
            <div className="mt-6 flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                className="max-h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ) : null}

          {/* Description */}
          {sponsor.description ? (
            <p
              id={descId}
              className="mt-6 text-base leading-relaxed text-gray-700"
            >
              {sponsor.description}
            </p>
          ) : null}

          {/* Primary CTA — Brand Navy */}
          {sponsor.websiteUrl ? (
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md border-2 border-[#1B397E] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#1B397E] hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Close
              </button>
              <a
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-md bg-[#1B397E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Visit {sponsor.name}
                <svg
                  aria-hidden="true"
                  className="ml-2 h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;
