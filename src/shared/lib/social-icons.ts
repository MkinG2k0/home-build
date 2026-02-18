import {
  logoDiscord,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoPinterest,
  logoReddit,
  logoSnapchat,
  logoTiktok,
  logoTwitter,
  logoVk,
  logoWhatsapp,
  logoYoutube,
  paperPlaneOutline,
} from "ionicons/icons";

import type { StrapiSocialNetworkAttributes } from "../model";

export const getSocialIcon = (
  socialType: StrapiSocialNetworkAttributes["socialType"],
): string => {
  switch (socialType) {
    case "telegram":
      return paperPlaneOutline;
    case "vk":
      return logoVk;
    case "whatsapp":
      return logoWhatsapp;
    case "facebook":
      return logoFacebook;
    case "twitter":
      return logoTwitter;
    case "instagram":
      return logoInstagram;
    case "linkedin":
      return logoLinkedin;
    case "youtube":
      return logoYoutube;
    case "tiktok":
      return logoTiktok;
    case "snapchat":
      return logoSnapchat;
    case "pinterest":
      return logoPinterest;
    case "reddit":
      return logoReddit;
    case "discord":
      return logoDiscord;
    default:
      return paperPlaneOutline;
  }
};
