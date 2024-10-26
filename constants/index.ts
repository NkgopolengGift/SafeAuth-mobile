import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import lock from "@/assets/icons/lock.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import check from "@/assets/images/check.png";

import copy from "@/assets/icons/copy.png";
import write from "@/assets/icons/write.png";
import bin from "@/assets/icons/bin.png";
import key from "@/assets/icons/key.png";
import eye from "@/assets/icons/eye.png";
import calender from "@/assets/icons/calendar.png";
import add from "@/assets/icons/add.png";
import recycle from "@/assets/icons/recycle.png";
import addIcon from "@/assets/icons/add-icon.png";
import settings from "@/assets/icons/setting.png";
import more from "@/assets/icons/more.png";
import user from "@/assets/icons/user.png";

//SafeAuth images
import passwordManager from "@/assets/images/password-manager.jpg";
import endToEnd from "@/assets/images/end-to-end.jpg";
import twoFactor from "@/assets/images/two-factor-authentication.jpg";
import passwordGenerator from "@/assets/images/password-generator.jpg";
import zeroKnowledge from "@/assets/images/zero-knowledge-policy.jpg";
import auth from "@/assets/images/auth.jpg";
import strongPass from "@/assets/images/strong-pass.jpg";

export const images = {
  auth,
  passwordManager,
  endToEnd,
  twoFactor,
  passwordGenerator,
  zeroKnowledge,
  strongPass,
  check,
};

export const icons = {
  add,
  addIcon,
  arrowDown,
  arrowUp,
  backArrow,
  bin,
  checkmark,
  close,
  calender,
  copy,
  email,
  eye,
  eyecross,
  key,
  google,
  home,
  more,
  recycle,
  lock,
  person,
  pin,
  profile,
  settings,
  search,
  user,
  write,
};

export const onboarding = [
  {
    id: 1,
    title: "Proven Privacy Practices",
    description: "Your data is safeguarded by cutting-edge privacy standards.",
    image: passwordManager,
  },
  {
    id: 2,
    title: "End-to-End Encryption",
    description:
      "Your passwords are encrypted and can only be accessed by you.",
    image: endToEnd,
  },
  {
    id: 3,
    title: "Two-Factor Authentication",
    description:
      "Enhance security with optional two-factor authentication (2FA) for an extra layer of protection.",
    image: twoFactor,
  },
  {
    id: 4,
    title: "Password Generator",
    description: "Generate strong, random passwords tailored to your needs.",
    image: passwordGenerator,
  },
  {
    id: 5,
    title: "Zero-Knowledge Policy",
    description:
      "We never have access to your password data. Only you control it.",
    image: zeroKnowledge,
  },
];
