"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Info, X } from "@phosphor-icons/react";
import { getRandomGradient } from "@/lib/gradients";

interface ProductImageProps {
  image?: string;
  name: string;
  description: string;
  id: string;
}

export function ProductImage({ image, name, description, id }: ProductImageProps) {
  const [showDescription, setShowDescription] = useState(false);

  const DescriptionOverlay = () => (
    <AnimatePresence>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 bg-bg-secondary rounded-lg p-4 flex items-center justify-center"
        >
          <p className="text-text-primary text-sm">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ToggleButton = () => (
    <button
      onClick={() => setShowDescription(!showDescription)}
      className="absolute z-30 bg-bg-secondary p-1 bottom-0 right-0"
      aria-label={showDescription ? "Hide description" : "Show description"}
      style={{
        borderRadius: "8px 0 8px 0px",
        zIndex: 30,
      }}
    >
      {showDescription ? (
        <X className="w-4 text-text-primary h-4" />
      ) : (
        <Info className="w-4 text-text-primary h-4" />
      )}
    </button>
  );

  if (image) {
    return (
      <div className="relative overflow-hidden aspect-square w-full">
        <Image
          className="rounded-lg z-10 object-cover object-center"
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <DescriptionOverlay />
        <ToggleButton />
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg relative aspect-square w-full ${getRandomGradient(id)}`}
    >
      <DescriptionOverlay />
      <ToggleButton />
    </div>
  );
} 