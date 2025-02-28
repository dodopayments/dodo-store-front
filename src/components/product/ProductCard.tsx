"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { ProductImage } from "./ProductImage";
import { ProductQuantityControl } from "./ProductQuantityControl";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  discount_price?: number;
  image?: string;
}

export function ProductCard({
  id,
  name,
  price,
  description,
  discount_price,
  image,
}: ProductCardProps) {
  const [checkout, setCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = useCallback(() => 
    setQuantity((prev) => prev + 1), []);
    
  const handleDecrement = useCallback(() => 
    setQuantity((prev) => Math.max(1, prev - 1)), []);

  const handleCheckout = useCallback(() => {
    console.log(`Checking out ${quantity} items`);
  }, [quantity]);

  return (
    <div className="p-4 w-full sm:w-[260px] border border-border-tertiary bg-bg-primary rounded-lg flex flex-col">
      <ProductImage id={id} image={image} name={name} description={description} />

      <div className="flex flex-col bg-bg-primary gap-0 mt-6">
        <h3 className="text-text-primary font-display text-base font-medium">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm">${price}</p>
          {discount_price && (
            <p className="text-sm opacity-40 line-through">${discount_price}</p>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!checkout ? (
          <motion.div
            key="purchase"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mt-5 justify-between"
          >
            <Button
              onClick={() => setCheckout(true)}
              variant="secondary"
              className="w-full"
              iconPlacement="right"
              effect="expandIcon"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Purchase
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mt-5 justify-between"
          >
            <ProductQuantityControl
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleCheckout}
            >
              Confirm
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
