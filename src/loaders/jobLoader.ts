import axios from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import { z } from "zod";

const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.string(),
  company: z.object({
    name: z.string(),
    description: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
  }),
});

export type jobSchemaTypeDef = z.infer<typeof jobSchema>;

const jobLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    if (typeof params.id === "string") {
      const res = await axios.get("/api/jobs/".concat(params.id));

      const validate = jobSchema.parse(res.data);

      return validate;
    }
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

export default jobLoader;
