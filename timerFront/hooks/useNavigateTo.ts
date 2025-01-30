import { Href, useRouter } from 'expo-router'

export default function useNavigateTo(href: Href) {
    const router = useRouter()
    const navigateTo = () => {
        router.push(href)
    }
    return navigateTo
}
