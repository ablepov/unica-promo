import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { leadSchema } from "@/lib/lead-schema";
import { getResend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const payload = leadSchema.parse(await request.json());

    console.info("unica:lead", payload);

    if (
      process.env.RESEND_API_KEY &&
      process.env.LEADS_TO_EMAIL &&
      process.env.LEADS_FROM_EMAIL
    ) {
      await getResend().emails.send({
        from: process.env.LEADS_FROM_EMAIL,
        to: [process.env.LEADS_TO_EMAIL],
        subject: `Новая заявка с лендинга Unica — ${payload.company}`,
        html: `
          <h2>Новая заявка с лендинга Unica</h2>
          <p><strong>Имя:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Компания:</strong> ${escapeHtml(payload.company)}</p>
          <p><strong>Модель поставки:</strong> ${escapeHtml(payload.deliveryModel)}</p>
          <p><strong>Контакт:</strong> ${escapeHtml(payload.contact)}</p>
          <p><strong>Описание:</strong></p>
          <p>${escapeHtml(payload.message ?? "Не указано").replaceAll("\n", "<br />")}</p>
        `,
      });
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error:
            "Форма ещё не подключена к получателю заявок. Заполните env для Resend.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Проверьте поля формы." },
        { status: 400 },
      );
    }

    console.error("unica:lead:error", error);
    return NextResponse.json(
      { error: "Не удалось обработать заявку. Попробуйте позже." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
