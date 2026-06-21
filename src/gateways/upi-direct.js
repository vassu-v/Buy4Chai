export const gatewayCapabilities = {
  supportsCustomAmount: true,
  requiresPresetLinks: false,
  verificationType: "none",
  tier: 3,
};

export function getUPIUrl(amount, config) {
  const pa = config.upi?.id || '';
  const pn = config.upi?.name || config.name;
  const tn = 'Support ' + config.name;
  const cu = 'INR';

  return `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&am=${amount}&tn=${encodeURIComponent(tn)}&cu=${cu}`;
}
