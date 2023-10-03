// Types
import type { Config, Locale, Dictionary } from '@rewordlabs/types'

export type TranslateOptions = Pick<Config, 'translator' | 'projectLocale'> & {
  dictionary: Dictionary
  locale: Locale
}

export async function translate({
  dictionary,
  projectLocale,
  locale,
  translator
}: TranslateOptions): Promise<Dictionary> {
  return translator({
    dictionary,
    projectLocale,
    locale
  })
}
