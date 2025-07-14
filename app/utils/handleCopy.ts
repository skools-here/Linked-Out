export async function handleCopy(text: string, setCopied: (value: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
}
