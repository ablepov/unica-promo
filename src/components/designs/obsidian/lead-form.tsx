"use client";

import { startTransition, useState } from "react";

import styles from "./obsidian.module.css";

type FormState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = {
  kind: "idle",
  message:
    "Опишите сценарий, контур и ограничения. Этого достаточно, чтобы предложить формат пилота и следующий шаг.",
};

const deliveryOptions = [
  {
    value: "cloud",
    label: "Облако",
    note: "Для быстрого старта и управляемого пилота.",
  },
  {
    value: "on-prem",
    label: "On-prem",
    note: "Для закрытого контура и полного контроля.",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    note: "Для смешанной архитектуры и поэтапного запуска.",
  },
] as const;

export function ObsidianLeadForm() {
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
                "Заявка отправлена. Вернёмся с вариантом пилота, контуром запуска и следующими шагами.",
            });
          } catch (error) {
            setState({
              kind: "error",
              message:
                error instanceof Error
                  ? error.message
                  : "Не удалось отправить форму. Попробуйте ещё раз.",
            });
          } finally {
            setIsPending(false);
          }
        });
      }}
    >
      <div className={styles.formHeader}>
        <span className={styles.eyebrow}>Заказать демо</span>
        <h3 className={`${styles.display} ${styles.formTitle}`}>
          Покажите нам вашу задачу, и мы предложим безопасный путь запуска.
        </h3>
        <p className={styles.formLead}>
          Опишите сценарий, и мы покажем, как он может работать в облаке или on-prem без
          лишней предварительной бюрократии.
        </p>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="obsidian-name">
            Имя
          </label>
          <input
            id="obsidian-name"
            name="name"
            className={styles.field}
            placeholder="Например, Антон"
            required
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="obsidian-company">
            Компания
          </label>
          <input
            id="obsidian-company"
            name="company"
            className={styles.field}
            placeholder="Название компании"
            required
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="obsidian-contact">
            Контакт
          </label>
          <input
            id="obsidian-contact"
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
                <span>
                  <span>
                    <strong className={styles.deliveryTitle}>{option.label}</strong>
                    <span className={styles.deliveryNote}>{option.note}</span>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={`${styles.fieldBlock} ${styles.fieldBlockFull}`}>
          <label className={styles.fieldLabel} htmlFor="obsidian-message">
            Сценарий или задача
          </label>
          <textarea
            id="obsidian-message"
            name="message"
            className={styles.textarea}
            placeholder="Например: внутренний поиск по базе знаний, сервис-деск, документы, речевая аналитика, автоматизация рутины, on-prem и требования ИБ."
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.primaryButton} disabled={isPending}>
          {isPending ? "Отправляем..." : "Заказать демо"}
        </button>
        <a href="mailto:sales@unica.local" className={styles.directLink}>
          Или написать напрямую: sales@unica.local
        </a>
      </div>

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
    </form>
  );
}
