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
      this.newsFeeds.push(value);
    },
    updateNewsFeed({ oldValue, newValue }: { oldValue: NewsFeedDto, newValue: NewsFeedDto }) {
      const index = this.newsFeeds.indexOf(oldValue);
      this.newsFeeds.splice(index, 1, newValue);
    },
    deleteNewsFeed(id: number) {
      this.newsFeeds = this.newsFeeds.filter(x => x.id !== id);
    }
  }
})
