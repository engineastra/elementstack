export function renderInIframe(
  iframe: HTMLIFrameElement,
  files: Record<string, string>,
  bundledCode: string
) {
  const htmlPath = Object.keys(files).find((p) => p.endsWith('index.html'));

  if (!htmlPath) {
    throw new Error('index.html not found');
  }

  let html = files[htmlPath];

  // Remove user scripts
  html = html.replace(/<script[\s\S]*?<\/script>/g, '');

  // Inline CSS files
  for (const [path, content] of Object.entries(files)) {
    if (path.endsWith('.css')) {
      html = html.replace('</head>', `<style>${content}</style></head>`);
    }
  }

  // Inject bundled JS
  html = html.replace(
    '</body>',
    `<script type="module">${bundledCode}</script></body>`
  );

  iframe.srcdoc = html;
}
