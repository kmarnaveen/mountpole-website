// Brand logo components with actual brand images
import Image from "next/image";

export const AppleLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/1200x/5c/a8/fb/5ca8fbb105d7fe666dc22e36633107a1.jpg"
    alt="Apple Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const SamsungLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$"
    alt="Samsung Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const GoogleLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/1200x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
    alt="Google Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const XiaomiLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/1200x/0a/06/57/0a06573f82b48bd48f95e4a4e5dc4ca2.jpg"
    alt="Xiaomi Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const RealmeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/736x/71/71/0f/71710f762b6af383a73f9760fda3a3ae.jpg"
    alt="Realme Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const MotorolaLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/736x/31/c4/1d/31c41de9898d1c809ab5f385a5ca88fb.jpg"
    alt="Motorola Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const JBLLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/1200x/2c/ac/2a/2cac2ac8597cc2ea27601b198ea42685.jpg"
    alt="JBL Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const HuaweiLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="https://i.pinimg.com/1200x/22/b4/6c/22b46c6e80b2f5c1f6178e08223cc726.jpg"
    alt="Huawei Logo"
    width={32}
    height={32}
    className={`object-contain ${className}`}
  />
);

export const HonorLogo = ({
  className = "w-8 h-8",
}: {
  className?: string;
}) => (
  <div
    className={`${className} bg-gradient-to-br from-blue-600 to-cyan-600 rounded flex items-center justify-center`}
  >
    <span className="text-white font-bold text-xs">H</span>
  </div>
);

// Brand color constants
export const BRAND_COLORS = {
  apple: {
    primary: "#000000",
    secondary: "#1d1d1f",
    gradient: "from-gray-900 to-black",
  },
  samsung: {
    primary: "#1428A0",
    secondary: "#0066CC",
    gradient: "from-blue-600 to-blue-800",
  },
  google: {
    primary: "#4285F4",
    secondary: "#34A853",
    gradient: "from-blue-500 to-green-500",
  },
  xiaomi: {
    primary: "#FF6900",
    secondary: "#FF8C42",
    gradient: "from-orange-500 to-orange-600",
  },
  realme: {
    primary: "#FFD700",
    secondary: "#FFA500",
    gradient: "from-yellow-400 to-orange-500",
  },
  motorola: {
    primary: "#0066CC",
    secondary: "#004499",
    gradient: "from-blue-600 to-blue-700",
  },
  jbl: {
    primary: "#FF6600",
    secondary: "#FF4500",
    gradient: "from-orange-500 to-red-500",
  },
  huawei: {
    primary: "#FF0000",
    secondary: "#CC0000",
    gradient: "from-red-500 to-red-600",
  },
  honor: {
    primary: "#0099FF",
    secondary: "#0066CC",
    gradient: "from-blue-400 to-blue-600",
  },
} as const;
