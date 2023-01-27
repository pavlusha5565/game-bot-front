import { action, makeObservable } from "mobx";
import { useEffect, useState } from "react";
import {
  IPaginateRequest,
  Paginate,
  paginateResponseDefault,
} from "../common/interfaces/Paginate.interface";
import { IStoryData } from "../common/interfaces/Story.interface";
import { ApiClient } from "./ApiClient";
import { BehaviorStore } from "./BehaviorStore";
import { useGlobalStore } from "./GlobalStoreContext";

export class StoryStore extends BehaviorStore<Paginate<IStoryData[]>> {
  constructor(private api: ApiClient) {
    super({ paginate: paginateResponseDefault, data: [] });
    makeObservable(this, {
      requestAllStory: action,
    });
  }

  async requestAllStory(input?: IPaginateRequest) {
    const response = await this.api.instance.get<Paginate<IStoryData[]>>(
      "/story/all",
      {
        data: { page: input?.page || 1, limit: input?.limit },
      }
    );
    this.setState(response.data);
  }

  async newStore(input: IStoryData) {
    const response = await this.api.instance.post<IStoryData>(
      "/story/new",
      input
    );
    this.updateState({ data: [...this.state.data, response.data] });
  }

  async updateStory(id: string, updated: Partial<IStoryData>) {
    try {
      await this.api.instance.post<IStoryData[]>(`/story/${id}`, updated);

      this.updateState((state: Paginate<IStoryData[]>) => {
        state.data = state.data.map((i) =>
          i.id === id ? { ...i, ...updated } : i
        );
        return state;
      });
    } catch (err) {}
  }
}

export function useStoryStore(): [IStoryData[], StoryStore] {
  const { ApiClient } = useGlobalStore();
  const [storyStore] = useState<StoryStore>(() => new StoryStore(ApiClient));

  return [storyStore.state.data, storyStore];
}
