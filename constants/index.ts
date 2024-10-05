import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import signUpCar from "@/assets/images/signup-car.png";

import ellipsis from "@/assets/icons/ellipsis.png";
import copy from "@/assets/icons/copy.png";
import write from "@/assets/icons/write.png";
import bin from "@/assets/icons/bin.png";
import key from "@/assets/icons/key.png";
import eye from "@/assets/icons/eye.png";
import calender from "@/assets/icons/calender.png";
import add from "@/assets/icons/add.png";
import recycle from "@/assets/icons/recycle.png";

//SafeAuth onboarding images
import passwordManager from "@/assets/images/password-manager.jpg";
import endToEnd from "@/assets/images/end-to-end.jpg";
import twoFactor from "@/assets/images/two-factor-authentication.jpg";
import passwordGenerator from "@/assets/images/password-generator.jpg";
import zeroKnowledge from "@/assets/images/zero-knowledge-policy.jpg";

export const images = {
  passwordManager,
  endToEnd,
  twoFactor,
  passwordGenerator,
  zeroKnowledge,
  getStarted,
  signUpCar,
  check,
};

export const icons = {
  add,
  arrowDown,
  arrowUp,
  backArrow,
  bin,
  checkmark,
  close,
  calender,
  copy,
  ellipsis,
  email,
  eye,
  eyecross,
  key,
  google,
  home,
  list,
  recycle,
  lock,
  person,
  pin,
  profile,
  search,
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
