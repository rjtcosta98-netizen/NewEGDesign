import InlineScripts from "./InlineScripts";

type Props = {
  html: string;
  scripts: string;
};

/**
 * Server component: emits the original landing-page markup as a single block
 * via dangerouslySetInnerHTML so the entire 130KB+ HTML payload stays out of
 * the client JS bundle. The vanilla-JS controllers (carousels, IO reveals, …)
 * are activated by the small client-side <InlineScripts /> child.
 */
export default function LandingPage({ html, scripts }: Props) {
  return (
    <>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <InlineScripts code={scripts} />
    </>
  );
}
