interface LoadingScreenProps {
  isMobile: boolean;
  fading: boolean;
  barStarted: boolean;
}

export function LoadingScreen({ isMobile, fading, barStarted }: LoadingScreenProps) {
  return (
    <>
      {isMobile ? (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center bg-brand z-50 transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div className="w-25 h-25 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div
          className="fixed inset-0 z-50 overflow-hidden transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div
            className="h-screen bg-brand relative"
            style={{
              width: barStarted ? "100%" : "0%",
              transition: "width 800ms ease-out",
            }}
          />
        </div>
      )}
    </>
  );
}
