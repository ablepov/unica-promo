"use client";

import { startTransition, useState, type ReactNode } from "react";

type FormState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = {
  kind: "idle",
  message: "Ответим и предложим формат старта: demo, cloud или on-prem.",
};

export function LeadForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="surface-subtle space-y-4 p-5"
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
                "Заявка отправлена. Email-сбор или webhook можно подключить без изменения формы.",
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
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
          Короткая форма
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Заказать демо
        </h3>
      </div>

      <Field label="Имя" name="name" placeholder="Например, Антон" required />
      <Field
        label="Компания"
        name="company"
        placeholder="Название компании"
        required
      />

      <div className="space-y-2">
        <label htmlFor="deliveryModel" className="text-sm font-medium text-slate-100">
          Модель поставки
        </label>
        <select
          id="deliveryModel"
          name="deliveryModel"
          defaultValue="cloud"
          className="form-field"
        >
          <option value="cloud">Облако</option>
          <option value="on-prem">On-prem</option>
          <option value="hybrid">Гибридная модель</option>
        </select>
      </div>

      <Field
        label="Контакт"
        name="contact"
        placeholder="Email, телефон или Telegram"
        required
      />

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-100">
          Сценарий или задача
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="form-field resize-none"
          placeholder="Коротко опишите процесс, контур и ожидания от пилота."
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={isPending}>
        {isPending ? "Отправляем..." : "Заказать демо"}
      </button>

      <p
        className={`text-sm leading-6 ${
          state.kind === "success"
            ? "text-emerald-300"
            : state.kind === "error"
              ? "text-rose-300"
              : "text-[var(--muted)]"
        }`}
        aria-live="polite"
      >
        {state.message}
      </p>

      <div className="grid gap-3 pt-1 sm:grid-cols-2">
        <SecondaryLink href="mailto:sales@unica.local">
          Запросить облако
        </SecondaryLink>
        <SecondaryLink href="mailto:sales@unica.local?subject=On-prem%20Unica">
          Обсудить on-prem
        </SecondaryLink>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-100">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="form-field"
      />
    </div>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-400/8"
    >
      {children}
    </a>
  );
}
