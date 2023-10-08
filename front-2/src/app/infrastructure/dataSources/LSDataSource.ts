import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LSDataSource {
    public setItem(key: string, item: string) {
        localStorage.setItem(key,item)
    }

    public getItem(key:string): string | null {
        const item = localStorage.getItem(key)
        return item;
    }
}