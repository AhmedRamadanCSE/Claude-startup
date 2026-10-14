---
title: "Porting a SerDes to a new node without losing a quarter"
description: "What changes when a transceiver moves between process nodes, where ports go wrong, and a plan that treats the port as a design project with a head start."
date: 2026-07-10
author: "[NAME: to be supplied]"
authorRole: "Technical lead, SerDes and high-speed I/O"
area: serdes
tags: ["SerDes", "IP porting", "process migration", "FinFET"]
readingMinutes: 7
---

A SerDes port looks like the cheapest project on the roadmap. The architecture is proven, the schematics exist, the layout has been through silicon. Then the schedule slips by a quarter because the port was treated as a copy. Here is what changes, where ports fail and how to plan one so the quarter stays yours.

## What actually changes between nodes

**Devices.** Threshold voltages, transconductance efficiency and transit frequency all move. A slicer that had margin at the old node may not resolve the same input at the new one. Current-mode logic that was fast enough may now burn too much, or not be fast enough at the lower supply.

**Supply.** A step from, say, 0.9 V to 0.75 V removes headroom from every stacked structure: cascoded current sources, source-followers, CML buffers with tail currents. The bias scheme that worked becomes marginal at the slow corner.

**Metal stack.** Thin lower metals get more resistive; top metals change thickness and pitch. Inductors re-center. The clock distribution's RC changes, which changes skew between lanes and between TX and RX. Long signal routes that were fine now need re-buffering.

**ESD.** The protection targets stay the same; the device capacitance per unit of protection does not. Pad capacitance moves, and with it the bandwidth of the TX and RX termination network.

**Rules.** Density, double patterning, minimum-area and antenna rules all change. Layout that was clean cannot simply be scaled.

**Passives.** Metal-oxide-metal capacitors, resistors and varactors have different density, matching and voltage coefficients. The loop filter and the CTLE's RC network re-center.

## Where ports go wrong

- **Scaling the layout.** Geometric scaling ignores the metal stack, the rules and the ESD. It produces a layout that fails DRC and a clock tree with the wrong skew.
- **Copying bias ratios.** Current mirrors sized by ratio at the old supply saturate at the new one. Every bias point needs re-centering, not re-scaling.
- **Trusting the old jitter budget.** PLL phase noise, supply sensitivity and the CDR's tracking all move. Re-run the jitter budget with the new node's oscillator and buffers before touching schematics.
- **Forgetting the pads.** The termination network, ESD and bump or pad capacitance set the channel's first discontinuity. Re-simulate return loss with the new pad model, early.
- **Verifying at the end.** A port verified only after layout discovers the headroom problem when there is no time left to fix it.

## A plan that keeps the quarter

**Weeks 0 to [NUMBER: to be supplied]: gap analysis.** Characterize the new node's devices in the configurations the design uses. Re-run the link, jitter and power budgets with new-node models. Build a checklist of every block, with a verdict: reuse, re-center or re-architect. Deliver the checklist and a revised schedule. This phase is short and decides everything that follows.

**Weeks [NUMBER: to be supplied] to [NUMBER: to be supplied]: re-architect what the gap analysis flagged.** Typically the bias scheme, the clock distribution, the ESD and termination network, and sometimes the oscillator. These are small blocks with large consequences.

**Weeks [NUMBER: to be supplied] to [NUMBER: to be supplied]: re-center and re-layout.** Critical paths first: TX driver, CTLE, slicers, phase interpolators, clock buffers. Non-critical blocks are laid out in parallel. Every block is simulated post-layout at the worst corner before the next one starts.

**Final weeks: sign-off and the delta report.** Full post-layout extraction, DRC/LVS/antenna/density clean, and a delta report that puts old-node and new-node results side by side for every specification line. The delta report is what lets the integration team trust the port without re-reading the original verification.

## Re-use what you can

Testbenches, corner setups, measurement scripts and the compliance test plan port almost unchanged. So do the architecture document and the calibration algorithm. Reusing the verification infrastructure is where the real head start is, not in the layout.

## The one-line version

A port is a design project that starts with a proven architecture and a complete verification plan. Budget it like one, and the quarter stays on your roadmap.

[AUTHOR NOTE: add a short description of a delivered port with node, data rate and schedule once approved for publication.]
