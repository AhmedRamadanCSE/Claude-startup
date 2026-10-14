import { SITE } from '../../site.config.ts';

export default {
  seo: {
    title: `Security & IP Protection for Design Services | ${SITE.name}`,
    description:
      'How we protect client IP: NDA-first process, isolated per-client design environments, named-engineer access control, licensed EDA tools only, no reuse of client IP, export-control screening, and data deletion at project end.',
  },
  hero: {
    eyebrow: 'Security and IP protection',
    title: 'Your IP stays yours. Here is how.',
    lede: 'Outsourcing analog design means sharing specifications, PDKs and sometimes your own IP. These are the controls we apply on every engagement. Each one can be audited.',
  },
  sections: [
    {
      id: 'nda',
      title: 'NDA-first process',
      body: 'No technical detail changes hands before a mutual NDA is signed. We will sign your paper or provide ours. Scoping calls, proposals and even node discussions happen after the NDA, not before.',
      items: [
        'Mutual NDA before any specification, PDK or design data is shared',
        'Named individuals under NDA, not the company in general',
        'NDA obligations survive the engagement for [NUMBER: to be supplied] years',
      ],
    },
    {
      id: 'environments',
      title: 'Isolated design environments',
      body: 'Each client gets a separate design environment. Projects never share a workspace, a file system or a license pool with another client.',
      items: [
        'Separate project servers or virtual machines per client, with separate storage',
        'Option to work entirely inside your environment over your VPN with no data leaving your network',
        'No personal devices on client data; no USB export; clipboard and transfer controls on client workstations',
        'Monitored and logged access; logs available to you on request',
      ],
    },
    {
      id: 'access',
      title: 'Access control',
      body: 'Access is granted to named engineers for the duration of their assignment and removed the day it ends.',
      items: [
        'Per-project access lists approved by the technical lead and the client',
        'Multi-factor authentication on every account',
        'Least privilege: engineers see only the project they are assigned to',
        'Quarterly access review; immediate revocation on reassignment',
      ],
    },
    {
      id: 'eda',
      title: 'Licensed EDA tools only',
      body: 'We use licensed, vendor-supported EDA tools on audited infrastructure. [EDA TOOLS: licensed tools and vendors to be supplied]. Where you prefer, we work on your licenses inside your environment.',
      items: [
        'Vendor-licensed tools with license records available for audit',
        'PDKs installed only under the foundry and client agreements that cover them',
        'No open-source or unlicensed tools on client designs without written approval',
      ],
    },
    {
      id: 'no-reuse',
      title: 'No reuse of client IP',
      body: 'Schematics, layouts, scripts, testbenches and results produced for you are yours. They are not reused, adapted or referenced on another engagement.',
      items: [
        'Deliverables assigned to the client on payment',
        'Our background IP, where used, is identified in the proposal and licensed to you for the delivered block',
        'Engineers are contractually bound not to carry client material between projects',
      ],
    },
    {
      id: 'export-control',
      title: 'Export-control compliance and customer screening',
      body: 'Semiconductor design is subject to export-control regimes. We screen every customer and engagement before work starts and decline work we cannot lawfully perform.',
      items: [
        'Screening of customers and end uses against applicable sanctions and export-control lists [REGIMES: to be confirmed by counsel, e.g. US EAR, EU dual-use regulation]',
        'Classification review of PDKs, tools and deliverables where licenses may apply',
        'Written compliance representations in every contract',
        '[COMPLIANCE CONTACT: name and role to be supplied] is the point of contact for compliance questions',
      ],
    },
    {
      id: 'data',
      title: 'Data handling and deletion at project end',
      body: 'At the end of an engagement, every file you shared and every file we produced is handed over, then deleted from our systems on your instruction.',
      items: [
        'Encrypted storage and transfer for all client data',
        'Complete hand-over of design data, scripts and documentation at project end',
        'Deletion of project data within [NUMBER: to be supplied] days of hand-over, with written confirmation',
        'Backups purged on the same schedule; retention only where you ask for it in writing',
      ],
    },
  ],
  audit: {
    title: 'Your security questionnaire, answered',
    body: 'We complete customer security questionnaires and support on-site or remote audits. [CERTIFICATIONS: list any certifications held or in progress, e.g. ISO/IEC 27001; otherwise leave this out]. Ask for our current security summary on the NDA call.',
  },
  cta: {
    title: 'Have a specific requirement?',
    body: `Send it to ${SITE.contact.salesEmail}, or raise it on the NDA call. We will tell you plainly whether we can meet it.`,
  },
} as const;
