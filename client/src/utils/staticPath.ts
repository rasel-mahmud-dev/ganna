import { backend, base } from '../axios'

export default function staticPath(link?: string) {
    if (!link) {
        return ''
    }
    if (link.startsWith('http')) {
        return link
    } else {
        if (import.meta.env.DEV) {
            return base + '/' + link
        } else {
            return backend + '/' + link
        }
    }
}
