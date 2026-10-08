"use client";

import React from "react";

export type MarketplaceId =
  | "amazon"
  | "flipkart"
  | "meesho"
  | "ajio"
  | "myntra"
  | "shopify"
  | "woocommerce";

interface MarketplaceBrandLogoProps {
  id: MarketplaceId;
  className?: string;
  size?: number;
}

export const MarketplaceBrandLogo: React.FC<MarketplaceBrandLogoProps> = ({
  id,
  className = "",
  size = 28,
}) => {
  switch (id) {
    case "amazon":
      return (
        <svg
          viewBox="0 0 100 30"
          width={size * 2.8}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* amazon text style */}
          <text
            x="0"
            y="18"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
          >
            amazon
          </text>
          {/* Orange Smile Arrow */}
          <path
            d="M 12 23 C 32 29, 62 28, 78 20"
            stroke="#FF9900"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 74 17.5 L 80 20 L 76.5 24.5 Z"
            fill="#FF9900"
          />
        </svg>
      );

    case "flipkart":
      return (
        <svg
          viewBox="0 0 110 32"
          width={size * 2.8}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Flipkart Yellow Bag Icon */}
          <rect x="2" y="3" width="24" height="26" rx="6" fill="#2874F0" />
          <path
            d="M 7 10 L 21 10 L 19 25 L 9 25 Z"
            fill="#FFE11B"
          />
          <path
            d="M 11 10 C 11 6.5, 17 6.5, 17 10"
            stroke="#2874F0"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="12"
            y="21"
            fill="#2874F0"
            fontSize="12"
            fontWeight="900"
            fontStyle="italic"
            fontFamily="system-ui, sans-serif"
          >
            f
          </text>
          {/* Flipkart Text */}
          <text
            x="32"
            y="20"
            fill="#FFFFFF"
            fontSize="17"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.3"
          >
            Flipkart
          </text>
        </svg>
      );

    case "meesho":
      return (
        <svg
          viewBox="0 0 100 32"
          width={size * 2.8}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Meesho Rounded Badge with "m" */}
          <rect x="2" y="3" width="26" height="26" rx="8" fill="#9F2089" />
          <path
            d="M 8 22 V 12 C 8 10 11 10 12.5 12 L 15 16 L 17.5 12 C 19 10 22 10 22 12 V 22"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Meesho Text */}
          <text
            x="34"
            y="21"
            fill="#F43397"
            fontSize="17"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.2"
          >
            meesho
          </text>
        </svg>
      );

    case "ajio":
      return (
        <svg
          viewBox="0 0 90 32"
          width={size * 2.6}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect x="2" y="3" width="26" height="26" rx="6" fill="#2C4152" />
          <text
            x="8"
            y="22"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
          >
            A
          </text>
          <text
            x="34"
            y="21"
            fill="#FFFFFF"
            fontSize="19"
            fontWeight="800"
            letterSpacing="2.5"
            fontFamily="system-ui, sans-serif"
          >
            AJIO
          </text>
        </svg>
      );

    case "myntra":
      return (
        <svg
          viewBox="0 0 100 32"
          width={size * 2.8}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Distinctive Myntra M ribbons */}
          <path
            d="M 5 24 L 11 12 C 12.5 9 16 9 17.5 12 L 20 17 L 17 22 Z"
            fill="#F1592A"
          />
          <path
            d="M 12 24 L 17.5 13 C 19 10 22 10 23.5 13 L 29 24 Z"
            fill="#E72757"
          />
          <text
            x="34"
            y="21"
            fill="#FFFFFF"
            fontSize="16"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            Myntra
          </text>
        </svg>
      );

    case "shopify":
      return (
        <svg
          viewBox="0 0 110 32"
          width={size * 2.8}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Shopify Bag */}
          <path
            d="M 6 9 L 20 7 L 22 26 L 4 26 Z"
            fill="#95BF47"
          />
          <path
            d="M 11 8 C 11 4.5, 17 4.5, 17 7"
            stroke="#5E8E3E"
            strokeWidth="2.2"
            fill="none"
          />
          <text
            x="8"
            y="21"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
          >
            S
          </text>
          <text
            x="28"
            y="21"
            fill="#95BF47"
            fontSize="17"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.3"
          >
            shopify
          </text>
        </svg>
      );

    case "woocommerce":
      return (
        <svg
          viewBox="0 0 135 32"
          width={size * 3.4}
          height={size * 0.84}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* WooCommerce Purple Badge */}
          <rect x="2" y="4" width="38" height="24" rx="7" fill="#7F54B3" />
          <text
            x="7"
            y="20"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            WOO
          </text>
          <text
            x="45"
            y="21"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            COMMERCE
          </text>
        </svg>
      );

    default:
      return null;
  }
};
