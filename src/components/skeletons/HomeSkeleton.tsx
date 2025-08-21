import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function HeroSkeleton() {
  return (
    <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 sm:h-16 w-80 mx-auto" />
          <Skeleton className="h-6 w-64 mx-auto" />
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function ProductCarouselSkeleton() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-none w-80">
                <Card className="overflow-hidden">
                  <div className="relative">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="absolute top-4 left-4 h-6 w-16" />
                    <Skeleton className="absolute top-4 right-4 h-6 w-12" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4 rounded-full" />
                      ))}
                      <Skeleton className="h-4 w-12 ml-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <Skeleton className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full" />
          <Skeleton className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function BrandCardsSkeleton() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-40 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="text-center group hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <Skeleton className="h-20 w-20 rounded-3xl mx-auto mb-4" />
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryCardsSkeleton() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <Skeleton className="h-8 w-48 mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <Skeleton className="h-16 w-16 mx-auto mb-4" />
                <Skeleton className="h-6 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto">
        <Skeleton className="h-8 w-40 mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Skeleton className="aspect-square rounded-lg mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 rounded-full" />
                  ))}
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </div>
    </section>
  );
}
