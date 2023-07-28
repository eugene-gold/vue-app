import axios from "axios"
import { onMounted, ref } from "vue"
export function usePosts(limit) {
        const posts = ref([])
        const totalPages = ref()
        const isLoading = ref(true)
        const fetching = async () => {
            try {
                const resp = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: 1,
                        _limit: limit
                    }
                })
                totalPages.value = Math.ceil(resp.headers['x-total-count'] / limit)
                posts.value = resp.data
            }
            catch (e) {
                console.log(e);
            }  finally {
                isLoading.value = false
            }
        }

        onMounted(fetching)

        return {
            posts, isLoading, totalPages
        }
      
        
}