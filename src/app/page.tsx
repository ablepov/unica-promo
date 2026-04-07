import { SiteHeader } from "@/components/landing/site-header";
import { ArchitecturePricingSection } from "@/components/landing/sections/architecture-pricing-section";
import { ClosingSection } from "@/components/landing/sections/closing-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { PlatformSecuritySection } from "@/components/landing/sections/platform-security-section";
import { TrustPainSection } from "@/components/landing/sections/trust-pain-section";
import { UseCasesSection } from "@/components/landing/sections/use-cases-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <HeroSection />
        <TrustPainSection />
        <UseCasesSection />
        <PlatformSecuritySection />
        <ArchitecturePricingSection />
        <ClosingSection />
      </main>
    </>
  );
}
