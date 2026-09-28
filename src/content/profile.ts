export type Profile = {
  name: string;
  role: string;
  summary: string;
  links: { email?: string; phone?: string; github?: string; linkedin?: string; cvPath?: string };
};

export const profile: Profile = {
  name: "Aleksandar Mandić",
  role: "Frontend Engineer",
  summary: "React, TypeScript, enterprise and e-commerce interfaces.",
  links: {
    email: "aleksandar.mndc@gmail.com",
    phone: "+381653781461",
    github: "https://github.com/AlexMandic6",
    linkedin: "https://www.linkedin.com/in/aleksandar-mandic-95a2b01bb/",
    cvPath: "/Aleksandar_Mandic_CV.pdf",
  },
};
