export interface job {
  id: number;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export interface JobFormData {
  type: "Full-Time" | "Part-Time" | "Remote" | "Internship";
  title: string;
  description: string;
  salary:
    | "Under $50K"
    | "$50K - 60K"
    | "$60K - 70K"
    | "$70K - 80K"
    | "$80K - 90K"
    | "$90K - 100K"
    | "$100K - 125K"
    | "$125K - 150K"
    | "$150K - 175K"
    | "$175K - 200K"
    | "Over $200K";
  location: string;
  company: string;
  company_description: string;
  contact_email: string;
  contact_phone?: string; // Optional since the field is marked as optional in the form
}
