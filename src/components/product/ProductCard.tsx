/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, X } from "@phosphor-icons/react";
import { ProductQuantityControl } from "./ProductQuantityControl";

import {
  CurrencyCode,
  decodeCurrency,
  formatCurrency,
} from "@/lib/currency-helper";

export interface ProductCardProps {
  product_id: string;
  name: string;
  price: number;
  description: string;
  discount?: number;
  image?: string;
  pay_what_you_want?: boolean;
  currency?: string;
  payment_frequency_count?: number;
  payment_frequency_interval?: string;
  trial_period_days?: number;
}

type ProductCardComponentProps = ProductCardProps & {
  checkoutBaseUrl: string;
};

interface ProductImageProps {
  image?: string;
  name: string;
  description: string;
  trial_period_days?: number;
}

const ProductImage = memo(function ProductImage({
  image,
  name,
  description,
  trial_period_days,
  showDescription,
  onToggleDescription,
}: ProductImageProps & {
  showDescription: boolean;
  onToggleDescription: () => void;
}) {
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
            {trial_period_days && trial_period_days > 0 ? (
              <p className="text-text-primary absolute bottom-0 left-0 border-2 border-border-secondary dark:border-border-primary rounded-md p-1 px-2 text-xs">
                {trial_period_days} day trial
              </p>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ToggleButton = () => (
    <button
      onClick={onToggleDescription}
      type="button"
      className="absolute z-30 bg-bg-secondary p-1 bottom-0 right-0"
      aria-label={showDescription ? "Hide description" : "Show description"}
      style={{
        borderRadius: "8px 0 7px 0px",
        zIndex: 30,
      }}
    >
      {showDescription ? (
        <X className="w-5 text-text-primary h-5" />
      ) : (
        <Info className="w-5 text-text-primary h-5" />
      )}
    </button>
  );

  return (
    <div className="relative overflow-hidden aspect-square w-full">
      <img
        className="rounded-lg z-10 object-cover object-center"
        src={image || "/placeholder.png"}
        alt={name}
      />
      <DescriptionOverlay />
      <ToggleButton />
    </div>
  );
});

export function ProductCard({
  product_id,
  name,
  price,
  description,
  discount,
  image,
  currency,
  payment_frequency_count,
  pay_what_you_want,
  payment_frequency_interval,
  trial_period_days,
  checkoutBaseUrl,
}: ProductCardComponentProps) {
  const [checkout, setCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const handleIncrement = useCallback(
    () => setQuantity((prev) => prev + 1),
    []
  );

  const handleDecrement = useCallback(() => {
    setQuantity((prev) => Math.max(0, prev - 1));
    if (quantity === 1) {
      setCheckout(false);
    }
  }, [quantity]);

  const handleCheckout = useCallback(async () => {
    window.location.href = `${checkoutBaseUrl}/buy/${product_id}?quantity=${quantity}`;
  }, [quantity, product_id, checkoutBaseUrl]);

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
    return (
      formatCurrency(finalPrice, currency as CurrencyCode) +
      (pay_what_you_want ? "+" : "")
    );
  };

  const toggleDescription = useCallback(() => {
    setShowDescription((prev) => !prev);
  }, []);

  return (
    <div className="p-4 w-full sm:w-[260px] border border-border-tertiary bg-bg-primary rounded-lg flex flex-col">
      <ProductImage
        image={image}
        name={name}
        trial_period_days={trial_period_days}
        description={description}
        showDescription={showDescription}
        onToggleDescription={toggleDescription}
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
              onClick={() => {
                setCheckout(true);
                setQuantity(1);
              }}
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
              Buy now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
