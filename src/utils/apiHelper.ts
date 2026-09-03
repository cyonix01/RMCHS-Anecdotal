/**
 * Safe JSON response parser that prevents Unexpected token '<' errors when servers return HTML or error pages.
 */
export async function safeJson(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    if (!res.ok) {
      const cleanText = text && text.length < 300 && !text.includes("<!DOCTYPE") && !text.includes("<html") 
        ? text 
        : `Server error (${res.status} ${res.statusText})`;
      throw new Error(cleanText);
    }
    return {};
  }
}
