type Variables = Record<string, string | number>

export const replaceVariables = (translation: string, variables: Variables): string => {
  if (!translation) return ''

  return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const replacement = variables[key]

    if (replacement === undefined) {
      console.warn(`Variable {{${key}}} not found in translation: "${translation}"`)

      return match
    }

    return String(replacement)
  })
}
