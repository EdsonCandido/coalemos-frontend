import { useLocation } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  path: string;
};

export function useBreadcrumbs(
  config?: Record<string, string>
): BreadcrumbItem[] {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = segments.map((seg, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");

    let label = config?.[path];

    if (!label) {
      label = seg.charAt(0).toUpperCase() + seg.slice(1);
    }

    return { label, path };
  });

  return breadcrumbs;
}
