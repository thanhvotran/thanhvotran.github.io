(function () {
  const escapeHtml = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const inline = (value) =>
    escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

  const parseMarkdown = (markdown) => {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let listOpen = false;

    const closeList = () => {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line) {
        closeList();
        continue;
      }

      if (line.startsWith("<") && line.endsWith(">")) {
        closeList();
        html.push(rawLine);
        continue;
      }

      if (line.startsWith("### ")) {
        closeList();
        html.push(`<h3>${inline(line.slice(4))}</h3>`);
        continue;
      }

      if (line.startsWith("## ")) {
        closeList();
        html.push(`<h2>${inline(line.slice(3))}</h2>`);
        continue;
      }

      if (line.startsWith("# ")) {
        closeList();
        html.push(`<h1>${inline(line.slice(2))}</h1>`);
        continue;
      }

      if (line.startsWith("- ")) {
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${inline(line.slice(2))}</li>`);
        continue;
      }

      closeList();
      html.push(`<p>${inline(line)}</p>`);
    }

    closeList();
    return html.join("\n");
  };

  const loadMarkdown = async (el) => {
    const path = el.dataset.md;
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }
    el.innerHTML = parseMarkdown(await response.text());
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  };

  document.getElementById("year")?.append(new Date().getFullYear());

  document.querySelectorAll("[data-md]").forEach((el) => {
    loadMarkdown(el).catch((error) => {
      el.innerHTML = `<p class="loading">${escapeHtml(error.message)}</p>`;
    });
  });
})();
