/**
 * PCS 7 I/O Analyzer - Module Catalogue & MLFB Normalization
 * Contains physical and communication specifications for Siemens S7-300 / S7-400,
 * ET 200SP, ET 200M, ET 200S, ET 200iSP, ET 200SP HA/Ex, Axioline, SIMOCODE,
 * Danfoss & SINAMICS drives, PA field devices, and power/network infrastructure.
 */
(() => {
  'use strict';

  function normMlfb(s) {
    if (!s) return '';
    const m = String(s).match(/(6ES[0-9]|6DL1|6GK[0-9]|3RK1|3UF7|6SL[0-9])[ _]([0-9]{3})[-_]([0-9A-Z*]{5})[-_]([0-9A-Z*]{1,4})/i);
    if (m) return `${m[1].toUpperCase()} ${m[2]}-${m[3].toUpperCase()}-${m[4].toUpperCase()}`;
    return String(s).replace(/^[^:]*:/, '').replace(/\s+/g, ' ').trim();
  }

  const catalog = {
    // --- ET 200SP Digital Input ---
    '6ES7 131-6BF00-0BA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF00-0CA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF01-0BA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF00-0DA0': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6FD00-0BB1': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6FD01-0BB1': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },

    // --- ET 200SP Digital Output ---
    '6ES7 132-6BF00-0BA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF00-0CA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF01-0BA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF01-0CA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6GD50-0BA0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6GD51-0BA0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD00-0BB0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD00-0BB1': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD01-0BB1': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },

    // --- ET 200SP Analog Input ---
    '6ES7 134-6GB00-0BA1': { type: 'AI', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GD00-0BA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GD01-0BA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GF00-0AA1': { type: 'AI', channels: 8, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6HB00-0CA1': { type: 'AI', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6TD00-0CA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },

    // --- ET 200SP Analog Output ---
    '6ES7 135-6GB00-0BA1': { type: 'AO', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 135-6HB00-0CA1': { type: 'AO', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 135-6HD00-0BA1': { type: 'AO', channels: 4, family: 'ET 200SP', width: 'word' },

    // --- ET 200M (S7-300) ---
    '6ES7 321-1BH02-0AA0': { type: 'DI', channels: 16, family: 'ET 200M', width: 'bit' },
    '6ES7 321-1BL00-0AA0': { type: 'DI', channels: 32, family: 'ET 200M', width: 'bit' },
    '6ES7 322-1BH01-0AA0': { type: 'DO', channels: 16, family: 'ET 200M', width: 'bit' },
    '6ES7 322-1BL00-0AA0': { type: 'DO', channels: 32, family: 'ET 200M', width: 'bit' },
    '6ES7 323-1BH01-0AA0': { type: 'DI/DO', channels: 16, diChannels: 8, doChannels: 8, family: 'ET 200M', width: 'bit' },
    '6ES7 331-7KF02-0AB0': { type: 'AI', channels: 8, family: 'ET 200M', width: 'word' },
    '6ES7 331-7TF01-0AB0': { type: 'AI', channels: 8, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HB01-0AB0': { type: 'AO', channels: 2, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HD01-0AB0': { type: 'AO', channels: 4, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HF00-0AB0': { type: 'AO', channels: 8, family: 'ET 200M', width: 'word' },

    // --- ET 200S ---
    '6ES7 131-4BF00-0AA0': { type: 'DI', channels: 8, family: 'ET 200S', width: 'bit' },
    '6ES7 131-4FB00-0AB0': { type: 'DI', channels: 2, family: 'ET 200S', width: 'bit' },
    '6ES7 132-4HB01-0AB0': { type: 'DO', channels: 2, family: 'ET 200S', width: 'bit' },
    '6ES7 134-4GB11-0AB0': { type: 'AI', channels: 2, family: 'ET 200S', width: 'word' },

    // --- ET 200iSP ---
    '6ES7 131-7RF00-0AB0': { type: 'DI', channels: 8, family: 'ET 200iSP', width: 'bit' },
    '6ES7 132-7RD20-0AB0': { type: 'DO', channels: 4, family: 'ET 200iSP', width: 'bit' },
    '6ES7 134-7TD00-0AB0': { type: 'AI', channels: 4, family: 'ET 200iSP', width: 'word' },
    '6ES7 135-7TD00-0AB0': { type: 'AO', channels: 4, family: 'ET 200iSP', width: 'word' },

    // --- ET 200SP HA / Ex ---
    '6DL1 131-6BH00-0PH1': { type: 'DI', channels: 16, family: 'ET 200SP HA', width: 'bit' },
    '6DL1 131-6TD00-0HX1': { type: 'DI', channels: 4, family: 'ET 200SP Ex', width: 'bit' },
    '6DL1 132-6BH00-0PH1': { type: 'DO', channels: 16, family: 'ET 200SP HA', width: 'bit' },
    '6DL1 132-6TD00-0HX1': { type: 'DI', channels: 4, family: 'ET 200SP Ex', width: 'bit' },
    '6DL1 133-6PX00-0HW0': { type: 'OTHER', family: 'ET 200SP Ex PM E', isSystem: true },
    '6DL1 134-6AF00-0PH1': { type: 'AI', channels: 8, family: 'ET 200SP HA', width: 'word' },
    '6DL1 134-6TB00-0HX1': { type: 'AI', channels: 2, family: 'ET 200SP Ex', width: 'word' },

    // --- Axioline (Phoenix Contact) ---
    'AXL SE DI16/1': { type: 'DI', channels: 16, family: 'Axioline', width: 'bit' },
    'AXL F DI16 NAM XC 1F': { type: 'DI', channels: 16, family: 'Axioline', width: 'bit' },
    'AXL F AI8 1F': { type: 'AI', channels: 8, family: 'Axioline', width: 'word' },
    'AXL F AI8 HART XC 1F': { type: 'AI', channels: 8, family: 'Axioline', width: 'word' },

    // --- ET 200SP Motor Starters (3RK1) -> DEV ---
    '3RK1 308-0AB00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 0.3-1A HF' },
    '3RK1 308-0AC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 0.9-3A HF' },
    '3RK1 308-0AD00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 2.8-9A HF' },
    '3RK1 308-0AE00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 4.0-12A HF' },
    '3RK1 308-0BC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'RS 0.9-3A HF' },
    '3RK1 308-0DC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'F-DS 0.9-3A HF' },

    // --- SIMOCODE (3UF7) -> DEV ---
    '3UF7 011-1A*00-0': { type: 'DEV', family: 'SIMOCODE', devType: 'SIMOCODE pro V PN' },
    '3UF7 011-1A*00-1': { type: 'DEV', family: 'SIMOCODE', devType: 'SIMOCODE pro V PN GP' },

    // --- ET 200SP Energy Meter -> DEV ---
    '6ES7 134-6PA00-0BD0': { type: 'DEV', family: 'ET 200SP Energy Meter', devType: 'AI Energy Meter 400VAC' },
    '6ES7 134-6PA01-0BD0': { type: 'DEV', family: 'ET 200SP Energy Meter', devType: 'AI Energy Meter 400VAC ST' },

    // --- ET 200SP Communication PtP -> DEV ---
    '6ES7 137-6AA00-0BA0': { type: 'DEV', family: 'ET 200SP Comm', devType: 'CM PtP' },

    // --- System / Infrastructure / Non-Process (OTHER) ---
    '6ES7 193-6PA00-0AA0': { type: 'OTHER', family: 'ET 200SP Server Module', isSystem: true },
    '6ES7 193-6AR00-0AA0': { type: 'OTHER', family: 'ET 200SP BusAdapter', isSystem: true },
    '6ES7 133-6CV15-1AM0': { type: 'OTHER', family: 'ET 200SP BU Cover', isSystem: true },
    '6ES7 155-6AU00-0CN0': { type: 'OTHER', family: 'ET 200SP IM 155-6 PN ST', isSystem: true },
    '6ES7 155-6AU01-0CN0': { type: 'OTHER', family: 'ET 200SP IM 155-6 PN HF', isSystem: true },
    '6ES7 151-3AA23-0AB0': { type: 'OTHER', family: 'ET 200S IM 151-3 PN', isSystem: true },
    '6ES7 151-3BA23-0AB0': { type: 'OTHER', family: 'ET 200S IM 151-3 PN HF', isSystem: true },
    '6ES7 138-4CA01-0AA0': { type: 'OTHER', family: 'ET 200S PM-E DC24V', isSystem: true },
    '6ES7 138-4CB11-0AB0': { type: 'OTHER', family: 'ET 200S PM-E DC24..48V', isSystem: true },
    '6ES7 153-2BA70-0XB0': { type: 'OTHER', family: 'ET 200M IM 153-2 Redundancy', isSystem: true },
    '6ES7 153-4BA00-0XB0': { type: 'OTHER', family: 'ET 200M IM 153-4 PN HF', isSystem: true },
    '6DL1 155-6AU00-0PM0': { type: 'OTHER', family: 'ET 200SP HA IM 155-6 PN', isSystem: true },
    '6DL1 193-6AR00-0AA0': { type: 'OTHER', family: 'ET 200SP HA BusAdapter', isSystem: true },
    '6DL1 133-6PX00-0HW0': { type: 'OTHER', family: 'ET 200SP Ex PM-E', isSystem: true },
    '6ES7 158-3AD10-0XA0': { type: 'DEV', family: 'PN/PN Coupler', devType: 'PN/PN Coupler V4.2' },
    '6GK1 411-5BB00': { type: 'OTHER', family: 'PN/PB LINK HA', isSystem: true },
    '6GK1 411-5BB00-V40': { type: 'OTHER', family: 'PN/PB LINK HA', isSystem: true },
    '6ES7 400-1JA00-0AA0': { type: 'OTHER', family: 'S7-400 Rack UR2', isSystem: true },
    '6ES7 400-1JA11-0AA1': { type: 'OTHER', family: 'S7-400 Rack UR2', isSystem: true },
    '6ES7 400-2JA10-0AA0': { type: 'OTHER', family: 'S7-400 Rack CR3', isSystem: true },
    '6ES7 405-0KA02-0AA0': { type: 'OTHER', family: 'S7-400 PS 405 10A DC', isSystem: true },
    '6ES7 407-0KA02-0AA0': { type: 'OTHER', family: 'S7-400 PS 407 10A AC', isSystem: true },
    '6ES7 410-5HX08-0AB0': { type: 'OTHER', family: 'CPU 410-5H', isSystem: true },
    '6ES7 416-3ES06-0AB0': { type: 'OTHER', family: 'CPU 416-3 PN/DP', isSystem: true },
    '6ES7 960-1AA06-0XA0': { type: 'OTHER', family: 'H Sync module', isSystem: true },
    '6GK7 443-1EX30-0XE0': { type: 'OTHER', family: 'CP 443-1', isSystem: true },
    '6GK5 204-0BA00-2AF2': { type: 'OTHER', family: 'SCALANCE X204', isSystem: true },
    '6GK5 204-2BB10-2AA3': { type: 'OTHER', family: 'SCALANCE X204-2', isSystem: true },
    '6GK5 206-2BB00-2AC2': { type: 'OTHER', family: 'SCALANCE XC206-2', isSystem: true },
    '6GK5 206-2BS00-2AC2': { type: 'OTHER', family: 'SCALANCE XC206-2SFP', isSystem: true }
  };

  const exp = { normMlfb, catalog };
  if (typeof module !== 'undefined' && module.exports) module.exports = exp;
  if (typeof window !== 'undefined') window.PCS7Catalog = exp;
  if (typeof globalThis !== 'undefined') globalThis.PCS7Catalog = exp;
})();
