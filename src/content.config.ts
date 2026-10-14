import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Content collections are locale-scoped by folder: src/content/<collection>/<locale>/<slug>.md
 * The entry id is "<locale>/<slug>". Pages filter by locale and strip the prefix for the URL.
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string(),
    authorRole: z.string().optional(),
    area: z.enum(['serdes', 'ddr-phy', 'pll-adpll', 'bluetooth-ble', 'ucie', 'analog-mixed-signal', 'general']),
    tags: z.array(z.string()).default([]),
    readingMinutes: z.number().int().positive(),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    area: z.enum(['serdes', 'ddr-phy', 'pll-adpll', 'bluetooth-ble', 'ucie', 'analog-mixed-signal']),
    engagement: z.enum(['dedicated-team', 'fixed-scope-block', 'ip-porting', 'bring-up']),
    node: z.string(),
    duration: z.string(),
    clientType: z.string(),
    /** Headline metrics shown on the card. Use placeholders until approved. */
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).max(4).default([]),
    challenge: z.string(),
    role: z.string(),
    result: z.string(),
    order: z.number().int().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights, caseStudies };
