import type NewsFeedDto from './newsFeedDto';
import type NewsFeedPayload from './newsFeedPayload';

export default interface NewsFeedState {
  newsFeed: NewsFeedPayload,
  newsFeeds: NewsFeedDto[]
}