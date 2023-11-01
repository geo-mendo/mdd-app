import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IHttpParam } from './interface';

@Injectable({
    providedIn: 'root'
})
export class HttpDataSource {

    private apiPath!: string ;

    constructor(private httpClient: HttpClient) { 
        this.apiPath = environment.apiUrl;
    }

    public get<T>(path: string) {
        return this.httpClient.get<T>(`${this.apiPath}/${path}`)
    }

    public getWithParams<T>(path: string, params: IHttpParam[]) {
        const httpParams = new HttpParams();
        params.forEach(param => {
            httpParams.set(param.name, param.value)
        })
        const options = {
            params: httpParams
        }

        return this.httpClient.get<T>(`${this.apiPath}/${path}`, options)
    }

    public post<RequestDto,ResponseDto>(path:string, request: RequestDto ) {
        return this.httpClient.post<ResponseDto>(`${this.apiPath}/${path}`,request)
    }

    public put<RequestDto,ResponseDto>(path:string, request: RequestDto ) {
        return this.httpClient.put<ResponseDto>(`${this.apiPath}/${path}`,request)
    }

    public delete(path:string, params: IHttpParam[] ) {
        const httpParams = new HttpParams();
        params.forEach(param => {
            httpParams.set(param.name, param.value)
        })
        const options = {
            params: httpParams
        }
        return this.httpClient.delete(`${this.apiPath}/${path}`,options)
    }

}