---
title: "UCIe in practice: what changes for your PHY team"
description: "A chiplet link is not a SerDes with a shorter channel. What a UCIe PHY team actually owns: bump maps, forwarded clocks, lane repair, sideband and the package."
date: 2026-09-15
author: "[NAME: to be supplied]"
authorRole: "Technical lead, SerDes and high-speed I/O"
area: ucie
tags: ["UCIe", "chiplets", "die-to-die", "PHY"]
readingMinutes: 7
---

Teams that have shipped SerDes often assume a die-to-die PHY is the same job with an easier channel. The channel is easier. Almost everything else moves.

## What the specification actually hands you

UCIe splits a chiplet link into three layers. The protocol layer carries PCIe, CXL or a raw streaming mode. The die-to-die adapter handles link state, CRC and retry. The physical layer, which is what a PHY team owns, has two halves: the electrical analog front-end with its forwarded clock, and the logical PHY that runs training, lane repair, scrambling and the sideband.

Two package classes set the design envelope. In a standard package on an organic substrate, bump pitch is in the order of a hundred micrometres and a module is sixteen lanes wide. In an advanced package on a silicon bridge or interposer, bump pitch drops to the tens of micrometres and a module is sixty-four lanes wide. Per-lane data rates are defined in steps from a few GT/s to the low tens of GT/s. The raw bit-error-rate target is strict at the lower rates and relaxed at the top rates, where the adapter's CRC and retry are expected to carry the difference. Check the revision your program targets for the exact tables; they have changed between revisions and will again.

## It is a parallel bus with a forwarded clock

The first mental shift: a UCIe module is source-synchronous. Each module forwards a clock alongside its data lanes. There is no clock and data recovery per lane and, in the common configurations, no equalization. The receiver samples with a clock that travelled the same package route as the data.

That removes a CDR and a DFE from every lane. It adds a skew budget across sixteen or sixty-four lanes that the package, the bump map and the on-die routing all eat into. Per-lane deskew, duty-cycle correction on the forwarded clock and a clean clock-to-data training sequence become the critical analog items. The skew budget belongs on the first page of the architecture document, with the package team's name on it.

## The bump map is the floorplan

In a SerDes, the pad ring is a constraint. In a UCIe PHY, the bump map is the design. Shoreline bandwidth, the data rate you get per millimetre of die edge, is fixed by bump pitch, lanes per module and modules per edge. The analog front-end has to fit under its own bumps, with routing that keeps lane-to-lane skew inside the budget.

Practical consequences:

- ESD structures are sized to the package class. Advanced packages allow reduced charged-device-model targets, which means smaller pad capacitance and a lighter driver. Do not carry over the SerDes pad ring.
- Supply and ground bump assignment decides simultaneous-switching noise across a module. Simulate a full module switching, not one lane.
- The PHY's aspect ratio is dictated by the shoreline. Expect a long, thin block with the clock path running the length of it.

## Lane repair is part of the PHY

Advanced-package assembly yield is not perfect. The specification includes redundant lanes and a repair mechanism so that a module with a bad bump still trains. The repair multiplexers sit in the data path and add load to every lane. They have to be in the timing and skew budget from day one, and the repair logic has to be verified together with the analog front-end, not as a separate RTL block.

## Sideband is the control plane

A low-rate sideband interface, with its own forwarded clock and its own always-on supply domain, carries link initialization, parameter exchange and management traffic. It is simple electrically and demanding architecturally: it has to work before the main band is trained, during power states when the main band is off, and across dies that may have been designed by different teams. Treat it as a product in its own right with its own test plan.

## Verification without a compliance board

A SerDes gets a compliance board and a channel you can measure. A chiplet link only exists once two dies are assembled. Verification leans on package-extracted S-parameters, on full-module simulation with crosstalk and supply noise, and on interoperability planning with whoever builds the other die. If both dies are yours, plan a known-good-die test strategy early. If one is a partner's, agree the interop test matrix before tape-out, not after assembly.

## What to settle before schematics start

1. Package class, bump pitch and the bump map owner.
2. Modules per edge and the shoreline bandwidth target.
3. Data rate per lane and the BER target that goes with it.
4. Skew budget split between die and package.
5. Repair strategy and the assembly yield assumption behind it.
6. Sideband power domain and what must work with the main band off.
7. Who builds the other die, and how the two will be tested together.

A PHY team that has these seven answers in writing has done most of the architecture work. The circuit design that follows is demanding but familiar: drivers, receivers, a clean clock tree and a layout that respects the bump map.

[AUTHOR NOTE: add a short paragraph with specific figures from a delivered UCIe PHY once approved for publication.]
