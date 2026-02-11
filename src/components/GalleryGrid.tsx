import Image from "next/image";

interface GalleryGridProps {
  images: string[];
  priorityCount?: number;
}

export default function GalleryGrid({ images, priorityCount = 0 }: GalleryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div key={image} className="aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
          <Image
            src={`/gallery/${image}`}
            alt={`Project ${index + 1}`}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            priority={index < priorityCount}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
