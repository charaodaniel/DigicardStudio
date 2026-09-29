/**
 * Utilitários (antes em src/lib/utils.ts + analytics.ts).
 */

export function trackEvent(event, metadata) {
  // Placeholder para integração futura com API de analytics própria.
  console.log('[Analytics] Event:', event, metadata || '');
}

export function formatHref(type, value) {
  if (!value) return '#';
  const cleanValue = String(value).trim();

  if (cleanValue.startsWith('http') || cleanValue.startsWith('mailto:') || cleanValue.startsWith('tel:')) {
    return cleanValue;
  }

  switch (type) {
    case 'phone':
      return `tel:${cleanValue.replace(/\D/g, '')}`;
    case 'email':
      return `mailto:${cleanValue}`;
    case 'whatsapp': {
      const phone = cleanValue.replace(/\D/g, '');
      return `https://wa.me/${phone}`;
    }
    case 'instagram':
      return `https://instagram.com/${cleanValue.replace('@', '')}`;
    case 'linkedin':
      if (cleanValue.includes('linkedin.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://linkedin.com/in/${cleanValue}`;
    case 'github':
      return `https://github.com/${cleanValue}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleanValue.replace('@', '')}`;
    case 'youtube':
      if (cleanValue.includes('youtube.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://youtube.com/@${cleanValue}`;
    case 'spotify':
      if (cleanValue.includes('spotify.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://open.spotify.com/artist/${cleanValue}`;
    case 'facebook':
      if (cleanValue.includes('facebook.com')) return `https://${cleanValue.replace(/^https?:\/\//, '')}`;
      return `https://facebook.com/${cleanValue}`;
    case 'discord':
      if (cleanValue.startsWith('https://discord')) return cleanValue;
      return `https://discord.com/users/${cleanValue}`;
    default:
      return cleanValue.includes('.') ? `https://${cleanValue}` : '#';
  }
}

export async function shareCard(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Error sharing:', err);
      return { success: false };
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return { success: true, method: 'clipboard' };
  } catch (err) {
    console.error('Error copying to clipboard:', err);
    return { success: false };
  }
}

export function downloadVCard(cardData) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData.fullName}`,
    `ORG:${cardData.jobTitle}`,
    `TITLE:${cardData.jobTitle}`,
    `PHOTO;VALUE=URI:${cardData.avatarUrl}`,
    `NOTE:${String(cardData.bio || '').replace(/\n/g, ' ')}`,
    ...(cardData.links || []).map((l) => {
      const href = formatHref(l.type, l.value);
      if (l.type === 'phone' || l.type === 'whatsapp') return `TEL;TYPE=CELL:${l.value}`;
      if (l.type === 'email') return `EMAIL;TYPE=INTERNET:${l.value}`;
      return `URL;TYPE=${l.label.toUpperCase()}:${href}`;
    }),
    'END:VCARD',
  ].join('\n');

  triggerDownload(new Blob([vcard], { type: 'text/vcard' }), `${cardData.fullName.toLowerCase().replace(/\s/g, '-')}.vcf`);
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function imageToHighQualityBase64(url) {
  if (!url) return '';
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 1024 / Math.max(img.width, img.height);
        canvas.width = img.width * (scale < 1 ? scale : 1);
        canvas.height = img.height * (scale < 1 ? scale : 1);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(url);
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png', 1.0));
      };
      img.onerror = () => resolve(url);
      img.src = URL.createObjectURL(blob);
    });
  } catch (error) {
    console.warn('Erro ao processar imagem para Base64:', url);
    return url;
  }
}

function getContrastColor(hexcolor) {
  if (!hexcolor) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

function escapeXml(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function generatePhysicalCardSVG(cardData) {
  const w = 85;
  const h = 55;
  const gap = 5;

  const avatarBase64 = cardData.physicalShowAvatar ? await imageToHighQualityBase64(cardData.avatarUrl) : '';
  const qrBase64 = cardData.physicalShowQR ? await imageToHighQualityBase64(cardData.qrCodeUrl || '') : '';
  const textColor = getContrastColor(cardData.physicalBackgroundColor || '#ffffff');

  const baseSize = cardData.baseFontSize || 16;
  const fontName = cardData.fontFamily || 'Inter';

  const linkLines = (cardData.links || []).slice(0, 4).map((l, i) => `
        <text x="0" y="${i * 6}" class="small-label">${escapeXml(l.label.toUpperCase())}</text>
        <text x="0" y="${i * 6 + 3}" class="text" font-size="${(baseSize / 16) * 2.6}" font-weight="bold">${escapeXml(l.value)}</text>`).join('');

  return `
<svg width="${w * 2 + gap}mm" height="${h}mm" viewBox="0 0 ${w * 2 + gap} ${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="avatar-clip">
      <circle cx="65" cy="20" r="12" />
    </clipPath>
  </defs>
  <style>
    .cut { fill: none; stroke: #FF0000; stroke-width: 0.1; }
    .text { fill: ${textColor}; font-family: '${fontName}', Arial, sans-serif; }
    .label { fill: ${cardData.themeColor}; font-weight: bold; }
    .small-label { fill: ${textColor}; opacity: 0.5; font-size: 1.8px; font-weight: bold; }
  </style>

  <g id="front">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />

    ${cardData.physicalShowAvatar && avatarBase64 ? `
    <image xlink:href="${avatarBase64}" x="53" y="8" width="24" height="24" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" />
    <circle cx="65" cy="20" r="12.2" fill="none" stroke="${textColor}" stroke-width="0.3" opacity="0.2" />
    ` : ''}

    ${cardData.physicalShowTitle ? `
    <text x="6" y="12" class="text" font-size="${(baseSize / 16) * 5}" font-weight="900">${escapeXml(cardData.fullName.toUpperCase())}</text>
    <text x="6" y="17" class="label" font-size="${(baseSize / 16) * 2.5}" letter-spacing="0.5">${escapeXml(cardData.jobTitle.toUpperCase())}</text>
    ` : ''}

    ${cardData.physicalShowLinks ? `
    <g transform="translate(6, 26)">
      ${linkLines}
    </g>
    ` : ''}

    ${cardData.physicalShowFooter ? `
    <text x="${w / 2}" y="${h - 4}" class="text" font-size="1.5" text-anchor="middle" opacity="0.3" font-weight="bold" letter-spacing="0.8">
      ${escapeXml((cardData.customWebsiteUrl || 'WWW.DIGICARD.STUDIO').toUpperCase())} | ${escapeXml((cardData.footerText || 'PRODUCED BY DIGICARD').toUpperCase())}
    </text>
    ` : ''}
  </g>

  <g id="back" transform="translate(${w + gap}, 0)">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${cardData.physicalBackgroundColor || '#ffffff'}" />
    <rect class="cut" x="0" y="0" width="${w}" height="${h}" rx="2" />

    ${cardData.physicalShowQR && qrBase64 ? `
    <g transform="translate(${w / 2 - 15}, ${h / 2 - 18})">
      <rect x="-2" y="-2" width="34" height="34" rx="3" fill="white" />
      <image xlink:href="${qrBase64}" x="0" y="0" width="30" height="30" preserveAspectRatio="xMidYMid meet" />
    </g>
    <text x="${w / 2}" y="${h / 2 + 22}" class="text" font-size="3" font-weight="900" text-anchor="middle" letter-spacing="0.5">
      ${escapeXml(cardData.fullName.toUpperCase())}
    </text>
    <text x="${w / 2}" y="${h / 2 + 25}" class="text" font-size="1.5" font-weight="bold" text-anchor="middle" opacity="0.4" letter-spacing="2">
      SCAN TO SAVE CONTACT
    </text>
    ` : `
    <text x="${w / 2}" y="${h / 2}" class="text" font-size="4" font-weight="900" text-anchor="middle">${escapeXml(cardData.fullName.toUpperCase())}</text>
    `}
  </g>
</svg>
  `.trim();
}

export async function downloadPlotterSVG(cardData) {
  const svg = await generatePhysicalCardSVG(cardData);
  triggerDownload(new Blob([svg], { type: 'image/svg+xml' }), `${cardData.fullName.toLowerCase().replace(/\s/g, '-')}-plotter.svg`);
}

export async function downloadPhysicalPNG(cardData) {
  const svgString = await generatePhysicalCardSVG(cardData);
  const dpi = 350;
  const mmPerInch = 25.4;
  const widthMm = 175;
  const heightMm = 55;
  const widthPx = Math.round((widthMm / mmPerInch) * dpi);
  const heightPx = Math.round((heightMm / mmPerInch) * dpi);
  const canvas = document.createElement('canvas');
  canvas.width = widthPx;
  canvas.height = heightPx;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = new Image();
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, widthPx, heightPx);
    ctx.drawImage(img, 0, 0, widthPx, heightPx);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = pngUrl;
      link.setAttribute('download', `${cardData.fullName.toLowerCase().replace(/\s/g, '-')}-highres.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
  };
  img.src = url;
}
