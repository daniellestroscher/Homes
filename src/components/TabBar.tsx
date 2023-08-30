/** @jsxImportSource theme-ui */

import { usePathname } from "next/navigation";

export default function TabBar({
  communityId,
}: {
  communityId: string | undefined;
}) {
  const pathname = usePathname();
  return (
    <>
      <div
        sx={{
          position: "fixed",
          top: "70px",
          display: "flex",
          justifyContent: "center",
          zIndex: "0",
          backgroundColor: "accentLightest",
          padding: "10px",
          width: "100vw",
          margin: "0px 5px",
          borderRadius: "6px",
        }}
      >
        <section
          sx={{ display: "flex", width: "40%", justifyContent: "space-evenly" }}
        >
          <p>
            <a
              href={`/${communityId}`}
              sx={{
                variant: "components.navItem",
                ...(pathname === `/${communityId}` && {
                  variant: "components.selectedNav",
                }),
              }}
            >
              Home
            </a>
          </p>
          <p>
            <a
              href={`/${communityId}/rent-increase`}
              sx={{
                variant: "components.navItem",
                ...(pathname === `/${communityId}/rent-increase` && {
                  variant: "components.selectedNav",
                }),
              }}
            >
              Rent Increase
            </a>
          </p>
          <p>
            <a
              href={`/${communityId}/rent-roll`}
              sx={{
                variant: "components.navItem",
                ...(pathname === `/${communityId}/rent-roll` && {
                  variant: "components.selectedNav",
                }),
              }}
            >
              Rent Roll
            </a>
          </p>
        </section>
        {/* <JustTabs communityId={communityId} /> */}
      </div>
    </>
  );
}
