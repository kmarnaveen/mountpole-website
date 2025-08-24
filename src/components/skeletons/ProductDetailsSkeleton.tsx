import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
            <span>/</span>
            <Skeleton className="h-4 w-14" />
            <span>/</span>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button Skeleton */}
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image */}
            <Skeleton className="aspect-square w-full rounded-2xl" />

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-8 sm:h-10 w-3/4 mb-3 sm:mb-4" />

              {/* Price - Commented out */}
              {/* 
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Skeleton className="h-8 sm:h-10 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              */}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Key Features */}
            <div>
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Skeleton className="h-12 sm:h-14 flex-1" />
              <Skeleton className="h-12 sm:h-14 w-24" />
            </div>
          </div>
        </div>

        {/* Specifications Skeleton */}
        <div className="mt-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-8 w-8 mr-3" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-12">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4">
                <Skeleton className="aspect-square w-full rounded-lg mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
