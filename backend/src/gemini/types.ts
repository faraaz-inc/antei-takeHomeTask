import { SchemaType } from "@google/generative-ai";

//schema for structured output of gemini
export const schema = {
    description: "Resume Overview - Education Details",
    type: SchemaType.OBJECT,
    properties: {
        name: {
            description: "Name of the candidate",
            type: SchemaType.STRING
        },
        contactDetails: {
            description: "Contact details of the candidate, including email and phone number",
            type: SchemaType.OBJECT,
            properties: {
                phone: {
                    description: "Phone number of the candidate",
                    type: SchemaType.STRING
                },
                email: {
                    description: "Email address of the candidate",
                    type: SchemaType.STRING
                }
            }
        },
        education: {
            description: "brief details about the education of the candidate. Including the degree (e.g., Bachelor of technology, Bachelor of Science etc.), course (e.g., computer engineering, electrical engineering etc.), university name, graduation date and start date",
            type: SchemaType.STRING
        },
        experience: {
            description: "A brief information of the work experience of the candidate, the no. of years of experience the candidate has, and the names of companies the candidate has worked for.",
            type: SchemaType.STRING
        },
        projects: {
            description: "A brief information of the projects the candidate has worked on, the technologies used in the project and a very short summary of what the project is about. Separate two projects using a comma and boldify the project title",
            type: SchemaType.STRING
        },
        skills: {
            description: "List of skills mentioned in the resume, usually separated by commas or | character. Ignore any ctegorization of the skills in resume",
            type: SchemaType.ARRAY,
            items: {
                description: "Skill name, usually a single word or short phrase",
                type: SchemaType.STRING
            }
        },
    }
}


export interface GeminiOutput {
    name: string;
    contactDetails: {
        phone: string;
        email: string;
    };
    education: string;
    experience: string;
    projects: string;
    skills: string[];
}