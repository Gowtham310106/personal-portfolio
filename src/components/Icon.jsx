const PATHS = {
  school: "M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 6v3.2c0 .6 2.7 2.3 6 2.3s6-1.7 6-2.3V15.5M20 10.5v5",
  clinic: "M12 7v10M7 12h10M4.5 4.5h15v15h-15z",
  fuel: "M4 20V5.5A1.5 1.5 0 0 1 5.5 4h6A1.5 1.5 0 0 1 13 5.5V20M3 20h11M4 11h9M16 9.5l3-2.5v9.5a1.8 1.8 0 1 0 3.5 0V11l-2.5-2.5",
  pos: "M4 4.5h16v5H4zM6.5 13h4M6.5 16.5h4M14 13h3.5M14 16.5h3.5M4 9.5h16v10H4z",
  hotel: "M3 20V6.5m0 13.5h18M21 20V11H8.5m0 9V4.5M12 8h1M12 11.5h1M16.5 14.5h1",
  apartment: "M4 20V4.5h9V20M13 10h7v10M7 8h3M7 12h3M7 16h3M16 13.5h1M16 17h1",
  inventory: "M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Zm0 0 9 4.5m0 0 9-4.5M12 12v9",
  ai: "M9 3.5h6M12 3.5v3M5.5 6.5h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2ZM9 11.5v2M15 11.5v2M9.5 16h5",
  bolt: "M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z",
  chart: "M4 19.5h16M7 16V9M12 16V5M17 16v-5",
  shield: "M12 3.5 5 6v6c0 4 3 7 7 8.5 4-1.5 7-4.5 7-8.5V6l-7-2.5Zm-2.5 9 2 2 4-4.5",
  clock: "M12 6.5V12l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  code: "m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5.5l-3 13",
  spark: "M12 3.5v3.2M12 17.3v3.2M4.8 12H8m8 0h3.2M6.9 6.9l2.3 2.3m5.6 5.6 2.3 2.3M17.1 6.9l-2.3 2.3m-5.6 5.6-2.3 2.3",
  users: "M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1.5a4 4 0 0 0-3-3.87M16.5 3.87a4 4 0 0 1 0 7.75",
  phone: "M15.5 3.5h.5a5 5 0 0 1 5 5v.5M15 7h.5a2 2 0 0 1 2 2v.5M9 4.5l1.8 3.4-1.6 1.7a12 12 0 0 0 5.2 5.2l1.7-1.6 3.4 1.8v3.1a1.8 1.8 0 0 1-2 1.8C10.6 19.2 4.8 13.4 4 5.7a1.8 1.8 0 0 1 1.8-2H9Z",
  mail: "M3.5 6.5h17v11h-17zM3.8 7l8.2 6 8.2-6",
  search: "M20.5 20.5 16 16m2-5.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  mobile: "M7.5 2.5h9a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2ZM10.5 18.5h3",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm9 9.5-9 5-9-5M21 17l-9 5-9-5",
}

export default function Icon({ name, size = 22, className = "", strokeWidth = 1.6 }) {
  const d = PATHS[name] || PATHS.bolt
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden
    >
      <path d={d} />
    </svg>
  )
}
