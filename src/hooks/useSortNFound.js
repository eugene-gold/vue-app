import { ref, computed } from "vue"
export function useSortNFound(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSearched = computed(()=> {
        return sortedPosts.value.filter(post=> post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery, sortedAndSearched
    }
}