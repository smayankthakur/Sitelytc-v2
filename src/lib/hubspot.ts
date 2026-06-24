import type { ProjectType } from "@/lib/validation";

const HUBSPOT_BASE = "https://api.hubapi.com";

/** Owns: lead CRM, deal pipelines, newsletter. Never payments or calendar. */

type LeadInput = {
  name: string;
  email: string;
  company?: string;
  projectType: ProjectType;
  budget: number;
  message: string;
};

function authHeaders(key: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
}

/**
 * Create/update a contact and open a deal in the Agency Leads pipeline.
 * No-ops (with a warning) if HUBSPOT_API_KEY is not set, so dev still works.
 */
export async function createHubSpotContact(data: LeadInput): Promise<void> {
  const key = process.env.HUBSPOT_API_KEY;
  if (!key) {
    console.warn("[hubspot] HUBSPOT_API_KEY not set — skipping CRM sync.");
    return;
  }

  const [firstname, ...rest] = data.name.split(" ");
  const lastname = rest.join(" ");

  // 1. Create/update the contact.
  const contactRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(key),
    body: JSON.stringify({
      properties: {
        firstname,
        lastname,
        email: data.email,
        company: data.company,
        hs_lead_status: "NEW",
      },
    }),
  });

  // 409 = contact already exists; that's fine, continue to the deal.
  if (!contactRes.ok && contactRes.status !== 409) {
    throw new Error(`HubSpot contact failed: ${contactRes.status}`);
  }

  // 2. Open a deal in the Agency Leads pipeline.
  const dealRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
    method: "POST",
    headers: authHeaders(key),
    body: JSON.stringify({
      properties: {
        dealname: `${data.name} — ${data.projectType} project`,
        pipeline: process.env.HUBSPOT_AGENCY_PIPELINE_ID ?? "default",
        dealstage: process.env.HUBSPOT_AGENCY_STAGE_ID ?? "appointmentscheduled",
        amount: String(data.budget),
        description: data.message,
      },
    }),
  });

  if (!dealRes.ok) {
    throw new Error(`HubSpot deal failed: ${dealRes.status}`);
  }
}

/** Add an email to the newsletter (separate list, not a pipeline deal). */
export async function subscribeToNewsletter(email: string): Promise<void> {
  const key = process.env.HUBSPOT_API_KEY;
  if (!key) {
    console.warn("[hubspot] HUBSPOT_API_KEY not set — skipping newsletter.");
    return;
  }

  const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(key),
    body: JSON.stringify({
      properties: { email, hs_lead_status: "NEW", lifecyclestage: "subscriber" },
    }),
  });

  if (!res.ok && res.status !== 409) {
    throw new Error(`HubSpot newsletter failed: ${res.status}`);
  }
}

/** Kritvia waitlist signup → Kritvia Leads pipeline (separate from agency). */
export async function createKritviaLead(data: {
  name: string;
  email: string;
  automation: string;
}): Promise<void> {
  const key = process.env.HUBSPOT_API_KEY;
  if (!key) {
    console.warn("[hubspot] HUBSPOT_API_KEY not set — skipping Kritvia lead.");
    return;
  }

  const [firstname, ...rest] = data.name.split(" ");
  const lastname = rest.join(" ");

  const contactRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: authHeaders(key),
    body: JSON.stringify({
      properties: {
        firstname,
        lastname,
        email: data.email,
        hs_lead_status: "NEW",
        lifecyclestage: "lead",
      },
    }),
  });

  if (!contactRes.ok && contactRes.status !== 409) {
    throw new Error(`HubSpot Kritvia contact failed: ${contactRes.status}`);
  }

  const dealRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
    method: "POST",
    headers: authHeaders(key),
    body: JSON.stringify({
      properties: {
        dealname: `${data.name} — Kritvia waitlist`,
        pipeline: process.env.HUBSPOT_KRITVIA_PIPELINE_ID ?? "default",
        dealstage: process.env.HUBSPOT_KRITVIA_STAGE_ID ?? "appointmentscheduled",
        description: `Would automate first: ${data.automation}`,
      },
    }),
  });

  if (!dealRes.ok) {
    throw new Error(`HubSpot Kritvia deal failed: ${dealRes.status}`);
  }
}
