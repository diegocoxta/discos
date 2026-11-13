import { ImageResponse } from "next/og";

export const alt = "discos. — a coleção de vinis do Diego Costa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          background: "#fdfdfd",
          color: "#2f3d4f",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: 300,
            background: "#2f3d4f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              background: "#e55242",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700 }}>discos.</div>
          <div style={{ fontSize: 36 }}>A coleção de vinis do Diego Costa</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
