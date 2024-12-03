export function scpToHtml(text) {
  const escapeHtml = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  let html = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\/\/(.+?)\/\//g, "<em>$1</em>")
    .replace(/__(.+?)__/g, "<u>$1</u>")
    .replace(/--(.+?)--/g, "<del>$1</del>");

  html = html.replace(/\[\[(.+?)\]\]/g, (match, p1) => {
    const [linkText, linkHref] = p1.split("|");
    const href = linkHref || linkText;
    return `<a href="${href}" target="_blank">${linkText}</a>`;
  });

  html = html
    .replace(/^\+\+\+(.*?)$/gm, "<h3>$1</h3>")
    .replace(/^\+\+(.*?)$/gm, "<h2>$1</h2>")
    .replace(/^\+(.*?)$/gm, "<h1>$1</h1>");

  html = html.replace(
    /\[\[collapsible\]\](.+?)\[\[\/collapsible\]\]/gs,
    (match, content) => {
      return `
      <div class="collapsible">
        <button class="collapsible-toggle">Toggle</button>
        <div class="collapsible-content">${content.trim()}</div>
      </div>
    `;
    }
  );

  html = html
    .replace(/^\* (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^# (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ol>${match}</ol>`);

  return html;
}
