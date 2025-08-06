"use client";

import { useLanguage } from "@/components/language-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast, Toaster } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const { messages } = useLanguage();

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
        toast.success(messages.contact.success || "Mensagem enviada com sucesso!");
        reset();
      } else {
        toast.error("Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro na requisição. Tente novamente.");
    }
  };

  return (
    <>
      {/* Toaster no bottom-right com z-index 9999 */}
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: { zIndex: 9999 },
        }}
      />

      <section id="contact" className="section_contact">
        <div className="section_title">
          <h3>{messages.contact.title}</h3>
        </div>

        <form className="contact_form" onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(errors).length > 0 && (
            <div className="empty_notice text-red-500 text-sm mb-4">
              <span>{messages.contact.error || "Por favor, preencha os campos obrigatórios!"}</span>
            </div>
          )}

          <div className="items_wrap">
            <div className="items">
              {/* Nome */}
              <div className="item half">
                <Label htmlFor="name" className="sr-only">
                  {messages.contact.name}
                </Label>
                <div className="input_wrapper">
                  <Input
                    id="name"
                    placeholder={`${messages.contact.name} *`}
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="item half">
                <Label htmlFor="email" className="sr-only">
                  {messages.contact.email}
                </Label>
                <div className="input_wrapper">
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${messages.contact.email} *`}
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Telefone */}
              <div className="item">
                <Label htmlFor="phone" className="sr-only">
                  Phone
                </Label>
                <div className="input_wrapper">
                  <Input
                    id="phone"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                </div>
              </div>

              {/* Mensagem */}
              <div className="item">
                <Label htmlFor="message" className="sr-only">
                  {messages.contact.message}
                </Label>
                <div className="input_wrapper">
                  <Textarea
                    id="message"
                    placeholder={messages.contact.message}
                    {...register("message")}
                    rows={5}
                    className="resize-none"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
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
                    : messages.contact.send}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};


// import { useLanguage } from "@/components/language-context";

// export const ContactSection = () => {
//   const { messages } = useLanguage();

//   return (
//     <section id="contact" className="section_contact">
//       <div className="section_title">
//         <h3>{messages.contact.title}</h3>
//       </div>
//       <form className="contact_form" action="/" method="post" data-email="frenifyteam@gmail.com">
//         <div
//           className="success"
//           data-success="Your message has been received, we will contact you soon."
//         ></div>
//         <div className="empty_notice">
//           <span>Please Fill Required Fields!</span>
//         </div>
//         <div className="items_wrap">
//           <div className="items">
//             <div className="item half">
//               <div className="input_wrapper">
//                 <input id="name" type="text" placeholder={`${messages.contact.name} *`} />
//               </div>
//             </div>
//             <div className="item half">
//               <div className="input_wrapper">
//                 <input id="email" type="email" placeholder={`${messages.contact.email} *`} />
//               </div>
//             </div>
//             <div className="item">
//               <div className="input_wrapper">
//                 <input id="phone" type="text" placeholder="Phone" />
//               </div>
//             </div>
//             <div className="item">
//               <div className="input_wrapper">
//                 <textarea id="message" placeholder={messages.contact.message}></textarea>
//               </div>
//             </div>
//             <div className="item">
//               <a id="send_message" href="#">
//                 {messages.contact.send}
//               </a>
//             </div>
//           </div>
//         </div>
//       </form>
//     </section>
//   );
// };
