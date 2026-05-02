import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return [
    {
      id: "main",
      alt: locale === "en"
        ? "Renato Marques — Senior Front-End Developer | Full Stack"
        : "Renato Marques — Desenvolvedor Front-End Sênior | Full Stack",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
  id: string;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const label = isEn ? "PORTFOLIO · RESUME" : "PORTFÓLIO · CURRÍCULO";
  const role = isEn
    ? "Senior Front-End Developer / Full Stack"
    : "Desenvolvedor Front-End / Full Stack";
  const subtitle = isEn
    ? "15+ years of experience · AWS Certified Developer"
    : "+15 anos de experiência · AWS Certified Developer";
  const url = isEn
    ? "https://renatomf.is-a.dev/en"
    : "https://renatomf.is-a.dev/";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
          background: "#f2f2f2",
          overflow: "hidden",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: "0", left: "0", display: "flex" }}
        >
          <polygon points="0,0 295,0 235,315 295,630 0,630" fill="#0bafac" />
        </svg>

        <div
          style={{
            position: "absolute",
            left: "85px",
            top: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <svg width="76" height="76" viewBox="0 0 40 40" fill="none" style={{ display: "flex" }}>
            <path
              d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z"
              fill="white"
            />
          </svg>
          <div style={{ display: "flex", color: "white", fontSize: "15px", fontWeight: "700", letterSpacing: "2px" }}>
            CV | RMF
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "380px",
            top: "0",
            right: "170px",
            bottom: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
            <div style={{ width: "28px", height: "3px", background: "#0bafac", display: "flex" }} />
            <div style={{ display: "flex", color: "#0bafac", fontSize: "14px", fontWeight: "700", letterSpacing: "3px" }}>
              {label}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "68px",
              fontWeight: "700",
              color: "#1a1a1a",
              lineHeight: "1",
              letterSpacing: "-1.5px",
              marginBottom: "18px",
            }}
          >
            Renato Marques
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "25px",
              color: "#0bafac",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            {role}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#666666",
              marginBottom: "42px",
            }}
          >
            {subtitle}
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["React", "Next.js", "TypeScript", "React Native", "Flutter"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  background: "rgba(11,175,172,0.12)",
                  border: "1px solid rgba(11,175,172,0.35)",
                  color: "#0bafac",
                  padding: "7px 17px",
                  borderRadius: "4px",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "42px",
              color: "#000000",
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            {url}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
