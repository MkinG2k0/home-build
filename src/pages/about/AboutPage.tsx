import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { paperPlaneOutline, logoVk, logoWhatsapp } from "ionicons/icons";
import * as React from "react";

import { useAppStore } from "../../app/store";
import { TEXTS } from "../../shared/config";
import { TeamMemberCard } from "../../shared/ui";
import { cn } from "../../shared/lib";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800";
const SOCIALS = [
  { icon: paperPlaneOutline, label: "Telegram", href: "https://t.me/etalon" },
  { icon: logoVk, label: "VK", href: "https://vk.com/etalon" },
  { icon: logoWhatsapp, label: "WhatsApp", href: "https://wa.me/78001234567" },
] as const;

const AboutPage: React.FC = () => {
  const team = useAppStore((s) => s.team);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img
          alt="Офис"
          className="mb-6 h-52 w-full rounded-2xl object-cover shadow-md"
          src={OFFICE_IMAGE}
        />
        <section className="mb-6">
          <h3 className="mb-2 font-bold text-slate-800">{TEXTS.address}</h3>
          <p className="text-sm text-slate-600">
            г. Москва, ул. Примерная, 1, офис 100
          </p>
          <h3 className="mb-2 mt-3 font-bold text-slate-800">{TEXTS.phone}</h3>
          <p className="text-sm text-slate-600">+7 (800) 123-45-67</p>
          <p className="mt-3 text-sm text-slate-600">
            Ведущее агентство недвижимости. Помогаем с выбором квартир в
            новостройках от застройщика.
          </p>
        </section>
        <section className="mb-4">
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "bg-blue-600 text-white",
                )}
                href={s.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <IonIcon icon={s.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </section>
        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-800">
            {TEXTS.our_people}
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export { AboutPage };
