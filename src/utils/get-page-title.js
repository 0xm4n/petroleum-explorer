import defaultSettings from '@/settings'

// const title = defaultSettings.title || 'Petroleum Explorer'
const title = 'Petroleum Explorer'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
