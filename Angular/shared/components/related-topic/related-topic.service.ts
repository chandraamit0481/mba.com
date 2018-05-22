import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ITopicPage } from "./related-topic.model";
import { BaseService } from "../../services/base.service";
import { HttpService } from "../../services/http.service";

@Injectable()
export class RelatedTopicService extends BaseService {
    tags: ITopicPage[];
    config: any;
    private url: string;

    constructor(private http: HttpService) { super(); }

    getAll(): Observable<ITopicPage[]> {
        this.tags = [];
        return this.http.getData(this.config)
            .map(response => {
                if (this.hasResults(response)) {
                    let responseObj = response.data[0]['searchResults'];
                    if (responseObj[0].fields && responseObj[0].fields.topic) {
                        for (let i = 0; i < responseObj[0].fields.topic.length && this.tags.length < this.config.pageSize; i++) {
                            let topic = responseObj[0].fields.topic[i];
                            let topicTag = {
                                tag: this.getValue(topic.topicName),
                                url: this.getValue(topic.topicUrl)
                            };
                            this.tags.push(topicTag);
                        }
                    }

                    if (responseObj[0].fields && responseObj[0].fields.school) {
                        for (let i = 0; i < responseObj[0].fields.school.length && this.tags.length < this.config.pageSize; i++) {
                            let school = responseObj[0].fields.school[i];
                            let schoolTag = {
                                tag: this.getValue(school.schoolName),
                                url: this.getValue(school.schoolUrl)
                            };
                            this.tags.push(schoolTag);
                        }
                    }
                }
                return this.tags;
            });
    }
}