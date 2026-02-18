import { IonIcon } from "@ionic/react";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { TEXTS } from "../../shared/config";
import { cn, getSocialIcon, getStrapiImageUrl } from "../../shared/lib";
import {
  useAbout,
  useEmployees,
  useSocialNetworks,
} from "../../shared/lib/hooks";
import {
  ErrorState,
  LoadingState,
  PageWithRefresher,
  TeamMemberCard,
} from "../../shared/ui";

const AboutPage: React.FC = () => {
  const {
    data: aboutResponse,
    isLoading: isLoadingAbout,
    isError: isErrorAbout,
    refetch: refetchAbout,
  } = useAbout();
  const {
    data: employees,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
    refetch: refetchEmployees,
  } = useEmployees();
  const {
    data: socialNetworks,
    isLoading: isLoadingSocials,
    isError: isErrorSocials,
    refetch: refetchSocials,
  } = useSocialNetworks();

  const isLoading = isLoadingAbout || isLoadingEmployees || isLoadingSocials;
  const isError = isErrorAbout || isErrorEmployees || isErrorSocials;

  const handleRetry = React.useCallback(() => {
    refetchAbout();
    refetchEmployees();
    refetchSocials();
  }, [refetchAbout, refetchEmployees, refetchSocials]);

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={handleRetry} />
      </PageWithRefresher>
    );
  }

  const aboutData = aboutResponse?.data;
  const officeImage = aboutData?.img?.url;

  return (
    <PageWithRefresher>
      {officeImage && (
        <img
          alt="Офис"
          className="mb-6 h-52 w-full rounded-2xl object-cover shadow-md"
          src={getStrapiImageUrl(officeImage)}
        />
      )}
      <section className="mb-6">
        {aboutData?.address && (
          <>
            <h3 className="mb-2 font-bold text-slate-800">{TEXTS.address}</h3>
            <p className="text-sm text-slate-600">{aboutData.address}</p>
          </>
        )}
        {aboutData?.numbers && aboutData.numbers.length > 0 && (
          <>
            <h3 className="mb-2 mt-3 font-bold text-slate-800">
              {TEXTS.phone}
            </h3>
            {aboutData.numbers.map((number) => (
              <p key={number.id} className="text-sm text-slate-600">
                {number.phoneNumber}
                {number.name && ` - ${number.name}`}
                {number.post && ` (${number.post})`}
              </p>
            ))}
          </>
        )}
        {aboutData?.description && (
          <p className="mt-3 text-sm text-slate-600">{aboutData.description}</p>
        )}
      </section>
      {socialNetworks && socialNetworks.length > 0 && (
        <section className="mb-4">
          <div className="flex gap-4">
            {socialNetworks.map((social) => {
              const icon = getSocialIcon(social.socialType);
              return (
                <a
                  key={social.id}
                  aria-label={social.name || social.socialType || ""}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    "bg-blue-600 text-white",
                  )}
                  href={social.url || "#"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IonIcon className="text-xl" icon={icon} />
                </a>
              );
            })}
          </div>
        </section>
      )}
      {employees && employees.length > 0 && (
        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-800">
            {TEXTS.our_people}
          </h3>
          <Swiper
            breakpoints={{
              320: { slidesPerView: 2.5 },
              640: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
            }}
            className="overflow-visible!"
            grabCursor
            resistance
            resistanceRatio={0.85}
            slidesPerView={2.5}
            spaceBetween={14}
            touchEventsTarget="container"
          >
            {employees.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </PageWithRefresher>
  );
};

export { AboutPage };
