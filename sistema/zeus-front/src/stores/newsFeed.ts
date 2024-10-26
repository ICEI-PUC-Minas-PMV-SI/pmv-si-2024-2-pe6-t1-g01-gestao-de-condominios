import type NewsFeedDto from '@/interfaces/newsFeed/newsFeedDto'
import type NewsFeedState from '@/interfaces/newsFeed/newsFeedState'
import { defineStore } from 'pinia'

export const useNewsFeedStore = defineStore('newsFeed', {
  state: (): NewsFeedState => ({
    newsFeed: {
      title: null,
      description: null,
      file: null,
    },
    newsFeeds: []
  }),
  actions: {
    setNewsFeeds(value: NewsFeedDto[]) {
      this.newsFeeds = value
    },
    addNewsFeed(value: NewsFeedDto) {
      this.newsFeeds.unshift(value);
    },
    updateNewsFeed({ oldValue, newValue }: { oldValue: NewsFeedDto, newValue: NewsFeedDto }) {
      const cleanObject = Object.assign({}, oldValue)
      const oldItem = this.newsFeeds.find(x => x.id === cleanObject.id)
      if(oldItem) {
        const index = this.newsFeeds.indexOf(oldItem);
        this.newsFeeds.splice(index, 1, newValue);
      }
    },
    deleteNewsFeed(id: number) {
      this.newsFeeds = this.newsFeeds.filter(x => x.id !== id);
    }
  }
})
