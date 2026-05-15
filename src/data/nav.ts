interface LocalizedField {
  en: string;
  vi: string;
}

export interface NavLink {
  label: LocalizedField;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: { en: 'Products', vi: 'Sản phẩm' }, href: '#products' },
  { label: { en: 'Roadmap', vi: 'Lộ trình' }, href: '#roadmap' },
  { label: { en: 'Trainers', vi: 'Giảng viên' }, href: '#trainers' },
  { label: { en: 'Register', vi: 'Đăng ký' }, href: '#register' },
];
