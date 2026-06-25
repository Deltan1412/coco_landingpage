export interface RegisterQRProps {
  size?: number;
}

// Static QR image from /public, encoding the registration link.
export function RegisterQR({ size = 200 }: RegisterQRProps) {
  return (
    <img
      src="/qrcode.png"
      alt="Scan to register"
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size }}
    />
  );
}
