import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpDataSource {

    private apiPath = "..."

    constructor(private httpClient: HttpClient) { }

    public get<T>(path: string) {
        return this.httpClient.get<T>(`${this.apiPath}/${path}`)
    }

    public post<RequestDto,ResponseDto>(path:string, request: RequestDto ) {
        return this.httpClient.post<ResponseDto>(`${this.apiPath}/${path}`,request)
    }

}