"use client";

import { startTransition, useState } from "react";

import styles from "./promo.module.css";

type FormState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = {
  kind: "idle",
  message: "",
};

const deliveryOptions = [
  {
    value: "cloud",
    label: "Облако",
    note: "Быстрый старт",
  },
  {
    value: "on-prem",
    label: "On-prem",
    note: "Закрытый контур",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    note: "Поэтапный запуск",
  },
] as const;

export function PromoLeadForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className={styles.formPanel}
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          deliveryModel: String(formData.get("deliveryModel") ?? ""),
          contact: String(formData.get("contact") ?? ""),
          message: String(formData.get("message") ?? ""),
        };

        setIsPending(true);
        setState(initialState);

        startTransition(async () => {
          try {
            const response = await fetch("/api/lead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const result = (await response.json()) as { error?: string };
            if (!response.ok) {
              throw new Error(result.error ?? "Не удалось отправить форму.");
            }

            form.reset();
            setState({
              kind: "success",
              message:
                "Заявка отправлена. Вернемся с вариантом пилота и следующим шагом.",
            });
          } catch (error) {
            setState({
              kind: "error",
              message:
                error instanceof Error
                  ? error.message
                  : "Не удалось отправить форму. Попробуйте еще раз.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <div className={styles.formHeader}>
        <h3 className={`${styles.display} ${styles.formTitle}`}>
          Запросить демо
        </h3>
      </div>

      <div className={styles.formDivider} aria-hidden="true" />

      <div className={styles.fieldGrid}>
        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="promo-name">
            Имя
          </label>
          <input
            id="promo-name"
            name="name"
            className={styles.field}
            placeholder="Например, Антон"
            required
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="promo-company">
            Компания
          </label>
          <input
            id="promo-company"
            name="company"
            className={styles.field}
            placeholder="Название компании"
            required
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="promo-contact">
            Контакт
          </label>
          <input
            id="promo-contact"
            name="contact"
            className={styles.field}
            placeholder="Email, телефон или Telegram"
            required
          />
        </div>

        <div className={`${styles.fieldBlock} ${styles.fieldBlockFull}`}>
          <span className={styles.fieldLabel}>Модель поставки</span>
          <div className={styles.deliveryGrid}>
            {deliveryOptions.map((option, index) => (
              <label key={option.value} className={styles.deliveryOption}>
                <input
                  className={styles.deliveryInput}
                  type="radio"
                  name="deliveryModel"
                  value={option.value}
                  defaultChecked={index === 0}
                />
                <span className={styles.deliveryCard}>
                  <strong className={styles.deliveryTitle}>{option.label}</strong>
                  <span className={styles.deliveryNote}>{option.note}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={`${styles.fieldBlock} ${styles.fieldBlockFull}`}>
          <label className={styles.fieldLabel} htmlFor="promo-message">
            Сценарий
          </label>
          <textarea
            id="promo-message"
            name="message"
            className={styles.textarea}
            placeholder="Задача, данные, ограничения, контур."
          />
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.formActions}>
          <button
            type="submit"
            className={`${styles.primaryButton} ${styles.submitButton}`}
            disabled={isPending}
          >
            {isPending ? "Отправляем..." : "Заказать демо"}
          </button>
          <a href="mailto:sales@unica.local" className={styles.directLink}>
            или напишите на почту sales@unica.ru
          </a>
        </div>

        {state.message ? (
          <p
            className={`${styles.status} ${
              state.kind === "success"
                ? styles.statusSuccess
                : state.kind === "error"
                  ? styles.statusError
                  : styles.statusIdle
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
