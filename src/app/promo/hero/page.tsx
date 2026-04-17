import type { Metadata } from "next";
import Link from "next/link";

import { PromoHeroInterface } from "@/components/designs/promo/promo-hero-interface";
import styles from "@/components/designs/promo/promo.module.css";
import { PromoThemeShell } from "@/components/designs/promo/theme-shell";

export const metadata: Metadata = {
  title: "Hero Lab | Unica AI",
  description:
    "Изолированная страница для отладки и развития анимированного интерфейса из hero-блока сайта.",
};

export default function PromoHeroPage() {
  return (
    <PromoThemeShell>
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.heroLab}>
            <div className={styles.shell}>
              <Link href="/" className={styles.heroLabLink}>
                На главную
              </Link>

              <div className={[styles.heroLabStage, styles.heroLabStageInteractive].join(" ")}>
                <PromoHeroInterface interactive />
              </div>
            </div>
          </section>
        </main>
      </div>
    </PromoThemeShell>
  );
}
