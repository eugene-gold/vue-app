<template>
    <div >
        
        <h1>Posts page </h1>
       
        <my-input 
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery" 
            placeholder="find"
        />       
        <div class="app__btns">
                <my-button
                @click="showModal"
            >
                Create Post
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="selectedSort"
                :options="sortOptions"    
            />
        </div>
       
        <my-modal v-model:show="modalVisible">
            <post-form 
                @create="createPost"        
            />
        </my-modal>      
       <post-list
        v-if="!isLoading" 
       :posts="sortedAndSearched"
       @remove="setRemoveMutation" 
       />
       <div v-else>...Loading</div>
       <div v-intersection="fetchMorePosts" class="observer"></div>
       <!-- <div class="page__wrapper">
            <div 
                v-for="pageN in totalPages" 
                :key="pageN"  
                class='page' 
                :class="{'current-page': page === pageN }"
                @click="changePage(pageN)" 
                >
                {{ pageN }}
            </div>
       </div> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyButton from '@/components/ui/MyButton'
import MySelect from '@/components/ui/MySelect'
import MyInput from '@/components/ui/MyInput'
import axios from 'axios'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        components: {
            PostForm, PostList, MyButton, MySelect, MyInput
        },

        data() {
            return {
                modalVisible: false                
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setselectedSort: 'post/setselectedSort',
                setRemoveMutation: 'post/setRemoveMutation',

            }),
            ...mapActions({
                fetchMorePosts: 'post/fetchMorePosts',
                fetchPosts: 'post/fetchPosts',
            }),
           
           createPost(post) {
                this.posts.push(post)
                this.modalVisible = false
           },
           removePost(post) {
                this.posts = this.posts.filter((p)=> p.id !== post.id)
           },
           showModal() {
                this.modalVisible = true
           },
           async fetchMorePosts() {
               try {
                    this.page += 1;
                        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        })
                        this.totalPages = Math.ceil(resp.headers['x-total-count'] / this.limit)
                        this.posts = [...this.posts, ...resp.data]
                }
                catch (e) {
                    console.log(e);
                }  finally {
                }
           },
           async fetchPosts() {
               try {
                   this.isLoading = true
                        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        })
                        this.totalPages = Math.ceil(resp.headers['x-total-count'] / this.limit)
                        this.posts = resp.data
                }
                catch (e) {
                    console.log(e);
                }  finally {
                    this.isLoading = false
                }
           },
         
        },
        mounted() {
           this.fetchPosts()
        },
        //TODO не получается менять стор, возможно тут ошибка
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isLoading: state => state.post.isLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                sortOptions: state => state.post.sortOptions   

            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearched: 'post/sortedAndSearched'
            }),
            },
            watch: {
            
            }      
    }

</script>


<style>

.app__btns {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 1rem;
}
.page {
    border: 1px solid blueviolet;
    padding: 0.6rem;
    margin-left: 0.2rem;
}
.current-page {
    border: 2px solid rebeccapurple
}
.observer {
    height: 2rem;
}

</style>