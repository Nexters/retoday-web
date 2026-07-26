import type { SVGProps } from "react";

function SuccessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="20" height="20" rx="10" fill="#06C37A" />
      <path d="M6 9.5L8.5 13L14.5 8" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

export default SuccessIcon;
