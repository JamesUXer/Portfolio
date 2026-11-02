(() => { const routes = {'#research-logger':'#field-notes','#spellquest':'#spellquest'}; location.replace('playground.html' + location.search + (routes[location.hash] || '')); })();
