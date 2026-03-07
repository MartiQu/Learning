interface LogoProps {
  height?: number;
  color?: string;
}

export function Logo({ height = 24, color = 'currentColor' }: LogoProps) {
  // Wordmark "Masterly" — ģeometrisks bold stils (SVG viewBox: 0 0 200 32)
  return (
    <svg
      viewBox="0 0 200 32"
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Masterly"
      focusable="false"
    >
      {/* M */}
      <path
        d="M0 2H5.5L12 18.5L18.5 2H24V30H19V11L13.5 25H10.5L5 11V30H0V2Z"
        fill={color}
      />
      {/* A */}
      <path
        d="M32 30L40.5 2H46.5L55 30H49.5L47.8 24H39.2L37.5 30H32ZM40.7 19.5H46.3L43.5 10L40.7 19.5Z"
        fill={color}
      />
      {/* S */}
      <path
        d="M58 23.5L62 20.5C63.2 22.8 65 24 67.5 24C69.5 24 71 23.1 71 21.6C71 20.2 70 19.4 67 18.3L65 17.5C61.2 16 59 13.8 59 10.5C59 6.5 62.2 2 68 2C71.5 2 74.2 3.5 76 6.5L72 9.5C71 7.8 69.5 6.8 68 6.8C66.2 6.8 64.8 7.8 64.8 9.3C64.8 10.7 65.8 11.5 68.5 12.5L70.5 13.3C74.8 14.9 76.8 17.1 76.8 20.5C76.8 25.3 73 30 67 30C63 30 59.8 27.8 58 23.5Z"
        fill={color}
      />
      {/* T */}
      <path
        d="M82 2H101V7.5H94.5V30H88.5V7.5H82V2Z"
        fill={color}
      />
      {/* E */}
      <path
        d="M106 2H124V7.5H111.8V13H122V18H111.8V24.5H124V30H106V2Z"
        fill={color}
      />
      {/* R */}
      <path
        d="M129 2H139.5C144.8 2 148.5 5.5 148.5 10.5C148.5 14 146.8 16.5 143.8 17.8L149.5 30H143.5L138.5 18.5H134.8V30H129V2ZM134.8 7.2V13.8H139C141.2 13.8 142.8 12.4 142.8 10.5C142.8 8.5 141.2 7.2 139 7.2H134.8Z"
        fill={color}
      />
      {/* L */}
      <path
        d="M155 2H160.8V24.5H172V30H155V2Z"
        fill={color}
      />
      {/* Y */}
      <path
        d="M176 2H182L187.5 13L193 2H199L190.5 18V30H184.5V18L176 2Z"
        fill={color}
      />
    </svg>
  );
}
