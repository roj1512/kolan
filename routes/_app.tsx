import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html class="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#FAFAFA"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#222222"
        />
        <style>
          {`:root {
            --bg: #ffffff;
            --fg: #000000;
            --fur: #fafafa;
            --kolan: #4400cc;
            --morefur: #f0f0f0;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #0f0f0f;
              --fg: #ffffff;
              --fur: #222222;
              --kolan: #5b55fc;
              --morefur: #333333;
            }
          }

          body[dir=ltr] {
            font-family: 'Red Hat Text', system-ui;
          }`}
        </style>
      </Head>
      <Component />
    </html>
  );
}
