// src/app/contact/sendEmail.ts
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const name = formData.get("name") as string;

  try {
    await resend.emails.send({
      from: "maarssen616@gmail.com",
      to: "maarssen616@gmail.com",
      subject: `Nieuw bericht van ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\nBericht:\n${message}`,
    });
    console.log("E-mail succesvol verzonden!");
  } catch (error) {
    console.error("Fout bij het verzenden van de e-mail:", error);
    throw new Error("E-mail kon niet worden verzonden");
  }
};
