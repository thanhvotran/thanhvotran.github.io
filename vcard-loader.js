'use strict';

(function () {
  const escapeHtml = (value) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const inline = (value) =>
    escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

  const parseMarkdown = (markdown) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let listOpen = false;

    const closeList = () => {
      if (listOpen) {
        html.push('</ul>');
        listOpen = false;
      }
    };

    for (const raw of lines) {
      const line = raw.trim();

      if (!line) {
        closeList();
        continue;
      }

      if (line.startsWith('<') && line.endsWith('>')) {
        closeList();
        html.push(raw);
        continue;
      }

      if (line.startsWith('### ')) {
        closeList();
        html.push(`<h3>${inline(line.slice(4))}</h3>`);
        continue;
      }

      if (line.startsWith('## ')) {
        closeList();
        html.push(`<h2>${inline(line.slice(3))}</h2>`);
        continue;
      }

      if (line.startsWith('# ')) {
        closeList();
        html.push(`<h1>${inline(line.slice(2))}</h1>`);
        continue;
      }

      if (line.startsWith('- ')) {
        if (!listOpen) {
          html.push('<ul>');
          listOpen = true;
        }
        html.push(`<li>${inline(line.slice(2))}</li>`);
        continue;
      }

      closeList();
      html.push(`<p>${inline(line)}</p>`);
    }

    closeList();
    return html.join('\n');
  };

  const loadMarkdown = async (container) => {
    const path = container.getAttribute('data-md');
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    container.innerHTML = parseMarkdown(await response.text());
  };

  const init = async () => {
    const containers = document.querySelectorAll('[data-md]');
    for (const container of containers) {
      try {
        await loadMarkdown(container);
      } catch (error) {
        container.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
      }
    }
  };

  init();
})();
