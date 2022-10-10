import { base } from '../axios'

export default function staticPath(link?: string) {
    if (!link) {
        return ''
    }
    if (link.startsWith('http')) {
        return link
    } else {
        return base + '/' + link
    }
}
