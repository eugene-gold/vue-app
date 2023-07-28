<template>
    <div >
        <h1>Posts page</h1>
        <my-input v-focus v-model="searchQuery" placeholder="find"
        />       
        <div class="app__btns">
                <my-button
                @click="showModal"
            >
                Create Post
            </my-button>
            <my-select v-model="selectedSort"
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
       @remove="removePost" 
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
    export default {
        components: {
            PostForm, PostList, MyButton, MySelect, MyInput
        },

        data() {
            return {
                posts: [],
                modalVisible: false,
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
            }
        },
        methods: {
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
                    this.isLoading = false
                }
           },
           async fetchPosts() {
               try {
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
        //    changePage (pageN) {
        //         this.page = pageN
        //    }           
        },
        mounted() {
            this.fetchPosts()
            // const options = {
            //     rootMargin: "0px",
            //     threshold: 1.0,
            // };
            // const callback = (entries, observer) => {
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.fetchMorePosts()
            //     }
            // }
            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer)
        },
        computed: {
            sortedPosts () {
                
                return [...this.posts].sort((post1 , post2) => (                 
                    this.selectedSort === "id" ? post1[this.selectedSort] - post2[this.selectedSort] :
                    post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                ))
            },
            sortedAndSearched(){
                return this.sortedPosts.filter(post=> post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        watch: {
            // page () {
            //     this.fetchPosts()
            // }
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
    /* background: gainsboro; */
}

</style>