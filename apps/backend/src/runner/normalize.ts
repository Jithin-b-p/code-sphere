export function normalizeOutput(output: string): string {
  return output.replace('/\r\n/g', '\n').trimEnd()
}
