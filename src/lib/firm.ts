export const FIRM = {
  name: "Machaya & Associates Legal Practitioners",
  short: "Machaya & Associates",
  subtitle: "Legal Practitioners",
  domain: "machayaaandassociates.co.zw",
  url: "https://machayaaandassociates.co.zw",
  address: {
    line1: "No. 7 Eastcourt Road",
    line2: "Belvedere, Harare, Zimbabwe",
    full: "No. 7 Eastcourt Road, Belvedere, Harare, Zimbabwe",
  },
  phone: {
    display: "(0242) 711381",
    tel: "+263242711381",
  },
  landlines: [
    { display: "(0242) 711381", tel: "+263242711381" },
  ],
  callNumbers: [
    { display: "0773 809 453", tel: "+263773809453" },
    { display: "0772 922 333", tel: "+263772922333" },
    { display: "0775 019 230", tel: "+263775019230" },
  ],
  whatsapp: [
    { display: "0772 990 567", intl: "263772990567" },
    { display: "0717 515 465", intl: "263717515465" },
  ],
  emails: {
    primary: "machayalawyers@machayaassociates.co.zw",
    alternates: [
      "deemachaya@gmail.com",
      "kchimiti@gmail.com",
      "mmakuva@gmail.com",
      "bridgetchapepa@gmail.com",
    ].filter((email, index, list) => email && list.indexOf(email) === index && email !== "machayalawyers@machayaassociates.co.zw"),
  },
};

export const waLink = (
  number: string = FIRM.whatsapp[0].intl,
  message = "Hello Machaya & Associates, I would like to request a legal consultation."
) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const mailto = (
  to: string = FIRM.emails.primary,
  subject = "Legal Consultation Request",
  body?: string
) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}${ 
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export const TEAM = [
  {
    name: "Dambudzo Machaya",
    role: "Founder & Legal Practitioner",
    group: "Legal Team",
    initials: "DM",
    bio: "Founding legal practitioner of Machaya & Associates Legal Practitioners, with experience drawn from both public and private legal practice in Zimbabwe.",
  },
  {
    name: "Kenias Chimiti",
    role: "Associate, Legal Practitioner",
    group: "Legal Team",
    initials: "KC",
    bio: "Associate at the firm, advising clients across civil, commercial, and dispute resolution matters.",
  },
  {
    name: "Moffat Makuvatsine",
    role: "Associate, Legal Practitioner",
    group: "Legal Team",
    initials: "MM",
    bio: "Associate at the firm, contributing to the firm's litigation, advisory, and transactional work.",
  },
  {
    name: "Bridget T. Chapepa",
    role: "Associate, Legal Practitioner",
    group: "Legal Team",
    initials: "BC",
    bio: "Associate at the firm, working across the firm's broad civil, family, and commercial practice areas.",
  },
  {
    name: "Viola Mhaka",
    role: "Graduate Trainee",
    group: "Graduate Trainees",
    initials: "VM",
    bio: "Graduate trainee supporting the firm's legal research, drafting, client service, and practice administration work.",
  },
  {
    name: "Elina Matsika",
    role: "Graduate Trainee",
    group: "Graduate Trainees",
    initials: "EM",
    bio: "Graduate trainee supporting the firm's legal research, drafting, client service, and practice administration work.",
  },
  {
    name: "Glennrose Hakunavanhu",
    role: "Company Secretary",
    group: "Administration",
    initials: "GH",
    bio: "Company secretary supporting office administration, client correspondence, records, and internal coordination.",
  },
  {
    name: "Lloyd Kanjoka",
    role: "Company Clerk",
    group: "Administration",
    initials: "LK",
    bio: "Company clerk assisting with office support, documentation, records, and day-to-day administrative duties.",
  },
];
