import { IonButton, IonIcon } from "@ionic/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { call } from "ionicons/icons";
import * as React from "react";
import { useForm } from "react-hook-form";

import { TEXTS } from "../../shared/config";
import { cn } from "../../shared/lib";

import { contactFormSchema, type ContactFormValues } from "./contactFormSchema";

const PHONE_HREF = `tel:${TEXTS.contact_phone}`;

export interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
    const {
      formState: { errors },
      handleSubmit,
      register,
      reset,
    } = useForm<ContactFormValues>({
      defaultValues: { fullName: "", phone: "" },
      resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = React.useCallback(
      (_data: ContactFormValues) => {
        // TODO: отправка на бэкенд, показать toast при успехе
        reset();
      },
      [reset],
    );

    return (
      <div
        className={cn(
          "contact-form-card relative w-full mt-[18px] mx-auto overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:max-w-xl sm:p-8",
          className,
        )}
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:m-0!  text-slate-900 sm:text-3xl">
          {TEXTS.contact_form_title}
        </h2>
        <p className="mb-6 text-base flex gap-1 text-slate-600 text-center items-center justify-center flex-wrap">
          {TEXTS.contact_form_or_call}

          <a
            className="font-semibold text-[#2563eb] underline decoration-[#2563eb]/80 hover:decoration-[#2563eb]"
            href={PHONE_HREF}
          >
            {TEXTS.contact_phone}
          </a>
        </p>

        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-4 ">
            <div className="flex flex-col gap-1.5">
              <input
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition-[border-color,box-shadow]",
                  "border-slate-200 placeholder:text-slate-400",
                  "focus:border-[#6B7EE1] focus:ring-2 focus:ring-[#6B7EE1]/20",
                  errors.fullName &&
                    "border-red-400 focus:border-red-400 focus:ring-red-400/20",
                )}
                placeholder={TEXTS.contact_form_full_name_placeholder}
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <input
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition-[border-color,box-shadow]",
                  "border-slate-200 placeholder:text-slate-400",
                  "focus:border-[#6B7EE1] focus:ring-2 focus:ring-[#6B7EE1]/20",
                  errors.phone &&
                    "border-red-400 focus:border-red-400 focus:ring-red-400/20",
                )}
                placeholder={TEXTS.contact_form_phone_placeholder}
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-sm text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center ">
            <IonButton size="large" type="submit" className="w-full">
              {TEXTS.contact_form_submit}
            </IonButton>
            <p className="text-sm leading-relaxed text-slate-500 text-center m-0">
              {TEXTS.contact_form_privacy_text}{" "}
              <a
                className="whitespace-nowrap text-[#2563eb] underline decoration-[#2563eb]/80 hover:decoration-[#2563eb]"
                href="#"
              >
                {TEXTS.contact_form_privacy_link}
              </a>
            </p>
          </div>
        </form>
      </div>
    );
};

ContactForm.displayName = "ContactForm";

export { ContactForm };
