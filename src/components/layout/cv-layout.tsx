import { ReactNode } from "react";

interface CvLayoutProps {
  left: ReactNode;
  children: ReactNode;
}

export function CvLayout({ left, children }: CvLayoutProps) {
  return (
    <div className="rmf_fn_main">
      <div className="rmf_fn_cv">
        <div className="rmf_cv">
          {left}
          <div className="cv__content relative z-10 mt-0">{children}</div>
          <div className="cv__bg" />
          <div className="cv__bg2" />
        </div>
      </div>
    </div>
  );
}
