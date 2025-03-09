function htmlToMrkdwn(html) {
  // Replace bold tags with *
  html = html.replace(/<b>(.*?)<\/b>/gi, '*$1*');
  html = html.replace(/<strong>(.*?)<\/strong>/gi, '*$1*');

  // Replace italic tags with _
  html = html.replace(/<i>(.*?)<\/i>/gi, '_$1_');
  html = html.replace(/<em>(.*?)<\/em>/gi, '_$1_');

  // Replace anchor tags with Slack's link format
  html = html.replace(/<a\s+href=["'](.*?)["']>(.*?)<\/a>/gi, '<$1|$2>');

  // Replace image tags with the image URL
  html = html.replace(/<img\s+src=["'](.*?)["'][^>]*>/gi, '<$1>');

  // Replace unordered list items with •
  html = html.replace(/<ul>(.*?)<\/ul>/gis, function(match, p1) {
    return p1.replace(/<li>(.*?)<\/li>/gi, '• $1\n');
  });

  // Replace ordered list items with numbers
  html = html.replace(/<ol>(.*?)<\/ol>/gis, function(match, p1) {
    let i = 1;
    return p1.replace(/<li>(.*?)<\/li>/gi, function(match, p1) {
      return i++ + '. ' + p1 + '\n';
    });
  });

  // Replace line breaks and paragraph tags with newlines
  html = html.replace(/<br\s*\/?>/gi, '\n');
  html = html.replace(/<\/p>/gi, '\n\n');
  html = html.replace(/<p>/gi, '');

  // Remove any remaining HTML tags
  html = html.replace(/<\/?[^>]+(>|$)/g, '');

  return html.trim();
}
