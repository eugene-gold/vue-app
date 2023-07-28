<template>
    <div >
        <h1>Posts page </h1>

        <my-input v-focus v-model="searchQuery" placeholder="find"
        />       
        <div class="app__btns">
                <my-button
            >
                Create Post
            </my-button>
            <my-select v-model="selectedSort"
                :options="sortOptions"    
            />
        </div>
       
        <my-modal v-model:show="modalVisible">
            <post-form 
            />
        </my-modal>      
       <post-list
        v-if="!isLoading" 
       :posts="sortedAndSearched"
       />
       <div v-else>...Loading</div>

    </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import MyButton from '@/components/ui/MyButton'
import MySelect from '@/components/ui/MySelect'
import MyInput from '@/components/ui/MyInput'
import {usePosts} from '@/hooks/usePosts'
import {useSorted} from '@/hooks/useSorted'
import {useSortNFound} from '@/hooks/useSortNFound'
    export default {
        components: {
            PostForm, PostList, MyButton, MySelect, MyInput
        },

        data() {
            return {
                modalVisible: false,
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
            }
        },
        setup(props) {
          const {posts, isLoading, totalPages} = usePosts(10)

          const {sortedPosts, selectedSort} = useSorted(posts)
          const {searchQuery, sortedAndSearched} = useSortNFound(sortedPosts)


          return {
            posts,
            totalPages,
            isLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearched
          }
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