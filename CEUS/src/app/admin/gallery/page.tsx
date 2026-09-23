'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiImage,
  FiLoader,
  FiPlus,
  FiX,
} from 'react-icons/fi';
import { DeleteConfirmModal, ImageUpload } from '@/components/admin';
import {
  HERO_GALLERY_GRID,
  HERO_GALLERY_GRID_COLOR,
  HERO_GALLERY_GRID_GAP,
} from '@/data/heroGalleryGrid';
import {
  HomepageGalleryImage,
  HomepageGalleryVariant,
  STORAGE_BUCKETS,
  createHomepageGalleryImage,
  deleteHomepageGalleryImage,
  fetchHomepageGalleryImages,
  reorderHomepageGalleryImages,
  updateHomepageGalleryImage,
} from '@/lib/supabase';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<HomepageGalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [variant, setVariant] = useState<HomepageGalleryVariant>('desktop');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const layout = HERO_GALLERY_GRID[variant];
  const cellCount = layout.cells.length;
  const slotHint = layout.cells.length;

  const loadImages = useCallback(async (activeVariant: HomepageGalleryVariant) => {
    try {
      setLoadError(null);
      setIsLoading(true);
      const data = await fetchHomepageGalleryImages(activeVariant);
      setImages(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
      setLoadError(
        error instanceof Error
          ? error.message
          : 'Failed to load gallery. Has the migration been run?'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadImages(variant);
  }, [loadImages, variant]);

  const selectedImage =
    selectedIndex !== null && selectedIndex < images.length
      ? images[selectedIndex]
      : null;

  const urls = useMemo(() => images.map((image) => image.url), [images]);

  const switchVariant = (next: HomepageGalleryVariant) => {
    if (next === variant) return;
    setVariant(next);
    setSelectedIndex(null);
    setIsAddOpen(false);
    setActionError(null);
  };

  const handleReplace = async (path: string) => {
    if (!selectedImage) return;
    setIsSaving(true);
    setActionError(null);
    try {
      // updateHomepageGalleryImage cleans up the old file if unused by either list
      await updateHomepageGalleryImage(selectedImage.id, path, variant);
      await loadImages(variant);
    } catch (error) {
      console.error('Error replacing gallery image:', error);
      setActionError(error instanceof Error ? error.message : 'Failed to replace image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdd = async (path: string) => {
    setIsSaving(true);
    setActionError(null);
    try {
      await createHomepageGalleryImage(path, variant);
      setIsAddOpen(false);
      await loadImages(variant);
    } catch (error) {
      console.error('Error adding gallery image:', error);
      setActionError(error instanceof Error ? error.message : 'Failed to add image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    setIsDeleting(true);
    setActionError(null);
    try {
      await deleteHomepageGalleryImage(selectedImage.id, variant);
      setIsDeleteOpen(false);
      setSelectedIndex(null);
      await loadImages(variant);
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      setActionError(error instanceof Error ? error.message : 'Failed to delete image');
    } finally {
      setIsDeleting(false);
    }
  };

  const moveImage = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setImages(next);
    if (selectedIndex === index) setSelectedIndex(target);
    else if (selectedIndex === target) setSelectedIndex(index);
    setActionError(null);
    try {
      await reorderHomepageGalleryImages(
        next.map((image) => image.id),
        variant
      );
    } catch (error) {
      console.error('Error reordering gallery:', error);
      setActionError(error instanceof Error ? error.message : 'Failed to reorder');
      await loadImages(variant);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Gallery</h1>
          <p className="mt-1 text-gray-400 max-w-2xl">
            Desktop and mobile maps are independent lists (seeded the same initially). Numbers
            match frontpage slots for the selected map. Aim for about {slotHint}+ images so that
            band fills without heavy wrapping. Uploads go to the{' '}
            <code className="text-gray-300">homepage-gallery</code> bucket.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedIndex(null);
            setIsAddOpen(true);
            setActionError(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shrink-0"
        >
          <FiPlus className="w-5 h-5" />
          Add to {variant}
        </button>
      </div>

      {loadError && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
          {loadError}
        </div>
      )}

      {actionError && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-sm">
          {actionError}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {(['desktop', 'mobile'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => switchVariant(option)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition ${
              variant === option
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {option} map ({HERO_GALLERY_GRID[option].cells.length} slots)
          </button>
        ))}
        <span className="text-sm text-gray-500 ml-auto">
          {isLoading
            ? 'Loading…'
            : `${images.length} ${variant} image${images.length === 1 ? '' : 's'}`}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 gap-2">
            <FiLoader className="w-5 h-5 animate-spin" />
            Loading {variant} gallery…
          </div>
        ) : (
          <div
            className="w-full min-w-[640px]"
            style={{
              display: 'grid',
              aspectRatio: layout.aspectRatio,
              gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
              gap: HERO_GALLERY_GRID_GAP,
              padding: HERO_GALLERY_GRID_GAP,
              backgroundColor: HERO_GALLERY_GRID_COLOR,
            }}
          >
            {layout.cells.map((cell, index) => {
              const source = urls.length > 0 ? urls[index % urls.length] : null;
              const isWrapped = urls.length > 0 && index >= urls.length;
              const isSelected =
                selectedIndex !== null &&
                urls.length > 0 &&
                selectedIndex === index % urls.length;
              const slotNumber = index + 1;

              return (
                <button
                  key={`${variant}-${index}`}
                  type="button"
                  onClick={() => {
                    if (urls.length === 0) {
                      setIsAddOpen(true);
                      return;
                    }
                    setSelectedIndex(index % urls.length);
                    setIsAddOpen(false);
                    setActionError(null);
                  }}
                  className={`relative min-h-0 min-w-0 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isSelected ? 'ring-2 ring-indigo-400 z-10' : 'hover:ring-2 hover:ring-white/50'
                  }`}
                  style={{ gridColumn: cell.gridColumn, gridRow: cell.gridRow }}
                  title={
                    isWrapped
                      ? `Slot ${slotNumber} (wraps image #${(index % urls.length) + 1})`
                      : `Slot ${slotNumber}`
                  }
                >
                  {source ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={source}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
                      <FiImage className="w-5 h-5" />
                    </div>
                  )}
                  <span className="absolute inset-0 bg-black/35" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded bg-black/70 px-1.5 py-0.5 text-sm font-bold text-white tabular-nums sm:text-base">
                      {slotNumber}
                      {isWrapped ? '*' : ''}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {urls.length > 0 && urls.length < cellCount && (
          <p className="mt-2 text-xs text-gray-500">
            * Slots beyond {urls.length} reuse earlier images (wrap). Add more photos to fill uniquely.
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-white capitalize">
              {variant} image order
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Edits here only affect the {variant} map. Slot 1 uses the first image, and so on.
            </p>
          </div>
          <ul className="divide-y divide-gray-700 max-h-[28rem] overflow-y-auto">
            {images.length === 0 && !isLoading && (
              <li className="px-4 py-8 text-center text-gray-500 text-sm">
                No images yet for {variant}. Add one to populate this map.
              </li>
            )}
            {images.map((image, index) => (
              <li
                key={image.id}
                className={`flex items-center gap-3 px-3 py-2 ${
                  selectedIndex === index ? 'bg-indigo-600/20' : 'hover:bg-gray-700/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsAddOpen(false);
                  }}
                  className="flex flex-1 items-center gap-3 min-w-0 text-left"
                >
                  <span className="w-7 shrink-0 text-center text-sm font-bold text-indigo-300 tabular-nums">
                    {index + 1}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded object-cover bg-gray-900"
                  />
                  <span className="truncate text-xs text-gray-400">{image.storagePath}</span>
                </button>
                <div className="flex shrink-0 flex-col">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => void moveImage(index, -1)}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <FiChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === images.length - 1}
                    onClick={() => void moveImage(index, 1)}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 h-fit sticky top-4">
          {isAddOpen ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white capitalize">
                  Add to {variant}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <ImageUpload
                key={`add-${variant}`}
                bucket={STORAGE_BUCKETS.HOMEPAGE_GALLERY}
                maxSizeMB={10}
                onUpload={() => {}}
                onUploaded={(result) => {
                  void handleAdd(result.path);
                }}
              />
              {isSaving && (
                <p className="mt-2 text-sm text-indigo-300 flex items-center gap-2">
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Saving…
                </p>
              )}
            </>
          ) : selectedImage ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white capitalize">
                  Edit {variant} slot {selectedIndex! + 1}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-3 break-all">{selectedImage.storagePath}</p>
              <p className="text-xs text-gray-500 mb-2">
                Upload a new file to replace this {variant} slot.
              </p>
              <ImageUpload
                key={`${variant}-${selectedImage.id}-${selectedImage.storagePath}-upload`}
                bucket={STORAGE_BUCKETS.HOMEPAGE_GALLERY}
                maxSizeMB={10}
                onUpload={() => {}}
                onUploaded={(result) => {
                  void handleReplace(result.path);
                }}
              />
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.url}
                  alt=""
                  className="w-full h-32 object-cover bg-gray-900"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="mt-3 w-full px-3 py-2 text-sm rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition"
              >
                Remove from {variant} gallery
              </button>
              {isSaving && (
                <p className="mt-2 text-sm text-indigo-300 flex items-center gap-2">
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Saving…
                </p>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-400 py-6 text-center">
              Click a numbered tile or list row to replace or remove that {variant} image.
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          void handleDelete();
        }}
        title={`Remove ${variant} gallery image?`}
        message={
          selectedImage
            ? `Remove ${variant} slot ${(selectedIndex ?? 0) + 1} (${selectedImage.storagePath})? The other map is unchanged. The file is only deleted from storage if unused by both lists.`
            : `Remove this image from the ${variant} hero gallery?`
        }
        isDeleting={isDeleting}
      />
    </div>
  );
}
