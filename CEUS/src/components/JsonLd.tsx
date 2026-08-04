interface JsonLdProps {
  data: object | null;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) => {
    const escapedCharacters: Record<string, string> = {
      '<': '\\u003c',
      '>': '\\u003e',
      '&': '\\u0026',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029',
    };

    return escapedCharacters[character];
  });
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
