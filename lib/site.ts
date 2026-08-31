/** Fictional business configuration. Verify every field before enabling live contact. */
export const business = {
  name: 'مطبعة المؤمل للدعاية والإعلان',
  shortName: 'المؤمل',
  isMock: true,
  phone: '+9647702468135',
  phoneDisplay: '+964 770 246 8135',
  whatsapp: '9647702468135',
  email: 'hello@almoammal-print.iq',
  address: 'بغداد، الكرادة داخل، قرب ساحة كهرمانة',
  hours: 'السبت – الخميس، ٩ صباحًا – ٧ مساءً',
  closed: 'الجمعة: مغلق',
  instagram: 'https://www.instagram.com/almoammal.print',
  facebook: 'https://www.facebook.com/almoammal.print',
  map: 'https://www.google.com/maps/search/?api=1&query=Karrada+Baghdad+Iraq',
};
export { siteUrl } from './site-url';
export const nav = [
  { href: '/', label: 'الرئيسية' },
  { href: '/services', label: 'خدماتنا' },
  { href: '/projects', label: 'أعمالنا' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
];
export const number = (n: number) => new Intl.NumberFormat('ar-IQ').format(n);
