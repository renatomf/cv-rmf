"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLanguage } from "@/components/language-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const { messages } = useLanguage();

  const errorMessages: Record<string, string> = {
    name: messages.contact.nameRequired || "Por favor, informe seu nome",
    email: messages.contact.emailInvalid || "E-mail inválido",
    message:
      messages.contact.messageRequired || "Por favor, escreva uma mensagem",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("https://formspree.io/f/xanblwyr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          messages.contact.success || "Mensagem enviada com sucesso!",
          {
            icon: <FaCheckCircle style={{ color: "#0bafac" }} />,
            style: {
              border: "1px solid black",
              color: "black",
            },
          }
        );
        reset();
      } else {
        toast.error(
          messages.contact.errorSending ||
            "Erro ao enviar o formulário. Tente novamente.",
          {
            icon: <FaTimesCircle style={{ color: "#e02424" }} />,
            style: {
              border: "1px solid #e02424",
              color: "#e02424",
            },
          }
        );
      }
    } catch (error) {
      toast.error(
        messages.contact.errorRequest || "Erro na requisição. Tente novamente."
      );
    }
  };

  return (
    <section id="contact" className="section_contact">
      <div className="section_title">
        <h3>{messages.contact.title || "Contato"}</h3>
      </div>
      <form
        className="contact_form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {Object.keys(errors).length > 0 && (
          <div className="empty_notice text-red-500 text-sm mb-4" role="alert">
            <span>
              {messages.contact.error ||
                "Por favor, preencha os campos obrigatórios!"}
            </span>
          </div>
        )}

        <div className="items_wrap">
          <div className="items">
            {/* Nome */}
            <div className="item half">
              <Label htmlFor="name" className="sr-only">
                {messages.contact.name || "Nome"}
              </Label>
              <div className="input_wrapper">
                <Input
                  id="name"
                  placeholder={`${messages.contact.name || "Nome"} *`}
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="!text-destructive text-xs mt-1"
                    role="alert"
                  >
                    {errorMessages["name"]}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="item half">
              <Label htmlFor="email" className="sr-only">
                {messages.contact.email || "E-mail"}
              </Label>
              <div className="input_wrapper">
                <Input
                  id="email"
                  type="email"
                  placeholder={`${messages.contact.email || "E-mail"} *`}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="!text-destructive text-xs mt-1"
                    role="alert"
                  >
                    {errorMessages["email"]}
                  </p>
                )}
              </div>
            </div>

            {/* Telefone */}
            <div className="item">
              <Label htmlFor="phone" className="sr-only">
                {messages.contact.phone || "Telefone"}
              </Label>
              <div className="input_wrapper">
                <Input
                  id="phone"
                  placeholder={messages.contact.phone || "Telefone"}
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="item">
              <Label htmlFor="message" className="sr-only">
                {messages.contact.message || "Mensagem"}
              </Label>
              <div className="input_wrapper">
                <Textarea
                  id="message"
                  placeholder={messages.contact.message || "Mensagem"}
                  {...register("message")}
                  rows={5}
                  className="resize-none"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="!text-destructive text-xs mt-1"
                    role="alert"
                  >
                    {errorMessages["message"]}
                  </p>
                )}
              </div>
            </div>

            {/* Botão */}
            <div className="item">
              <Button
                variant="send"
                id="send_message"
                type="submit"
                className="section_contact"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? messages.contact.sending || "Enviando..."
                  : messages.contact.send || "Enviar"}
              </Button>
            </div>
            <div className="h-12" />
          </div>
        </div>
      </form>
    </section>
  );
};
