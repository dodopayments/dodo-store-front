"use client";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ProductQuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div className="p-[6px] py-[7px] rounded-lg border border-border-tertiary gap-4 flex justify-center w-fit items-center">
      <button
        onClick={onDecrement}
        className="bg-button-secondary-bg hover:bg-button-secondary-bg-hover rounded-md aspect-square h-[24px] flex items-center justify-center"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <p className="text-sm min-w-[20px] text-center" aria-label="Quantity">
        {quantity}
      </p>
      <button
        onClick={onIncrement}
        className="bg-button-secondary-bg hover:bg-button-secondary-bg-hover rounded-md aspect-square h-[24px] flex items-center justify-center"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
} 