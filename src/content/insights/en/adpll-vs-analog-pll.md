---
title: "ADPLL vs analog PLL: choosing for your next node"
description: "A decision guide for choosing between an analog charge-pump PLL and an all-digital PLL: node, jitter target, spurs, area, portability and verification flow."
date: 2026-08-20
author: "[NAME: to be supplied]"
authorRole: "Technical lead, PLL/ADPLL and DDR PHY"
area: pll-adpll
tags: ["PLL", "ADPLL", "clocking", "jitter", "FinFET"]
readingMinutes: 8
---

The question arrives in every SoC planning meeting at an advanced node: do we keep the analog PLL we know, or move to an all-digital PLL? The honest answer depends on six things, and only one of them is phase noise.

## What each architecture is

An analog PLL compares reference and divided output in a phase-frequency detector, pumps charge into a passive loop filter, and tunes a voltage-controlled oscillator. The loop filter is a large capacitor. The VCO is an LC tank for low phase noise or a ring for small area and wide range. Fractional-N operation comes from a delta-sigma modulated divider.

An all-digital PLL replaces the detector and filter with a time-to-digital converter, or a single-bit bang-bang detector, feeding a digital loop filter. The oscillator becomes a digitally controlled oscillator: an LC tank with switched capacitor banks, or a ring with digital tuning. A delta-sigma dither on the fine capacitor bank smooths the frequency steps. The loop filter is synthesized logic. Only the TDC and the DCO remain analog.

## The six questions

### 1. Which node?

Below roughly 16 nm, the case for an ADPLL strengthens. Thin-oxide leakage makes a large analog loop-filter capacitor a liability. Charge-pump mismatch gets worse with lower supply headroom, and that mismatch is what makes reference spurs. Digital logic, meanwhile, is cheap and shrinks with every node. At 28 nm and above, a well-designed analog PLL remains compact and predictable, and the ADPLL's extra complexity buys less.

### 2. What jitter target, and where does it come from?

For a SerDes reference at [NUMBER: to be supplied] fs integrated jitter, the oscillator dominates. An LC DCO and an LC VCO in the same node achieve similar phase noise; the tank quality factor and the supply regulation matter more than which loop sits around it. The ADPLL adds a quantization noise floor from the TDC resolution that appears in-band. A fine TDC, or a bang-bang detector with the right loop gain, keeps it below the oscillator's contribution. If the budget is tight and the loop bandwidth is wide, the TDC becomes the design problem.

For a general-purpose SoC clock at a few picoseconds of jitter, either architecture is comfortable. Choose on area and portability.

### 3. What spur specification?

Analog PLL reference spurs come from charge-pump mismatch and leakage modulating the VCO control line. They are bounded by layout discipline and supply isolation and are hard to calibrate away. ADPLL spurs come from DCO quantization, dither tones and digital switching coupling into the oscillator. These are different problems. The digital ones respond to dither design and floorplanning; the analog ones respond to charge-pump design and loop-filter leakage control. Know which spur budget you have before choosing.

### 4. How much area?

The analog loop filter is usually the largest single item in an analog PLL at an advanced node. Moving it into logic removes it. The DCO capacitor banks add back some area, and the TDC is not free. Net, an ADPLL is typically smaller at FinFET nodes and roughly equal at planar nodes. [NUMBER: to be supplied] is a representative comparison from our own work, available under NDA.

### 5. Will this block move to another node?

An ADPLL's loop filter and calibration are RTL. They port with a synthesis run. The DCO and TDC are small analog blocks with clear interfaces. An analog PLL ports as a whole: charge pump, filter, VCO, bias and divider all need re-centering. If the roadmap has a second node within two years, the ADPLL's portability is worth real money.

### 6. Can your team verify it?

An ADPLL is a mixed-signal system. Its loop dynamics, lock behaviour and spur performance only show up when the RTL and the analog DCO run together. That needs a mixed-signal co-simulation flow, a behavioural model of the DCO that matches extraction, and engineers who are comfortable on both sides of the boundary. An analog PLL is verified with PSS/Pnoise and transient-noise simulation in one tool. If the team and flow are analog-only, the ADPLL's advantages can be eaten by a verification gap.

## The hybrid middle

Two designs sit between the extremes. A sub-sampling PLL keeps an analog loop but samples the VCO directly, removing the divider noise and lowering in-band noise. An analog PLL with digital calibration of the VCO band, loop bandwidth and charge-pump offset recovers much of the ADPLL's robustness without the TDC. Both are worth a look when the jitter target is aggressive and the node is planar.

## A decision table

| If your program has… | Lean towards |
| --- | --- |
| FinFET node, roadmap to a second node | ADPLL |
| Planar node, no port planned | Analog PLL |
| Sub-100 fs reference for SerDes, wide loop bandwidth | Either, with an LC oscillator; verify the TDC floor |
| Tight reference-spur budget, analog-only verification flow | Analog PLL with digital calibration |
| Area-constrained die at an advanced node | ADPLL |
| Many instances with different bandwidths | ADPLL (programmable filter) |

The right choice is usually clear once these six answers are on the table. The wrong choice is to decide by habit.

[AUTHOR NOTE: add measured figures from a delivered ADPLL and analog PLL once approved for publication.]
