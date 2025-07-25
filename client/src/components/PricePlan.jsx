import { PricingTable } from "@clerk/clerk-react";
import Title from "./Title";
import { dark } from "@clerk/themes";

function PricePlan() {
  return (
    <div className="px-4 sm:px-20 xl:px-32 mb-20 z-20">
      <Title
        title="Choose Your Plan"
        subtitle="Start for free and scale up as you grow. Find the perfect plan for your content creation needs."
      />
      <div className="mt-14 max-sm:mx-8 max-w-2xl mx-auto">
        <PricingTable
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#6648ab",
              colorPrimaryForeground: "#fff",
            },
          }}
        />
      </div>
    </div>
  );
}

export default PricePlan;
