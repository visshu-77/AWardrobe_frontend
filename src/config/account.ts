import {
  AddressIcon,
  HeartIcon,
  HelpIcon,
  LanguageIcon,
  PackageIcon,
  QuestionAnswerIcon,
  StarIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons";

export type AccountLink = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// The 2x2 buttons under the greeting.
export const accountQuickLinks: AccountLink[] = [
  { label: "Your Orders", href: "/orders", icon: PackageIcon },
  { label: "Wishlist", href: "/wishlist", icon: HeartIcon },
  { label: "Track Order", href: "/orders/track", icon: TruckIcon },
  { label: "Help Center", href: "/contact", icon: HelpIcon },
];

export const accountSections: { title: string; links: AccountLink[] }[] = [
  {
    title: "Account Settings",
    links: [
      { label: "Edit Profile", href: "/account/profile", icon: UserIcon },
      { label: "Saved Addresses", href: "/account/addresses", icon: AddressIcon },
      { label: "Select Language", href: "/account/language", icon: LanguageIcon },
    ],
  },
  {
    title: "My Activity",
    links: [
      { label: "Reviews", href: "/account/reviews", icon: StarIcon },
      { label: "Questions & Answers", href: "/account/questions", icon: QuestionAnswerIcon },
    ],
  },
];
