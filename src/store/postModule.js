export const postModule = {
    state: () => ({
        posts: [],
        isLoading: false,
        selectedSort: '',
        sortOptions: [
            {
                value: 'title', name: 'Name'
            },
            {
                value: 'body', name: 'Text'
            },
            {
                value: 'id', name: 'ID'
            },
        ],
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0   
    }),
    getters: {
        sortedPosts (state) {
                
            return [...state.posts].sort((post1 , post2) => (                 
                state.selectedSort === "id" ? post1[state.selectedSort] - post2[state.selectedSort] :
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            ))
        },
        sortedAndSearched(state, getters){
            return getters.sortedPosts.filter(post=> post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }

    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setRemoveMutation(state, post) {
                state.posts = state.posts.filter((p)=> p.id !== post.id)
        }

    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                     const resp = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                         params: {
                             _page: state.page,
                             _limit: state.limit
                         }
                     })
                     commit('setTotalPages', Math.ceil(resp.headers['x-total-count'] / state.limit))
                     commit('setPosts', resp.data)
             }
             catch (e) {
                 console.log(e);
             }  finally {
                commit('setLoading', false)
             }
        },
        async fetchMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1)
                 
                     const resp = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                         params: {
                             _page: state.page,
                             _limit: state.limit
                         }
                     })
                     commit('setTotalPages', Math.ceil(resp.headers['x-total-count'] / state.limit))
                     commit('setPosts', [...state.posts, ...resp.data])
             }
             catch (e) {
                 console.log(e);
             }  finally {
             }
        },
    },
    namespaced: true
}