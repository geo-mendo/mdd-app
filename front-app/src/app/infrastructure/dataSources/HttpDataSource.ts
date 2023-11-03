import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IHttpParam } from './interface';

@Injectable({
    providedIn: 'root'
})
export class HttpDataSource {

    private apiPath!: string ;
    private headers!: HttpHeaders;

    constructor(private httpClient: HttpClient) { 
        this.apiPath = environment.apiUrl;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
    }

    public get<T>(path: string) {
        return this.httpClient.get<T>(`${this.apiPath}/${path}`,{responseType: 'json', ...this.headers})
    }

    public getWithParams<T>(path: string, params: IHttpParam[]) {
        const httpParams = new HttpParams();
        params.forEach(param => {
            httpParams.set(param.name, param.value)
        })
        const options = {
            params: httpParams
        }

        return this.httpClient.get<T>(`${this.apiPath}/${path}`, {...options,responseType: 'json',...this.headers})
    }

    public post<RequestDto,ResponseDto>(path:string, request: RequestDto ) {
        return this.httpClient.post<ResponseDto>(`${this.apiPath}/${path}`,request,{responseType: 'json',...this.headers})
    }

    public put<RequestDto,ResponseDto>(path:string, request: RequestDto ) {
        return this.httpClient.put<ResponseDto>(`${this.apiPath}/${path}`,request,{responseType: 'json',...this.headers})
    }

    public delete(path:string ) {
       
        return this.httpClient.delete(`${this.apiPath}/${path}`,{responseType: 'json',...this.headers})
    }

}