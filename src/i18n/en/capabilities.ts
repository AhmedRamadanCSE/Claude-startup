import { SITE } from '../../site.config.ts';

export type FigureKind = 'eye' | 'ddr' | 'pll' | 'ble' | 'ucie' | 'ams';

export interface Capability {
  slug: string;
  /** Short name used in navigation and cards. */
  name: string;
  /** One-line summary used on cards. */
  short: string;
  /** Three concrete specs for the home-page card. Placeholders where numbers are pending. */
  summarySpecs: readonly string[];
  keywords: readonly string[];
  figure: FigureKind;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string };
  problems: readonly { title: string; body: string }[];
  specs: readonly { label: string; value: string }[];
  deliverables: readonly string[];
  nodes: string;
  verification: readonly string[];
  cta: { title: string; body: string };
}

const nodesPlaceholder = '[NODES: process nodes delivered in this area, to be supplied]';

export const capabilities: readonly Capability[] = [
  {
    slug: 'serdes',
    name: 'High-speed SerDes',
    short: 'NRZ and PAM4 transceivers for PCIe, Ethernet, USB and JESD-class links.',
    summarySpecs: [
      'NRZ and PAM4 to [DATA RATE: to be supplied] Gb/s per lane',
      'TX FFE, RX CTLE + [NUMBER: to be supplied]-tap DFE, [CDR: baud-rate or oversampled] CDR',
      'Protocols: [PROTOCOLS: to be supplied, e.g. PCIe 4.0/5.0, USB 3.2, 10/25G Ethernet, JESD204B/C]',
    ],
    keywords: ['SerDes design services', 'high-speed SerDes', 'PAM4 transceiver design', 'PCIe PHY design', 'analog IC design services'],
    figure: 'eye',
    seo: {
      title: `SerDes Design Services: NRZ & PAM4 | ${SITE.name}`,
      description:
        'High-speed SerDes design services: transmitter, receiver, CDR and clocking for PCIe, Ethernet, USB and JESD-class links, from link budget through layout, compliance simulation and silicon correlation.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'High-speed SerDes design services',
      lede: 'Transmitter, receiver, clock and data recovery and clocking for serial links from [NUMBER: to be supplied] to [NUMBER: to be supplied] Gb/s per lane. We take a link from channel model and architecture through layout, extraction, compliance simulation and silicon correlation.',
    },
    problems: [
      {
        title: 'Closing the link budget on a lossy channel',
        body: 'A channel with [NUMBER: to be supplied] dB of loss at Nyquist leaves little margin. We partition equalization between TX FFE, RX CTLE and DFE from a measured or modeled channel, then verify eye height and width against the protocol mask across PVT with statistical and time-domain simulation.',
      },
      {
        title: 'Meeting the jitter budget at the worst corner',
        body: 'TX random and deterministic jitter, PLL phase noise and CDR tracking bandwidth are budgeted together. The clock path is designed so the TX jitter specification holds at the slow-hot corner with supply noise applied, not only at typical.',
      },
      {
        title: 'Compliance, not just function',
        body: 'Transmitter eye, return loss, de-emphasis levels, receiver jitter tolerance and stressed-eye tests are simulated per the specification before tape-out. The compliance lab should confirm the design, not discover it.',
      },
      {
        title: 'Power per bit',
        body: 'For a target of [NUMBER: to be supplied] pJ/bit at [DATA RATE: to be supplied] Gb/s we trade slicer count, CTLE bandwidth, clocking architecture and supply domains against the channel. Margin is spent where the channel needs it, not everywhere.',
      },
      {
        title: 'Porting a transceiver to a new node',
        body: 'Moving a SerDes from [NODE: to be supplied] to [NODE: to be supplied] changes device models, the metal stack, ESD and supplies. We re-plan the clocking and ESD, re-simulate the budget and re-layout the critical paths rather than scaling the old layout.',
      },
    ],
    specs: [
      { label: 'Data rate per lane', value: '[NUMBER: to be supplied] Gb/s' },
      { label: 'Modulation', value: 'NRZ, PAM4' },
      { label: 'Channel loss supported', value: '[NUMBER: to be supplied] dB at Nyquist' },
      { label: 'Equalization', value: 'TX [NUMBER: to be supplied]-tap FFE; RX CTLE + [NUMBER: to be supplied]-tap DFE' },
      { label: 'Clock recovery', value: '[CDR ARCHITECTURE: to be supplied, e.g. baud-rate phase-interpolator CDR]' },
      { label: 'TX random jitter', value: '[NUMBER: to be supplied] fs RMS' },
      { label: 'RX jitter tolerance', value: 'Per [PROTOCOL: to be supplied] mask with [NUMBER: to be supplied] UI margin' },
      { label: 'Energy efficiency', value: '[NUMBER: to be supplied] pJ/bit' },
      { label: 'Lanes per macro', value: '[NUMBER: to be supplied]' },
      { label: 'Supplies', value: '[VOLTAGES: to be supplied] V' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'Architecture document with link budget, jitter budget and power estimate',
      'Behavioral models: Verilog-A/AMS; IBIS-AMI models for channel simulation',
      'Schematics with testbenches and corner setups',
      'Layout GDS, DRC/LVS/antenna/density clean, with ESD and latch-up review',
      'Post-layout extracted results across PVT corners',
      'Verification report: eye diagrams, jitter decomposition, BER bathtub, return loss',
      'Calibration and adaptation specification (RTL where in scope)',
      'LEF/LIB, pin list, integration guide and package/PCB guidelines',
      'Characterization and compliance test plan; bring-up support',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'Statistical eye and BER analysis with the channel S-parameters',
      'Transient simulation with supply noise and crosstalk aggressors',
      'PSS/Pnoise and transient-noise jitter analysis of the clock path',
      'Monte Carlo on slicers, CTLE and phase interpolators',
      'Post-layout extraction (RC and inductance where relevant) at all corners',
    ],
    cta: {
      title: 'Discuss a SerDes block or port',
      body: 'Send the protocol, data rate, node and channel. A SerDes lead will come back with questions and a first view of the budget.',
    },
  },
  {
    slug: 'ddr-phy',
    name: 'DDR / LPDDR PHY',
    short: 'DDR4, DDR5, LPDDR4X and LPDDR5/5X PHYs: I/O, clocking, data paths, training and DFI.',
    summarySpecs: [
      'DDR4/DDR5, LPDDR4X/LPDDR5(X) to [DATA RATE: to be supplied] Mb/s per pin',
      'Write leveling, read gate, DQ/CA eye centering and Vref training',
      'Per-bit deskew, ZQ calibration and ODT; DFI [VERSION: to be supplied]',
    ],
    keywords: ['DDR PHY design', 'LPDDR5 PHY design services', 'DDR5 PHY', 'memory interface PHY', 'mixed-signal design services'],
    figure: 'ddr',
    seo: {
      title: `DDR & LPDDR PHY Design Services | ${SITE.name}`,
      description:
        'DDR4, DDR5, LPDDR4X and LPDDR5/5X PHY design services: I/O cells, DLL/PLL clocking, DQ/DQS and CA data paths, calibration and training, delivered with a DFI interface, LEF/LIB and SI/PI analysis.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'DDR and LPDDR PHY design services',
      lede: 'The analog and mixed-signal side of a memory interface: I/O cells, DLL and PLL clocking, DQ/DQS and CA data paths, calibration and training, delivered with the DFI interface your controller expects.',
    },
    problems: [
      {
        title: 'Timing closure at [DATA RATE: to be supplied] Mb/s per pin',
        body: 'At high data rates the unit interval leaves [NUMBER: to be supplied] ps for everything. We budget DLL/PLL jitter, per-bit skew, duty-cycle distortion and ISI, then design the delay lines and deskew so the budget closes with margin at the slow corner.',
      },
      {
        title: 'Training that converges on real boards',
        body: 'Write leveling, read-gate training, read and write eye centering and Vref training are specified and verified against board-level SI models, so the sequence converges across the PVT, package and board variation you will ship.',
      },
      {
        title: 'Impedance and termination',
        body: 'Driver impedance, ODT and ZQ calibration are designed against the package and board stack-up, with return-loss and crosstalk analysis from a 3D-extracted model.',
      },
      {
        title: 'Low-power states with fast exit',
        body: 'Self-refresh, deep sleep and fast wake-up are built into the clocking and I/O from the start, with exit-latency budgets and retention of training results.',
      },
      {
        title: 'Integration with your controller',
        body: 'A clean DFI [VERSION: to be supplied] interface, LEF/LIB and timing models, and an integration guide that your SoC team can use without us in the room.',
      },
    ],
    specs: [
      { label: 'Standards', value: 'DDR4, DDR5, LPDDR4X, LPDDR5, LPDDR5X [SUPPORTED: to be confirmed per standard]' },
      { label: 'Data rate', value: '[NUMBER: to be supplied] Mb/s per pin' },
      { label: 'Channel width', value: 'x16 / x32 / x64 [CONFIGURATIONS: to be supplied]' },
      { label: 'Training', value: 'Write leveling, read gate, read/write eye centering, DQ and CA Vref' },
      { label: 'Calibration', value: 'ZQ, ODT, per-bit deskew, duty-cycle correction' },
      { label: 'I/O supply', value: '[VOLTAGE: to be supplied] V' },
      { label: 'Controller interface', value: 'DFI [VERSION: to be supplied]' },
      { label: 'Energy efficiency', value: '[NUMBER: to be supplied] pJ/bit' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'PHY architecture and timing budgets',
      'I/O cells: drivers, receivers, ODT and ESD strategy',
      'DLL/PLL, clock distribution and per-bit deskew',
      'Training and calibration sequence specification (RTL where in scope)',
      'Layout GDS, LEF/LIB and timing models; DRC/LVS clean',
      'SI/PI analysis with package and board models',
      'Verification report across PVT; DFI interface checks',
      'Bring-up and margining plan for first silicon',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'Timing budget verification with extracted delay lines across PVT',
      'SI/PI co-simulation with package and board models',
      'Training convergence simulation with skew and Vref variation',
      'Duty-cycle and jitter analysis of the clock tree',
      'Mixed-signal co-simulation of the training sequence with the PHY AFE',
    ],
    cta: {
      title: 'Discuss a DDR or LPDDR PHY',
      body: 'Tell us the standard, data rate, width, node and package. A PHY lead will respond with a resourcing plan and the questions we need answered first.',
    },
  },
  {
    slug: 'pll-adpll',
    name: 'PLL and ADPLL',
    short: 'Analog and all-digital PLLs for SoC clocking, SerDes references and RF synthesis.',
    summarySpecs: [
      'Integer-N and fractional-N analog PLLs, [FREQUENCY RANGE: to be supplied] GHz',
      'ADPLL (TDC + DCO) with integrated jitter [NUMBER: to be supplied] fs RMS',
      'Reference spurs below [NUMBER: to be supplied] dBc; lock in [NUMBER: to be supplied] µs',
    ],
    keywords: ['PLL design services', 'ADPLL design', 'all-digital PLL', 'fractional-N PLL design', 'low-jitter PLL'],
    figure: 'pll',
    seo: {
      title: `Low-Jitter PLL & ADPLL Design Services | ${SITE.name}`,
      description:
        'PLL and ADPLL design services: integer-N and fractional-N analog PLLs and all-digital PLLs (TDC + DCO) for SoC clocking, SerDes references and RF synthesis, specified in jitter, spurs, lock time and power.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'PLL and ADPLL design services',
      lede: 'Integer-N and fractional-N analog PLLs, and all-digital PLLs built on a time-to-digital converter and a digitally controlled oscillator. Specified in integrated jitter, spurs, lock time and power, delivered with the phase-noise model and timing views your integration team needs.',
    },
    problems: [
      {
        title: 'Sub-[NUMBER: to be supplied] fs jitter for a SerDes reference',
        body: 'The integrated jitter budget is set by the VCO or DCO phase noise, the loop bandwidth and the reference. We optimize all three together and verify with transient-noise and PSS/Pnoise simulation at every corner.',
      },
      {
        title: 'Fractional-N without the spurs',
        body: 'Delta-sigma modulator order, dithering and phase-detector linearity are chosen together to keep fractional spurs below the target. Quantization-noise cancellation is applied where the specification needs it.',
      },
      {
        title: 'Fast, deterministic lock',
        body: 'Duty-cycled systems need lock in [NUMBER: to be supplied] µs. We design the acquisition aids, frequency calibration and loop-bandwidth switching so that lock time is deterministic, not statistical.',
      },
      {
        title: 'ADPLL for portability and area',
        body: 'An all-digital loop filter and a calibrated DCO port cleanly between nodes and shrink in advanced processes. We deliver the digital part as RTL and the analog part as layout with a clear, documented interface between them.',
      },
      {
        title: 'Deterministic phase relationships',
        body: 'Multiple PLLs that must stay phase-aligned, spread-spectrum clocking for EMI and glitch-free output switching are handled at the architecture level, not patched after layout.',
      },
    ],
    specs: [
      { label: 'Architectures', value: 'Integer-N, fractional-N (ΔΣ), ADPLL (TDC + DCO) [OTHERS: e.g. sub-sampling, to be confirmed]' },
      { label: 'Output frequency', value: '[RANGE: to be supplied] GHz' },
      { label: 'Reference frequency', value: '[RANGE: to be supplied] MHz' },
      { label: 'Integrated RMS jitter', value: '[NUMBER: to be supplied] fs ([INTEGRATION BAND: to be supplied, e.g. 12 kHz – 20 MHz])' },
      { label: 'Reference spur', value: '< [NUMBER: to be supplied] dBc' },
      { label: 'Fractional spurs', value: '< [NUMBER: to be supplied] dBc' },
      { label: 'Lock time', value: '< [NUMBER: to be supplied] µs' },
      { label: 'Power', value: '[NUMBER: to be supplied] mW at [FREQUENCY: to be supplied] GHz' },
      { label: 'Area', value: '[NUMBER: to be supplied] mm²' },
      { label: 'Spread spectrum', value: '[SSC: to be confirmed, e.g. down-spread 0.5 %]' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'Architecture document: loop design, noise budget and phase-noise model',
      'Behavioral model (Verilog-A/AMS) with phase-noise and jitter prediction',
      'Schematics, testbenches and corner setups',
      'Layout GDS, DRC/LVS clean, with supply and substrate isolation review',
      'ADPLL: digital loop filter and calibration RTL with verification',
      'LEF/LIB and timing views; integration guide',
      'Verification report: phase noise, jitter, spurs and lock time across PVT',
      'Silicon correlation and characterization plan',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'PSS/Pnoise phase-noise simulation of VCO/DCO, dividers and buffers',
      'Transient-noise jitter simulation of the closed loop',
      'Lock-time and stability analysis across loop-bandwidth settings',
      'Spur analysis with supply ripple and substrate coupling',
      'Mixed-signal co-simulation of ADPLL RTL with the analog DCO',
    ],
    cta: {
      title: 'Discuss a PLL or ADPLL',
      body: 'Send the output frequency range, reference, jitter and spur targets, and the node. A clocking lead will reply with an architecture proposal and a noise budget outline.',
    },
  },
  {
    slug: 'bluetooth-ble',
    name: 'Bluetooth / BLE RF transceivers',
    short: '2.4 GHz Bluetooth Low Energy radios: LNA to PA, synthesizer and the analog modem path.',
    summarySpecs: [
      'Bluetooth LE 5.x: LE 1M, LE 2M, LE Coded [SUPPORTED: to be confirmed]',
      'RX sensitivity [NUMBER: to be supplied] dBm at [NUMBER: to be supplied] mA; TX [NUMBER: to be supplied] dBm',
      'Integrated PA and LNA, fractional-N synthesizer with two-point modulation',
    ],
    keywords: ['Bluetooth RF IC design', 'BLE transceiver design', 'RF IC design services', '2.4 GHz radio design', 'RFIC design Egypt'],
    figure: 'ble',
    seo: {
      title: `Bluetooth & BLE RF Transceiver Design | ${SITE.name}`,
      description:
        'Bluetooth Low Energy RF transceiver design services: LNA, mixer, baseband filters and ADC, fractional-N synthesizer, PA and modulation path, designed against the Bluetooth Core Specification RF-PHY test cases.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'Bluetooth and BLE RF transceiver design services',
      lede: 'The RF and analog front-end of a Bluetooth Low Energy radio: LNA, mixer, baseband filters and ADC on receive; fractional-N synthesizer; PA and modulation path on transmit. Designed against the Bluetooth Core Specification RF-PHY test cases and your current budget.',
    },
    problems: [
      {
        title: 'Sensitivity at a current budget',
        body: 'Receive sensitivity of [NUMBER: to be supplied] dBm at [NUMBER: to be supplied] mA sets the noise figure and the ADC and filter partition. We choose the architecture (low-IF, zero-IF or sliding-IF) for the current target, not from habit.',
      },
      {
        title: 'Blocking and coexistence',
        body: 'In-band and out-of-band blocking, intermodulation and the co-channel test cases are simulated with the LNA, mixer and filter in one bench, so the receiver holds up next to a Wi-Fi radio on the same board.',
      },
      {
        title: 'Transmit mask and modulation accuracy',
        body: 'Frequency deviation, drift and the in-band emission mask depend on the synthesizer modulation bandwidth and PA linearity. We close them with two-point modulation and, where the budget needs it, PA pre-distortion.',
      },
      {
        title: 'Frequency accuracy over temperature',
        body: 'Crystal tolerance, temperature drift and AFC tracking are budgeted so the link stays within ±[NUMBER: to be supplied] ppm across the operating range.',
      },
      {
        title: 'Porting a radio to a new node',
        body: 'A radio port is a re-design of inductors, varactors, PA and ESD. We re-extract the passives with EM simulation and re-close the link budget rather than copy the schematic.',
      },
    ],
    specs: [
      { label: 'Standard', value: 'Bluetooth [VERSION: to be supplied] Low Energy; LE 1M / LE 2M / LE Coded [SUPPORTED: to be confirmed]' },
      { label: 'Frequency band', value: '2400 – 2483.5 MHz, 40 channels at 2 MHz spacing' },
      { label: 'RX sensitivity', value: '[NUMBER: to be supplied] dBm at LE 1M' },
      { label: 'RX current', value: '[NUMBER: to be supplied] mA at [VOLTAGE: to be supplied] V' },
      { label: 'TX output power', value: '[NUMBER: to be supplied] dBm in [NUMBER: to be supplied] dB steps' },
      { label: 'TX current', value: '[NUMBER: to be supplied] mA at 0 dBm' },
      { label: 'Synthesizer phase noise', value: '[NUMBER: to be supplied] dBc/Hz at [OFFSET: to be supplied] offset' },
      { label: 'Blocking', value: 'Per Core Specification RF-PHY test cases, [MARGIN: to be supplied] dB margin' },
      { label: 'Supply range', value: '[VOLTAGE RANGE: to be supplied] V' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'RF architecture and link budget: gain, NF, IIP3, phase noise and current',
      'System model of the RF front-end and analog modem path',
      'Schematics with RF testbenches: S-parameters, NF, IIP3, mask and modulation',
      'RF layout with EM-extracted passives; DRC/LVS clean',
      'Verification report across PVT and antenna impedance variation',
      'RF test plan mapped to Bluetooth RF-PHY test cases',
      'Bring-up, tuning and pre-qualification support',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'Harmonic-balance and PSS simulation of gain, NF, IIP3 and 1 dB compression',
      'EM extraction of inductors, transformers and the PA output network',
      'Modulation-accuracy simulation of the two-point modulation path',
      'Blocking and intermodulation test cases per the RF-PHY test specification',
      'Stability and isolation analysis across antenna impedance variation',
    ],
    cta: {
      title: 'Discuss a BLE radio',
      body: 'Send the target sensitivity, current, output power, node and the digital baseband you plan to pair it with. An RF lead will come back with an architecture proposal and a link budget.',
    },
  },
  {
    slug: 'ucie',
    name: 'UCIe die-to-die PHY',
    short: 'Universal Chiplet Interconnect Express PHYs for standard and advanced packaging.',
    summarySpecs: [
      'UCIe [VERSION: to be supplied, e.g. 1.1 / 2.0], standard (2D) and advanced (2.5D) package',
      '[NUMBER: to be supplied] GT/s per lane; x16 and x64 modules',
      'Bump pitch [NUMBER: to be supplied] µm; [NUMBER: to be supplied] pJ/bit',
    ],
    keywords: ['UCIe PHY design', 'die-to-die PHY', 'chiplet interconnect design', 'UCIe design services', 'D2D PHY'],
    figure: 'ucie',
    seo: {
      title: `UCIe Die-to-Die PHY Design Services | ${SITE.name}`,
      description:
        'UCIe die-to-die PHY design services for chiplet systems: transmitters, receivers, forwarded clocking, lane repair and sideband for standard and advanced packaging, co-designed with the bump map and package.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'UCIe PHY design services',
      lede: 'The physical layer of a chiplet link: transmitters, receivers, forwarded clocking, lane repair and sideband, for UCIe standard (2D) and advanced (2.5D) packaging. Designed with the bump map and the package in the loop from day one.',
    },
    problems: [
      {
        title: 'Data rate without equalization',
        body: 'UCIe channels are short by design and meant to work with little or no equalization. We budget the driver, receiver and clock path for [NUMBER: to be supplied] GT/s at the specified BER in standard package, where loss and crosstalk are set by the substrate, not the die.',
      },
      {
        title: 'Layout under the bump pitch',
        body: 'At [NUMBER: to be supplied] µm bump pitch the PHY floorplan is set by the bump map. We co-design bump assignment, ESD and routing with your package team so the PHY fits and the shoreline bandwidth closes.',
      },
      {
        title: 'Forwarded clocking and deskew',
        body: 'Per-lane deskew, clock-to-data training and duty-cycle correction are specified with the package skew budget so the link trains reliably across corners and assembly variation.',
      },
      {
        title: 'Lane repair and redundancy',
        body: 'Redundant lanes and the repair multiplexer are part of the PHY, not an afterthought. We design the repair logic and assess the yield impact against your assembly data.',
      },
      {
        title: 'Multi-module scaling',
        body: 'Modules are tiled along the die edge. We plan clocking, supply and sideband for the number of modules your bandwidth target needs, and keep the per-module interface identical.',
      },
    ],
    specs: [
      { label: 'Specification', value: 'UCIe [VERSION: to be supplied]' },
      { label: 'Package', value: 'Standard (2D) / Advanced (2.5D) [SUPPORTED: to be confirmed]' },
      { label: 'Data rate per lane', value: '[NUMBER: to be supplied] GT/s' },
      { label: 'Lanes per module', value: 'x16 (standard) / x64 (advanced)' },
      { label: 'Bump pitch', value: '[NUMBER: to be supplied] µm' },
      { label: 'Energy efficiency', value: '[NUMBER: to be supplied] pJ/bit' },
      { label: 'PHY latency', value: '[NUMBER: to be supplied] ns' },
      { label: 'Sideband', value: '[NUMBER: to be supplied] Mb/s' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'PHY architecture, link budget and bump-map proposal',
      'Analog front-end: TX drivers, receivers, forwarded clock path, PLL/DLL',
      'Lane repair, deskew and training specification (RTL where in scope)',
      'Sideband interface and power-management handshake',
      'Package co-design inputs: bump map, ESD and routing constraints',
      'Layout GDS and LEF/LIB; DRC/LVS clean',
      'Verification and compliance test plan; interoperability plan',
      'Bring-up and characterization support',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'Channel simulation with package-extracted S-parameters and crosstalk',
      'Timing-budget verification of the forwarded clock and deskew path',
      'Lane repair and training sequence co-simulation with the AFE',
      'Supply-noise and simultaneous-switching analysis across a full module',
      'Post-layout extraction and corner analysis',
    ],
    cta: {
      title: 'Discuss a UCIe PHY',
      body: 'Send the package type, bump pitch, bandwidth target and node. A PHY lead will reply with a module plan and the first set of package questions.',
    },
  },
  {
    slug: 'analog-mixed-signal',
    name: 'Other analog and mixed-signal',
    short: 'Data converters, power management, clocking, sensor front-ends and full-custom layout.',
    summarySpecs: [
      'ADC/DAC: [RESOLUTION: to be supplied] bit at [RATE: to be supplied] MS/s',
      'LDO, DC-DC and bandgap: [SPECS: to be supplied]',
      'Clocking, sensor front-ends and full-custom layout on your flow or ours',
    ],
    keywords: ['analog IC design services', 'mixed-signal design services', 'data converter design', 'power management IC design', 'full-custom layout services'],
    figure: 'ams',
    seo: {
      title: `ADC, DAC, PMIC & Mixed-Signal IC Design | ${SITE.name}`,
      description:
        'Analog and mixed-signal IC design services: SAR, pipelined and delta-sigma ADCs, DACs, LDOs, DC-DC converters, bandgap references, oscillators, sensor front-ends and full-custom layout.',
    },
    hero: {
      eyebrow: 'Capability',
      title: 'Analog and mixed-signal blocks',
      lede: 'The blocks that surround a PHY or a radio: converters, regulators, references, oscillators and sensor front-ends, plus full-custom layout for designs your own team owns.',
    },
    problems: [
      {
        title: 'Data converters',
        body: 'SAR, pipelined and delta-sigma ADCs; current-steering and resistor-string DACs. [RESOLUTION: to be supplied] bit at [RATE: to be supplied] MS/s with [NUMBER: to be supplied] ENOB, including calibration where the architecture needs it.',
      },
      {
        title: 'Power management',
        body: 'LDOs with [NUMBER: to be supplied] dB PSRR at [FREQUENCY: to be supplied] and [NUMBER: to be supplied] mV dropout; DC-DC buck and boost converters; bandgap references at [NUMBER: to be supplied] ppm/°C; power-on reset and brown-out detectors.',
      },
      {
        title: 'Clocking',
        body: 'Crystal oscillators, RC and ring oscillators, DLLs, duty-cycle correction, clock distribution and glitch-free multiplexing.',
      },
      {
        title: 'Sensor front-ends',
        body: 'Chopper-stabilized and instrumentation amplifiers, capacitance-to-digital and temperature sensing, bias generation and low-leakage switching.',
      },
      {
        title: 'Full-custom layout',
        body: 'Matched and high-speed analog layout, RF layout with EM extraction, DRC/LVS/ERC sign-off and EM/IR analysis, on your flow and PDK or in our isolated environment.',
      },
    ],
    specs: [
      { label: 'ADC', value: '[ARCHITECTURE: to be supplied] [RESOLUTION: to be supplied] bit, [RATE: to be supplied] MS/s, [NUMBER: to be supplied] ENOB' },
      { label: 'DAC', value: '[RESOLUTION: to be supplied] bit, [RATE: to be supplied] MS/s, [NUMBER: to be supplied] dB SFDR' },
      { label: 'LDO', value: 'PSRR [NUMBER: to be supplied] dB at [FREQUENCY: to be supplied]; dropout [NUMBER: to be supplied] mV; [NUMBER: to be supplied] mA' },
      { label: 'DC-DC', value: '[TOPOLOGY: to be supplied]; [NUMBER: to be supplied] % peak efficiency; [FREQUENCY: to be supplied] MHz switching' },
      { label: 'Bandgap', value: '[NUMBER: to be supplied] ppm/°C; [NUMBER: to be supplied] % untrimmed accuracy' },
      { label: 'Oscillators', value: '[TYPES: to be supplied]; [NUMBER: to be supplied] ppm' },
      { label: 'Process nodes', value: nodesPlaceholder },
    ],
    deliverables: [
      'Block specification and architecture note',
      'Schematics, testbenches and corner setups',
      'Layout GDS, DRC/LVS/ERC clean; LEF/LIB where applicable',
      'Post-layout verification report across PVT, with Monte Carlo where mismatch matters',
      'Behavioral models for top-level verification',
      'Characterization plan and bring-up support',
    ],
    nodes: nodesPlaceholder,
    verification: [
      'Corner and Monte Carlo analysis of offset, gain and linearity',
      'Stability and PSRR analysis of regulators across load and line',
      'Transient and periodic-steady-state analysis of oscillators',
      'Post-layout extraction with EM/IR analysis of supply routing',
    ],
    cta: {
      title: 'Discuss an analog or mixed-signal block',
      body: 'Send the specification, node and schedule. A lead will respond with questions and a scoping proposal.',
    },
  },
];

export const capabilitiesIndex = {
  seo: {
    title: `Capabilities: SerDes, DDR PHY, PLL, BLE, UCIe | ${SITE.name}`,
    description:
      'Analog, mixed-signal and RF IC design capabilities: high-speed SerDes, DDR/LPDDR PHY, PLL and ADPLL, Bluetooth/BLE RF transceivers, UCIe die-to-die PHYs, data converters, power management and full-custom layout.',
  },
  hero: {
    eyebrow: 'Capabilities',
    title: 'What we design',
    lede: 'Five areas where our leads have taped out production silicon, and the analog and mixed-signal blocks around them. Each page lists the problems we solve, the specifications we have delivered and exactly what you receive.',
  },
  coreLabel: 'Core expertise',
  otherLabel: 'Also in scope',
  howTitle: 'Common to every engagement',
  how: [
    { title: 'Specification first', body: 'No schematic starts before a written specification with corners, supplies, interfaces, test modes and acceptance criteria is signed off.' },
    { title: 'Verification you can audit', body: 'Every claim in the final report maps to a simulation setup you can re-run. Corner tables, not adjectives.' },
    { title: 'Tape-out and silicon', body: 'We stay through DRC/LVS sign-off, the tape-out review and silicon bring-up until the block meets its specification.' },
  ],
  cta: {
    title: 'Not sure which page fits your block?',
    body: 'Describe the block in a sentence. We will tell you who on the team should be on the call.',
  },
} as const;

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}
