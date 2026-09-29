import type { Cart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { CheckCircleIcon, TruckIcon } from "@/components/icons";

export default function FreeDeliveryNote({ cart }: { cart: Cart }) {
  if (cart.freeShipping) {
    return (
      <p className="flex items-center gap-2 text-[15px] font-medium text-[#16a34a]">
        <CheckCircleIcon className="shrink-0" />
        Your order is eligible for free Delivery
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-[15px] text-foreground/75">
      <TruckIcon className="shrink-0" />
      Add {formatPrice(cart.freeShippingThreshold - cart.subtotal)} more for free Delivery
    </p>
  );
}
