"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, X } from "@phosphor-icons/react";
import { ProductQuantityControl } from "./ProductQuantityControl";
import { getRandomGradient } from "@/lib/gradients";
import Image from "next/image";
import {
  CurrencyCode,
  decodeCurrency,
  formatCurrency,
} from "@/lib/currency-helper";
import getConstants from "@/lib/http";

export interface ProductCardProps {
  product_id: string;
  name: string;
  price: number;
  description: string;
  discount?: number;
  image?: string;
  currency?: string;
  payment_frequency_count?: number;
  payment_frequency_interval?: string;
  trial_period_days?: number;
}

interface ProductImageProps {
  image?: string;
  name: string;
  description: string;
  product_id: string;
  trial_period_days?: number;
}

function ProductImage({
  image,
  name,
  description,
  product_id,
  trial_period_days,
}: ProductImageProps) {
  const [showDescription, setShowDescription] = useState(false);

  const DescriptionOverlay = () => (
    <AnimatePresence>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 bg-bg-secondary rounded-[7px] p-4 flex items-center justify-center"
        >
          <div className="flex w-full h-full items-center justify-start relative flex-col gap-2">
            <p className="text-text-primary text-sm">{description}</p>
            {trial_period_days && (
              <p className="text-text-primary absolute bottom-0 left-0 border-2 border-border-secondary dark:border-border-primary rounded-md p-1 px-2 text-xs">
                {trial_period_days} day trial
              </p>
            )}
          </div>
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
        borderRadius: "8px 0 7px 0px",
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
      className={`rounded-lg relative aspect-square w-full ${getRandomGradient(
        product_id
      )}`}
    >
      <DescriptionOverlay />
      <ToggleButton />
    </div>
  );
}

export function ProductCard({
  product_id,
  name,
  price,
  description,
  discount,
  image,
  currency,
  payment_frequency_count,
  payment_frequency_interval,
  trial_period_days,
}: ProductCardProps) {
  const [checkout, setCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = useCallback(
    () => setQuantity((prev) => prev + 1),
    []
  );

  const handleDecrement = useCallback(
    () => setQuantity((prev) => Math.max(1, prev - 1)),
    []
  );

  const handleCheckout = useCallback(async () => {
    const { checkoutUrl } = await getConstants();
    window.location.href = `${checkoutUrl}/buy/${product_id}?quantity=${quantity}`;
  }, [quantity, product_id]);

  const formatFrequency = () => {
    if (!payment_frequency_count || !payment_frequency_interval) return "";
    const interval =
      payment_frequency_count === 1
        ? payment_frequency_interval
        : `${payment_frequency_interval}s`;
    return `/${
      payment_frequency_count === 1 ? "" : payment_frequency_count + " "
    }${interval}`;
  };

  const getPrice = () => {
    const basePrice = decodeCurrency(price, currency as CurrencyCode);
    const finalPrice = discount
      ? basePrice - basePrice * (discount / 100)
      : basePrice;
    return formatCurrency(finalPrice, currency as CurrencyCode);
  };

  return (
    <div className="p-4 w-full sm:w-[260px] border border-border-tertiary bg-bg-primary rounded-lg flex flex-col">
      <ProductImage
        product_id={product_id}
        image={image}
        name={name}
        trial_period_days={trial_period_days}
        description={description}
      />

      <div className="flex flex-col bg-bg-primary gap-0 mt-6">
        <h3 className="text-text-primary font-display text-base font-medium">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          {discount ? (
            <>
              <p className="text-sm opacity-40 line-through">
                {formatCurrency(
                  decodeCurrency(price, currency as CurrencyCode),
                  currency as CurrencyCode
                )}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-sm font-medium">{getPrice()}</p>
                <p className="text-xs text-text-secondary">
                  {formatFrequency()}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-medium">{getPrice()}</p>
              <p className="text-xs text-text-secondary">{formatFrequency()}</p>
            </>
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
