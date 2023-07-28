import { ref, computed } from "vue"
export function useSorted(posts) {
    const selectedSort = ref('')

    const sortedPosts = computed(()=> {
        return [...posts.value].sort((post1 , post2) => (                 
            selectedSort.value === "id" ? post1[selectedSort.value] - post2[selectedSort.value] :
            post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
        ))
    })

    return {
        selectedSort, sortedPosts
    }
}