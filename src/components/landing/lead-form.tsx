"use client";

import { startTransition, useState } from "react";

type FormState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = {
  kind: "idle",
  message: "Ответим с вариантом пилота, контуром запуска и следующими шагами.",
};

const deliveryOptions = [
  {
    value: "cloud",
    label: "Cloud",
    note: "Для быстрого пилота и первого запуска.",
  },
  {
    value: "on-prem",
    label: "On-prem",
    note: "Для закрытого контура и контроля инфраструктуры.",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    note: "Для смешанного ландшафта и поэтапного развёртывания.",
  },
] as const;

export function LeadForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="section-plane relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8"
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
              message: "Заявка отправлена. Вернёмся с вариантом пилота и следующими шагами.",
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(115,179,255,0.16),transparent_22%),radial-gradient(circle_at_14%_88%,rgba(76,239,214,0.08),transparent_24%)]" />

      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
          Request demo
        </p>
        <h3 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.04em] text-white">
          Расскажите про процесс, контур и ограничения.
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
          Этого достаточно, чтобы предложить формат пилота, набор интеграций и
          следующий шаг без длинного брифа.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Имя" name="name" placeholder="Например, Антон" required />
          <Field
            label="Компания"
            name="company"
            placeholder="Название компании"
            required
          />
          <Field
            label="Контакт"
            name="contact"
            placeholder="Email, телефон или Telegram"
            required
          />

          <div className="space-y-3 sm:col-span-2">
            <span className="text-sm font-medium text-slate-100">
              Контур запуска
            </span>
            <div className="grid gap-2 sm:grid-cols-3">
              {deliveryOptions.map((option, index) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryModel"
                    value={option.value}
                    defaultChecked={index === 0}
                    className="peer sr-only"
                  />
                  <span className="flex h-full rounded-[1.4rem] border border-white/10 bg-white/[0.025] px-4 py-4 text-left transition peer-checked:border-cyan-300/40 peer-checked:bg-cyan-400/[0.08] peer-checked:text-white hover:border-white/18">
                    <span>
                      <span className="block text-sm font-semibold text-slate-100">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">
                        {option.note}
                      </span>
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-100">
              Сценарий или задача
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="form-field resize-none"
              placeholder="Например: внутренний поиск по базе знаний, сервис-деск, документы, контакт-центр, on-prem, требования ИБ."
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Отправляем..." : "Запросить демо"}
          </button>
          <a
            href="mailto:sales@unica.local"
            className="text-sm text-[var(--muted-strong)] underline decoration-white/10 underline-offset-4 hover:text-white"
          >
            Или написать напрямую: sales@unica.local
          </a>
        </div>

        <p
          className={`mt-5 text-sm leading-6 ${
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
